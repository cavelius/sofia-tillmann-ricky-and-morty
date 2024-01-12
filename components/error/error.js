const cardContainer = document.querySelector('[data-js="card-container"]');

export function throwErrorNoCharacter(searchQuery) {
  cardContainer.innerHTML = "";
  const errorMessage = document.createElement("p");
  errorMessage.classList.add("error-message"),
    (errorMessage.textContent = `Sorry, there is no character ${searchQuery}!`);
  cardContainer.append(errorMessage);
}
