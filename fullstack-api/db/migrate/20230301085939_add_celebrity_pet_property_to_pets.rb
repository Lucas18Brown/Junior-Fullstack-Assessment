class AddCelebrityPetPropertyToPets < ActiveRecord::Migration[7.0]
 def change
  add_column :pets, :celebrity, :boolean
 end
end
