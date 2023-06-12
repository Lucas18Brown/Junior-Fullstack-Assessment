import { fetchPets, displayMessage } from "./index.js";


export const renderPaginationElements = (species, breed,age, currentPage, pageSize, totalPages) => {
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
