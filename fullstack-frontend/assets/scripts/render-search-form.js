import { displayMessage, fetchPets } from './index.js';

export const renderSearchForm = (species, breed, age, currentPage, pageSize, name, sortBy)  => {
  const searchForm = document.querySelector('.pets__search__form');
  searchForm.id = 'search-form';

  const searchFormLabel = document.createElement('label');
  searchFormLabel.innerText = 'Search by name, breed or species: ';
  searchFormLabel.htmlFor = searchForm.id;

  const searchInput = document.createElement('input');
  searchInput.id = 'search-input';
  searchInput.name = 'searchInput';
  searchInput.type = 'text';
  searchInput.placeholder = '.......';

  const submitButton = document.createElement('input');
  submitButton.type = 'submit';
  submitButton.value = 'Search';

  submitButton.onclick = () => {
    if(searchInput.value) {
      displayMessage(`Searching for ${searchInput.value}....`)
      fetchPets(species, breed, age, currentPage, pageSize, name, searchInput.value, sortBy);
    } else if (!searchInput.value) {
      displayMessage("Please enter the name, breed or species of the pet you would like to find and try again ");
    }
  };

  searchForm.appendChild(searchFormLabel);
  searchForm.appendChild(searchInput);
  searchForm.appendChild(submitButton);
};
