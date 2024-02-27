class CreateGameConfigurations < ActiveRecord::Migration[7.1]
  def change
    create_table :game_configurations, id: :uuid do |t|
      t.integer :quantity_players, default: 2
      t.integer :deck_size, default: 200
      t.references :game, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
