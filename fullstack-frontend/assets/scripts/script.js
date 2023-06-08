import { displayMessage, Pet, renderSearchForm, renderSortSelector, renderPerPageSelector, fetchPets } from './index.js';

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
