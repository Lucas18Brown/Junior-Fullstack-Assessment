
import { closeModal } from "./close-modal.js";

export const openModal = (pet) => {
  const modalElement = `
    <div class="modal-overlay">
      <div class="modal">
        <div class="modal-content">
          <button class="close-button">Less Info</button>
          <h2>Pets Name : ${pet.name}</h2>
          <img src="${pet.image}" alt="${pet.name}" style="max-width: 100%; max-height: 100%";>
          <p>Description: ${pet.description}</p>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalElement);
  document.querySelector('.modal').style.display = 'block';
  setTimeout(addCloseModalEvent, 0);
};

const addCloseModalEvent = () => {
  const modal = document.querySelector('.close-button');
  modal.addEventListener('click', () => closeModal());
}
