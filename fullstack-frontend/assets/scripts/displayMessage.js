export const displayMessage = (message) => {
  const errorsDiv = document.querySelector('.error_messages');

  while (errorsDiv.firstChild) {
    errorsDiv.removeChild(errorsDiv.firstChild);
  }
  const errorMessage = document.createTextNode(message);
  errorsDiv.appendChild(errorMessage)
};
