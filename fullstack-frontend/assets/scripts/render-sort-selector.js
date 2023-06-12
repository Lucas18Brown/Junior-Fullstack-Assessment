import { fetchPets } from "./index.js";

export const renderSortSelector = (species, breed, age, currentPage, pageSize, name, searchTerm, sortBy) => {
  const sortElement = document.querySelector('.sort_selector');
  const sortSelector = document.createElement('select');
  sortSelector.id = 'sort-selector';

  const sortOptions = ["breed_asc", "breed_desc", "age_asc", "age_desc", "species_asc", "species_desc"]

  sortOptions.forEach(val => {
    const option = document.createElement('option');
    option.value = val;
    option.text = val;

    if (val == sortBy) {
      option.selected = true;
    }

    sortSelector.appendChild(option);

  });

  sortElement.onchange = (event) => {
    fetchPets(species, breed, age, currentPage, pageSize, name, searchTerm, event.target.value)
  };

  const sortLabel = document.createElement('label');
  sortLabel.innerText = 'Sort: ';
  sortLabel.htmlFor = sortElement.id;

  sortElement.appendChild(sortLabel);
  sortElement.appendChild(sortSelector);
}
