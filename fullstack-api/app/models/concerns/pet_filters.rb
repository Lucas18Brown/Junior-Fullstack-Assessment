module PetFilters
  extend ActiveSupport::Concern
  module ClassMethods
    def filter(filtering_params)
      filtered_pets = self.where(nil)
      filtering_params.each do |key, value|
        filtered_pets = filtered_pets.public_send("filter_pets_by_#{key}", value) if value.present?
      end
      filtered_pets
    end
  end
end
