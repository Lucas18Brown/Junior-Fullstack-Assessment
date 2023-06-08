export const closeModal = () => {
  const modal = document.querySelector('.modal');
  const modalOverlay = document.querySelector('.modal-overlay');

  if (modal) {
    modal.style.display = 'none';
    modalOverlay.style.display = 'none';
    modal.parentNode.removeChild(modal);
    modalOverlay.parentNode.removeChild(modalOverlay);
  }
}
