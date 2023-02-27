class AddAnnoyingWoofToPets < ActiveRecord::Migration[7.0]
  def change
    add_column :pets, :annoying_woof, :boolean
  end
end
