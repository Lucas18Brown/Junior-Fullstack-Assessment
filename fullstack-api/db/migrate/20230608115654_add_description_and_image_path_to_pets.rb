class AddDescriptionAndImagePathToPets < ActiveRecord::Migration[7.0]
  def change
    add_column :pets, :description, :text
    add_column :pets, :image_path, :string
  end
end
