class Deck < ApplicationRecord
  belongs_to :game
  has_many :deck_cards, dependent: :destroy
  has_many :cards, through: :deck_cards

  after_create :initialize_deck

  def initialize_deck
    self.cards.each_with_index do |card, index|
      self.deck_cards.create(card: card, position: index + 1, decked_at: Time.current)
    end
  end

  def add_card(card)
    position = self.deck_cards.count + 1
    self.deck_cards.create(card: card, position: position, decked_at: Time.current)
  end

  def remove_card(card)
    deck_card = self.deck_cards.find_by(card_id: card.id)
    if deck_card
      self.deck_cards.where("position > ?", deck_card.position).update_all("position = position - 1")
      deck_card.destroy
    end
  end

  def draw_card
    deck_card = self.deck_cards.where(drawn: false).order(:position).first
    if deck_card
      deck_card.update(drawn: true, drawn_at: Time.current)
      deck_card.card
    end
  end

  def shuffle_deck
    positions = self.deck_cards.pluck(:id).shuffle
    positions.each_with_index do |id, index|
      self.deck_cards.find(id).update(position: index + 1)
    end
  end
end
