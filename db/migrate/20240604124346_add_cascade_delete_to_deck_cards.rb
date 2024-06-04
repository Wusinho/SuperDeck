class AddCascadeDeleteToDeckCards < ActiveRecord::Migration[7.1]
  def change
    remove_foreign_key :deck_cards, :decks
    add_foreign_key :deck_cards, :decks, on_delete: :cascade
  end
end
