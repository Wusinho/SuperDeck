class AddCascadeDeleteToPlayerCardsNewForeignKeys < ActiveRecord::Migration[7.1]
  def change
    remove_foreign_key :player_cards, column: :owner_id
    remove_foreign_key :player_cards, column: :current_holder_id
    remove_foreign_key :player_cards, column: :card_attached_id

    # Add new foreign keys with ON DELETE CASCADE
    add_foreign_key :player_cards, :players, column: :owner_id, on_delete: :cascade
    add_foreign_key :player_cards, :players, column: :current_holder_id, on_delete: :cascade
    add_foreign_key :player_cards, :player_cards, column: :card_attached_id, on_delete: :cascade
  end
end
