class AddTurnOrderToPlayers < ActiveRecord::Migration[7.1]
  def change
    add_column :players, :turn_order, :integer
  end
end
