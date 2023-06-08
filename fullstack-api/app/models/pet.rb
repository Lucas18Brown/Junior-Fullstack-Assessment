require 'pet_filters'
class Pet < ApplicationRecord
  include PetFilters

  scope :filter_pets_by_species, -> (species) { where species: species }
  scope :filter_pets_by_breed, -> (breed) { where breed: breed }
  scope :filter_pets_by_age, -> (age) { where age: age }
  scope :filter_pets_by_page, -> (page) { Pet.page(1) }
  scope :filter_pets_by_per, -> (per) { Pet.page(1).per(per) }

  scope :filter_pets_by_name, -> (name) { where("name ILIKE ?", name) }
  scope :filter_pets_by_search, -> (search_term) {
    where(
      'LOWER(name) ILIKE :search OR LOWER(species) ILIKE :search OR LOWER(breed) ILIKE :search OR age::text ILIKE :search',
      search: "%#{search_term.downcase}%"
    )
  }

  validates :name, :species, :age, :color, :breed, presence: true
end
