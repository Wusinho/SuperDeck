class AddUploadImageIdToCard < ActiveRecord::Migration[7.1]
  def change
    add_column :cards, :img_id, :string
  end
end
