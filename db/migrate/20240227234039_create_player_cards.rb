class CreatePlayerCards < ActiveRecord::Migration[7.1]
  def change
    create_table :player_cards, id: :uuid do |t|
      t.integer :location, default: 0
      t.uuid :current_holder_id, index: true
      t.references :player, null: true, foreign_key: { to_table: :players }, type: :uuid
      t.references :game, null: false, foreign_key: true, type: :uuid
      t.references :card, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end

    # This adds a foreign key from player_cards to players for the current_holder_id column
    add_foreign_key :player_cards, :players, column: :current_holder_id
  end
end
