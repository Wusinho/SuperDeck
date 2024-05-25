class CreatePlayerCards < ActiveRecord::Migration[7.1]
  def change
    create_table :player_cards, id: :uuid do |t|
      t.uuid :current_holder_id
      t.references :player, null: true, foreign_key: { to_table: :players }, type: :uuid
      t.references :card, null: false, foreign_key: true, type: :uuid
      t.boolean :drawn, default: false, null: false
      t.integer :zone, default: 0, null: false
      t.integer :action, default: 0, null: false

      t.timestamps
    end

    add_foreign_key :player_cards, :players, column: :current_holder_id
    add_index :player_cards, :zone
    add_index :player_cards, :current_holder_id
  end
end
