class AddCardState < ActiveRecord::Migration[7.1]
  def change
    rename_column :player_cards, :drawn, :morphed
    add_column :player_cards, :tapped, :boolean, default: false, null: false
    remove_column :player_cards, :action, :integer
  end
end
