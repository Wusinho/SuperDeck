class Player < ApplicationRecord
  belongs_to :user
  belongs_to :game
  has_many :player_cards
  has_many :cards, through: :player_cards

  def add_card_to_hand(card)
    self.player_cards.create(card_id: card.id, zone: 'hand', drawn: true)
  end

  def move_card_to_zone(card, zone)
    player_card = self.player_cards.find_by(card_id: card.id)
    player_card.update(zone: zone) if player_card
  end

  def cards_in_zone(zone)
    self.player_cards.where(zone: zone).includes(:card)
  end
end
