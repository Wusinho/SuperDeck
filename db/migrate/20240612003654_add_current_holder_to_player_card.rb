class AddCurrentHolderToPlayerCard < ActiveRecord::Migration[7.1]
  def change
    remove_column :player_cards, :current_holder_id, :uuid
    add_reference :player_cards, :current_holder, type: :uuid, foreign_key: { to_table: :players }
    add_reference :player_cards, :card_attached, type: :uuid, foreign_key: { to_table: :player_cards }, null: true
  end
end
