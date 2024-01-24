import { createCharacterCard } from "./components/card/card.js";
import { createBtn } from "./components/nav-button/nav-button.js";
import { createPagination } from "./components/nav-pagination/nav-pagination.js";
import { throwErrorNoCharacter } from "./components/error/error.js";
import { logoRefreshPage } from "./components/logo/logo.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const logo = document.querySelector('[data-js="logo"]');

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

  try {
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
    console.log(searchQuery);
    console.log(page);
  } catch (error) {
    console.error("No character of this name!");
    throwErrorNoCharacter(searchQuery);
    navigation.innerHTML = "";
    const pagination = createPagination(0, 0);
    navigation.append(prevButton, pagination, nextButton);
    nextButton.disabled = true;
    prevButton.disabled = true;
  }
}
fetchCharacters();

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  cardContainer.innerHTML = "";
  // refreshs page to 1
  page = 1;
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  // const formElements = event.target.elements.value;
  searchQuery = data.query;
  // both buttons are disabled after search error
  // with new submit they are again activated
  nextButton.disabled = false;
  prevButton.disabled = false;
  fetchCharacters();
  event.target.reset();
});
