class PlayerCard < ApplicationRecord
  belongs_to :player
  belongs_to :current_holder, class_name: 'Player', optional: true

  enum location: {deck: 0, hand: 1, in_game: 2, graveyard: 3 }

  validates :location, presence: true

  def assign_to(new_holder)
    update(current_holder: new_holder)
  end
end
