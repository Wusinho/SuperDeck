class AddCascadeDeleteToGameConfiguration < ActiveRecord::Migration[7.1]
  def change
    remove_foreign_key :game_configurations, :games
    add_foreign_key :game_configurations, :games, on_delete: :cascade
  end
end
