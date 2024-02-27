class CreateCards < ActiveRecord::Migration[7.1]
  def change
    create_table :cards, id: :uuid do |t|
      t.string :name
      t.string :mana_cost
      t.string :colors
      t.string :super_type
      t.string :types
      t.string :rarity
      t.string :set_name
      t.string :text
      t.string :image_url
      t.timestamps
    end
  end
end
