import { fetchPets } from "./index.js";

export const renderPerPageSelector = (species, breed, age, pageSize, currentPage, searchTerm, sortBy) => {
  const selectElement = document.querySelector('.per_page_selector');
  const selector = document.createElement('select');
  selector.id = 'pet-selector';

  const perOptions = [2, 4, 6, 8, 10]

  perOptions.forEach(val => {
    const option = document.createElement('option');
    option.value = val;
    option.text = val;

    if (val == pageSize) {
      option.selected = true;
    }

    selector.appendChild(option);

  });

  selectElement.onchange = (event) => {
    fetchPets(species, breed, age, currentPage, event.target.value, name, searchTerm, sortBy);
  };

  const selectLabel = document.createElement('label');
  selectLabel.innerText = 'Pets per page: ';
  selectLabel.htmlFor = selectElement.id;

  selectElement.appendChild(selectLabel);
  selectElement.appendChild(selector);
}
