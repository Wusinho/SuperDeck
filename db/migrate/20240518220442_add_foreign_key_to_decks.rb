class AddForeignKeyToDecks < ActiveRecord::Migration[7.1]
  def change
    remove_foreign_key :decks, :games
    add_foreign_key :decks, :games, on_delete: :cascade
  end
end
