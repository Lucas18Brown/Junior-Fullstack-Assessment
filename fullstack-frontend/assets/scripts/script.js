import { displayMessage } from './displayMessage.js';
import Pet from './Pet.js';

window.pets = [];
const pushPet = pet => {
  window.pets.push(pet);
  Pet.renderAll();
}

const fetchPets = (species, breed, age, page, per, name, searchTerm, sortBy) => {
  let queryParams = new URLSearchParams();
  if (species) queryParams.append('species', species);
  if (breed) queryParams.append('breed', breed);
  if (age) queryParams.append('age', age);
  if (page) queryParams.append('page', page);
  if (per) queryParams.append('per', per);
  if (name) queryParams.append('name', name);
  if (searchTerm) queryParams.append('search', searchTerm);
  if (sortBy) queryParams.append('sort_by', sortBy);
  fetch(
    `http://127.0.0.1:3000/api/v1/pets?${queryParams.toString()}`
  )
  .then((response) => {
    const totalCount = response.headers.get('X-Total-Count');
    const totalPages = response.headers.get('X-Total-Pages');
    const currentPage = response.headers.get('X-Page');
    const pageSize = response.headers.get('X-Per-Page');
    return response.json().then((data) => ({ data, totalCount, totalPages, currentPage, pageSize }));
  })
    .then(({ data, totalCount, totalPages, currentPage, pageSize }) => {
      window.pets = [];
      data.forEach((pet) => {
        pushPet(
          new Pet(
            pet.id,
            pet.name,
            pet.species,
            pet.age,
            pet.color,
            pet.breed,
            pet.favorite_food,
            pet.favorite_toy,
            pet.featured,
            pet.celebrity,
            pet.description,
            pet.image_path
          )
        );
      });
      renderPaginationElements(currentPage, pageSize, totalPages);
      displayMessage(`Displaying ${pageSize} pets per page out of a total : ${totalCount} pets`);
    });
  };

  const renderSearchForm = (species, breed, age, currentPage, pageSize, name, sortBy)  => {
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

  const renderPerPageSelector = (pageSize, currentPage) => {
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

  const renderSortSelector = (species, breed, age, currentPage, pageSize, name, searchTerm, sortBy) => {
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

  const renderPaginationElements = (currentPage, pageSize, totalPages) => {
    const errorMessages = document.querySelector('.error_messages');
    errorMessages.innerHTML = ''; // Clear any previous errors

    const paginationElement = document.querySelector('.pagination');
    paginationElement.innerHTML = ''; // Clear current pagination

    const prevButton = document.createElement('button');
    prevButton.innerText = 'Previous';

    prevButton.onclick = () => {
      if (currentPage > 1)
      fetchPets(species, breed, age, parseInt(currentPage) - 1, pageSize);
      else if (currentPage == 1)
      displayMessage('You are on the first page of pets');
    };
    paginationElement.appendChild(prevButton);

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.innerText = i;
      pageButton.onclick = () => fetchPets(species, breed, age, i, pageSize);
      paginationElement.appendChild(pageButton);
    }

    const nextButton = document.createElement('button');
    nextButton.innerText = 'Next';
    nextButton.onclick = () => {
      if (currentPage < totalPages)
      fetchPets(species, breed, age, parseInt(currentPage) + 1, pageSize );
      else if (currentPage == totalPages)
      displayMessage('Sorry thats all our pets');
    };
    paginationElement.appendChild(nextButton);
  };

  // Check params and fetch pets accordingly
  const params = new URLSearchParams(window.location.search);
  const species = params.get('species');
  const breed = params.get('breed');
  const age = params.get('age');
  const page = params.get('page');
  const per = params.get('per');
  const name = params.get('name');
  const searchTerm = params.get('searchTerm');
  const sortBy = params.get('sortBy');
  fetchPets(species, breed, age, page, per, name, searchTerm, sortBy);
  renderSearchForm();
  renderPerPageSelector();
  renderSortSelector();
