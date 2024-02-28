class CreateCardActions < ActiveRecord::Migration[7.1]
  def change
    create_table :card_actions, id: :uuid do |t|
      t.references :player_card, null: false, foreign_key: true, type: :uuid
      t.integer :action
      t.boolean :discard
      t.string :viewers, array: true, default: []
      t.string :decider, array: true, default: []

      t.timestamps
    end
  end
end
