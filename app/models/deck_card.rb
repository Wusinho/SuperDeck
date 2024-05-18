class DeckCard < ApplicationRecord
  belongs_to :deck
  belongs_to :card

  validates :position, presence: true, numericality: { only_integer: true }
  validates :drawn, :played, inclusion: { in: [true, false] }
end
