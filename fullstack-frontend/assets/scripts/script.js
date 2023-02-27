window.pets = [];
const pushPet = pet => {
  window.pets.push(pet);
  Pet.renderAll();
}

class Pet {
  constructor(name, species, age, color, breed, favoriteFood, favoriteToy, featured = false, annoying_woof = false, description, image) {
    this.name = name;
    this.species = species;
    this.age = age;
    this.color = color;
    this.breed = breed;
    this.favoriteFood = favoriteFood;
    this.favoriteToy = favoriteToy;
    this.featured = featured;
    this.annoying_woof = annoying_woof;
    this.description = description;
    this.image = image
  }

  specialProperty() {
    let classNames = ""

    this.featured ? classNames += 'pets__featured ' : "";

    this.annoying_woof ? classNames += 'pets__annoying-woof ' : "";

    return classNames.trim()
  }

  generateCard() {
    return `
      <div class="pets__card ${this.specialProperty()}">
        <h2 class="pets__card__title">${this.name}</h2>
        <p class="pets__card__info">Species: ${this.species}</p>
        <p class="pets__card__info">Age: ${this.age}</p>
        <p class="pets__card__info">Color: ${this.color}</p>
        <p class="pets__card__info">Breed: ${this.breed}</p>
        <p class="pets__card__info">Favorite Food: ${this.favoriteFood}</p>
        <p class="pets__card__info">Favorite Toy: ${this.favoriteToy}</p>
        <button type="button" class="pets__card__button" onclick="showModal('${this.name}', '${this.description}', '${this.image}')">More Info</button>
      </div>
    `;
  }

  static renderAll() {
    const petsGrid = document.querySelector('.pets__grid');
    if (!petsGrid) return;

    petsGrid.innerHTML = '';
    window.pets.forEach(pet => {
      petsGrid.innerHTML += pet.generateCard();
    });
  }
}

function showModal(petName, petDescription, petImage) {
  // Create the modal element
  const modal = document.createElement('div');
  modal.classList.add('modal');

  // Create the modal content
  const modalContent = document.createElement('div');
  modalContent.classList.add('modal__content');
  modalContent.innerHTML = `
    <img class="modal__image" src="${petImage}">
    <div class="modal__info">
      <h2 class="modal__info__title">${petName}</h2>
      <p class="modal__info__description">${petDescription}</p>
    </div>
  `;

  // Add the modal content to the modal element
  modal.appendChild(modalContent);

  // Add the modal element to the page
  document.body.appendChild(modal);

  // Add a click event listener to the modal to close it when clicked
  modal.addEventListener('click', event => {
    if (event.target === modal) {
      modal.remove();
    }
  });
}

const fetchPets = species => {
  fetch(`http://127.0.0.1:3000/api/v1/pets${species ? `?species=${species}` : ''}`).then(response => response.json()).then(data => {
    data.forEach(pet => {
      pushPet(new Pet(
        pet.name,
        pet.species,
        pet.age,
        pet.color,
        pet.breed,
        pet.favorite_food,
        pet.favorite_toy,
        pet.featured,
        pet.annoying_woof,
        pet.description,
        pet.image
      ));
    });
  });
}

// Check params for "species" and fetch pets accordingly
const params = new URLSearchParams(window.location.search);
const species = params.get('species');
fetchPets(species);
