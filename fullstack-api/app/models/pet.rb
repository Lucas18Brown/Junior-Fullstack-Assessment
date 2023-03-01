require 'pet_filters'
class Pet < ApplicationRecord
  include PetFilters

  scope :filter_pets_by_species, -> (species) { where species: species }
  scope :filter_pets_by_breed, -> (breed) { where breed: breed }
  scope :filter_pets_by_age, -> (age) { where age: age }
end
