import { openModal } from "./open-modal.js";
import { closeModal } from "./close-modal.js";

export default class Pet {
  constructor(
    id,
    name,
    species,
    age,
    color,
    breed,
    favoriteFood,
    favoriteToy,
    featured,
    celebrity,
    description,
    image
  ) {
    this.id = id;
    this.name = name;
    this.species = species;
    this.age = age;
    this.color = color;
    this.breed = breed;
    this.favoriteFood = favoriteFood;
    this.favoriteToy = favoriteToy;
    this.featured = featured;
    this.celebrity = celebrity;
    this.description = description;
    this.image = image;
  }

  generateCard() {
    return `
      <div id="${this.name}" class="pets__card ${this.featured ? 'pets__featured' : ''} ${
      this.celebrity ? 'pets__celebrity' : ''
    } ">
        <h2 class="pets__card__title">${this.name}</h2>
          <p class="pets__card__info">Species: ${this.species}</p>
          <p class="pets__card__info">Age: ${this.age}</p>
          <p class="pets__card__info">Color: ${this.color}</p>
          <p class="pets__card__info">Breed: ${this.breed}</p>
          <p class="pets__card__info">Favorite Food: ${this.favoriteFood}</p>
          <p class="pets__card__info">Favorite Toy: ${this.favoriteToy}</p>
          <button type="button" class="pets__card__open__button" data-pet-id="${this.id}">More Info</button>
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
    window.pets.forEach((pet) => {
      pet.addOpenModalEvent();
    });
  }

  addOpenModalEvent() {
    const petCards = document.querySelectorAll('.pets__card');
    petCards.forEach(petCard => {
      const buttons = petCard.querySelectorAll(`button[data-pet-id="${this.id}"]`);
      buttons.forEach(button => {
      button.addEventListener('click', () => openModal(this));
    });
  });
  }
}
