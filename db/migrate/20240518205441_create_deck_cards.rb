class CreateDeckCards < ActiveRecord::Migration[7.1]
  def change
    create_table :deck_cards, id: :uuid do |t|
      t.references :deck, null: false, foreign_key: true, type: :uuid
      t.references :card, null: false, foreign_key: true, type: :uuid
      t.integer :position, null: false
      t.boolean :drawn, default: false, null: false
      t.boolean :played, default: false

      t.timestamps
    end
  end
end
