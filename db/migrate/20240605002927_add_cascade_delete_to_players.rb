class AddCascadeDeleteToPlayers < ActiveRecord::Migration[7.1]
  def change
    remove_foreign_key :players, :games
    add_foreign_key :players, :games, on_delete: :cascade
  end
end
