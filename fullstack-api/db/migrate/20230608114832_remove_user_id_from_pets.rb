class RemoveUserIdFromPets < ActiveRecord::Migration[7.0]
  def change
    remove_column :pets, :user_id, :integer
  end
end
