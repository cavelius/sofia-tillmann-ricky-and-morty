import { createCharacterCard } from "./components/card/card.js";
import { createBtn } from "./components/nav-button/nav-button.js";
import { createPagination } from "./components/nav-pagination/nav-pagination.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');

// States
let maxPage = 42;
let page = 1;
let searchQuery = "";

// create previous button and append to navigation
// add event listener to show previous page

// previous button

const prevButton = createBtn("<<<", (event) => {
  console.log(page);
  if (page <= 1) {
    prevButton.disabled = true;
    return;
  } else {
    page = page - 1;
    nextButton.disabled = false;
  }
  fetchCharacters();
});

const nextButton = createBtn(">>>", (event) => {
  console.log(page);
  if (page >= `${maxPage}`) {
    nextButton.disabled = true;
    return;
  } else {
    page = page + 1;
    prevButton.disabled = false;
  }
  fetchCharacters();
});

async function fetchCharacters() {
  cardContainer.innerHTML = "";
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?name=${searchQuery}&page=${page}`
  );
  const data = await response.json();

  const cards = data.results;

  cards.forEach((card) => {
    createCharacterCard(card);
  });
  maxPage = data.info.pages;
  navigation.innerHTML = "";

  const pagination = createPagination(page, maxPage);

  navigation.append(prevButton, pagination, nextButton);
}
fetchCharacters();

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  cardContainer.innerHTML = "";
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  const formElements = event.target.elements.value;
  searchQuery = data.query;
  fetchCharacters();
  event.target.reset();
});
