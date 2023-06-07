window.pets = [];
const pushPet = pet => {
  window.pets.push(pet);
  Pet.renderAll();
}

class Pet {
  constructor(
    name,
    species,
    age,
    color,
    breed,
    favoriteFood,
    favoriteToy,
    featured,
    celebrity
  ) {
    this.name = name;
    this.species = species;
    this.age = age;
    this.color = color;
    this.breed = breed;
    this.favoriteFood = favoriteFood;
    this.favoriteToy = favoriteToy;
    this.featured = featured;
    this.celebrity = celebrity;
  }

  generateCard() {
    return `
      <div class="pets__card ${this.featured ? 'pets__featured' : ''} ${
      this.celebrity ? 'pets__celebrity' : ''
    } ">
        <h2 class="pets__card__title">${this.name}</h2>
          <p class="pets__card__info">Species: ${this.species}</p>
          <p class="pets__card__info">Age: ${this.age}</p>
          <p class="pets__card__info">Color: ${this.color}</p>
          <p class="pets__card__info">Breed: ${this.breed}</p>
          <p class="pets__card__info">Favorite Food: ${this.favoriteFood}</p>
          <p class="pets__card__info">Favorite Toy: ${this.favoriteToy}</p>
        <button type="button" class="pets__card__button">More Info</button>
      </div>
    `;
  }

  static renderAll() {
    const petsGrid = document.querySelector('.pets__grid');
    if (!petsGrid) return;

    petsGrid.innerHTML = '';
    window.pets.forEach((pet) => {
      petsGrid.innerHTML += pet.generateCard();
    });
  }
}
const displayMessage = (message) => {
  const errorsDiv = document.querySelector('.error_messages');

  while (errorsDiv.firstChild) {
    errorsDiv.removeChild(errorsDiv.firstChild);
  }
  const errorMessage = document.createTextNode(message);
  errorsDiv.appendChild(errorMessage)
};

const fetchPets = (species, breed, age, page, per) => {
  let queryParams = new URLSearchParams();
  if (species) queryParams.append('species', species);
  if (breed) queryParams.append('breed', breed);
  if (age) queryParams.append('age', age);
  if (page) queryParams.append('page', page);
  if (per) queryParams.append('per', per);
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
            pet.name,
            pet.species,
            pet.age,
            pet.color,
            pet.breed,
            pet.favorite_food,
            pet.favorite_toy,
            pet.featured,
            pet.celebrity
          )
        );
      });
      renderPaginationElements(currentPage, pageSize, totalPages);
    });
  };

  const renderPaginationElements = (currentPage, pageSize, totalPages) => {
    const errorMessages = document.querySelector('.error_messages');
    errorMessages.innerHTML = ''; // Clear any previous errors

    const paginationElement = document.querySelector('.pagination');
    paginationElement.innerHTML = ''; // Clear current pagination

    const selectElement = document.createElement('select');
    selectElement.id = 'pet-selector';

    const perOptions = [2, 4, 6, 8, 10]

    perOptions.forEach(val => {
      const option = document.createElement('option');
      option.value = val;
      option.text = val;

      if (val == pageSize) {
        option.selected = true;
      }

      selectElement.appendChild(option);

    });
    
    selectElement.onchange = (event) => {
      fetchPets(species, breed, age, currentPage, event.target.value);
    };

    const selectLabel = document.createElement('label');
    selectLabel.innerText = 'Pets per page: ';
    selectLabel.htmlFor = selectElement.id;

    paginationElement.appendChild(selectLabel);
    paginationElement.appendChild(selectElement);

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

// Check params for "species" and fetch pets accordingly
const params = new URLSearchParams(window.location.search);
const species = params.get('species');
const breed = params.get('breed');
const age = params.get('age');
const page = params.get('page');
const per = params.get('per');
fetchPets(species, breed, age, page, per);
renderSelectElement();


