class Card < ApplicationRecord
  has_many :deck_cards, dependent: :destroy
  has_many :decks, through: :deck_cards
  has_many :player_cards, dependent: :destroy
  has_many :players, through: :player_cards
end
