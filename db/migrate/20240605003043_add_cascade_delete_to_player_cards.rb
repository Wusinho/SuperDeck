class AddCascadeDeleteToPlayerCards < ActiveRecord::Migration[7.1]
  def change
    remove_foreign_key :player_cards, :players
    add_foreign_key :player_cards, :players, on_delete: :cascade
  end
end
