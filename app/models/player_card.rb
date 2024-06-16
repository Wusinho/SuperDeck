class PlayerCard < ApplicationRecord
  belongs_to :owner, class_name: 'Player', foreign_key: 'owner_id'
  belongs_to :current_holder, class_name: 'Player', foreign_key: :current_holder_id
  belongs_to :card_attached, class_name: 'PlayerCard', foreign_key: 'card_attached_id', optional: true
  belongs_to :card
  enum zone: { hand: 0, play_zone: 1, mana_pool: 2, graveyard: 3, exile: 4 }
  before_validation :set_current_holder, on: :create
  # after_update :reset_action_if_zone_changes
  before_update :handle_zone_change, if: :card_attached_changed?
  before_update :reset_if_hand

  def set_current_holder
    self.current_holder_id ||= owner_id
  end

  def card_attached?
    card_attached.present?
  end

  def handle_zone_change
    if zone_changed? && !%w[play_zone mana_pool].include?(zone)
      detach_attached_cards
    end
  end

  def detach_attached_cards
    return unless card_attached

    # Store current zone to reassign attached card
    previous_zone = zone

    # Move attached card back to its original zone
    card_attached.update_columns(zone: previous_zone, card_attached_id: nil, tapped: false, morphed: false)

    # Detach further attached cards and send them to the graveyard
    current = card_attached
    while current.card_attached
      next_card = current.card_attached
      current.update_columns(card_attached_id: nil, zone: :graveyard ,tapped: false, morphed: false)
      current = next_card
    end
  end

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
