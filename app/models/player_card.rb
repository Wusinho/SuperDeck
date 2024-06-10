class PlayerCard < ApplicationRecord
  belongs_to :player
  belongs_to :card
  enum zone: { hand: 0, play_zone: 1, mana_pool: 2, graveyard: 3, exile: 4 }
  # after_update :reset_action_if_zone_changes
  before_update :reset_if_hand

  def reset_if_hand
    if will_save_change_to_zone? && zone == 'hand' && zone_was != 'hand'
      self.tapped = false
      self.morphed = false
    end
  end


  def assign_to(new_holder)
    update(current_holder: new_holder)
  end

  def reset_action_if_zone_changes
    if saved_change_to_zone? && (hand? || graveyard? || exile?)
      update_column(:action, 0)
    end
  end
end
