class CreateDecks < ActiveRecord::Migration[7.1]
  def change
    create_table :decks, id: :uuid do |t|
      t.references :game, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
