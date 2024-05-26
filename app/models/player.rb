class Player < ApplicationRecord
  belongs_to :user
  belongs_to :game
  has_many :player_cards
  has_many :cards, through: :player_cards
  before_save :update_username


  def hand_cards
    player_cards.joins(:card).where(zone: 0).select('player_cards.zone', 'player_cards.action', 'player_cards.current_holder_id','cards.*')
  end

  def card_collection
    zones = { hand: [], playzone: [], graveyard: [], exile: [] }
    cards = player_cards.joins(:card).select('player_cards.zone', 'player_cards.action', 'player_cards.current_holder_id','cards.*')

    cards_grouped_by_zone = cards.group_by(&:zone)

    zones.each_key do |zone|
      zones[zone] = cards_grouped_by_zone[zone.to_s] || []
    end

    zones
  end

  def playzone_cards
    player_cards.joins(:card).where(zone: 1).select('cards.*')
  end

  def graveyard_cards
    player_cards.joins(:card).where(zone: 2).select('cards.*')
  end

  def exile_cards
    player_cards.joins(:card).where(zone: 3).select('cards.*')
  end

  def add_card_to_hand(card)
    self.player_cards.create(card_id: card.id, zone: 'hand', drawn: true)
  end

  def update_username
    self.username ||= self.user.username
  end

  def move_card_to_zone(card, zone)
    player_card = self.player_cards.find_by(card_id: card.id)
    player_card.update(zone: zone) if player_card
  end

  def cards_in_zone(zone)
    self.player_cards.where(zone: zone).includes(:card)
  end
end
