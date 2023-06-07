require 'pet_filters'
class Pet < ApplicationRecord
  include PetFilters
  belongs_to :user

  scope :filter_pets_by_species, -> (species) { where species: species }
  scope :filter_pets_by_breed, -> (breed) { where breed: breed }
  scope :filter_pets_by_age, -> (age) { where age: age }
  scope :filter_pets_by_page, -> (page) { Pet.page(1) }
  scope :filter_pets_by_per, -> (per) { Pet.page(1).per(per) }

  validates :name, :species, :age, :color, :breed, presence: true
end
