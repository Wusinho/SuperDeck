class PlayerCard < ApplicationRecord
  belongs_to :player
  belongs_to :card
  enum zone: { hand: 0, playzone: 1, mana_pool: 2, graveyard: 3, exile: 4 }
  enum action: { normal: 0, flipped: 1, morph: 2 }

  def assign_to(new_holder)
    update(current_holder: new_holder)
  end
end
