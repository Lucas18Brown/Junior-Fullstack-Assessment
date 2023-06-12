import { displayMessage, renderPaginationElements, Pet  } from './index.js'

window.pets = [];
const pushPet = pet => {
  window.pets.push(pet);
  Pet.renderAll();
}

export const fetchPets = (species, breed, age, page, per, name, searchTerm, sortBy) => {
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
        renderPaginationElements(species, breed, age, currentPage, pageSize, totalPages);
        displayMessage(`Displaying ${pageSize} pets per page out of a total : ${totalCount} pets`);
      });
    };
