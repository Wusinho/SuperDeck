class PlayerCard < ApplicationRecord
  belongs_to :player
  belongs_to :card
  enum zone: {hand: 0, playzone: 1, graveyard: 2, exile: 3 }

  def assign_to(new_holder)
    update(current_holder: new_holder)
  end
end
