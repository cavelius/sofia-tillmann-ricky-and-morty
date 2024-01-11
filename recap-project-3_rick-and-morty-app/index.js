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

const prevButton = createBtn("previous", (event) => {
  console.log(page);
  if (page <= 1) {
    return;
  } else {
    page = page - 1;
  }
  console.log("Page after update", page);
  fetchCharacters();
});

// next button

const nextButton = createBtn("next", (event) => {
  console.log(page);
  if (page >= 42) {
    return;
  } else {
    page = page + 1;
  }
  console.log("Page after update", page);

  fetchCharacters();
});

// previous button search

const prevButtonSearch = createBtn("previous", (event) => {
  console.log(page);
  if (page <= 1) {
    return;
  } else {
    page = page - 1;
  }
  console.log("Page after update", page);
  fetchCharactersSearch();
});

// next button search

const nextButtonSearch = createBtn("next", (event) => {
  console.log(page);
  if (page >= `${maxPage}`) {
    return;
  } else {
    page = page + 1;
  }
  console.log("Page after update", page);
  fetchCharactersSearch();
});

// createCharacterCard();

async function fetchCharacters() {
  cardContainer.innerHTML = "";
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}`
  );
  const data = await response.json();
  console.log(data);

  const cards = data.results;

  cards.forEach((card) => {
    createCharacterCard(card);
  });
  navigation.innerHTML = "";

  const pagination = createPagination(page, maxPage);

  navigation.append(prevButton, pagination, nextButton);
}
fetchCharacters();

async function fetchCharactersSearch() {
  cardContainer.innerHTML = "";
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?name=${searchQuery}&page=${page}`
  );
  const data = await response.json();
  console.log(data);

  const cards = data.results;

  cards.forEach((card) => {
    createCharacterCard(card);
  });
  maxPage = data.info.pages;
  navigation.innerHTML = "";
  const pagination = createPagination(page, maxPage);
  navigation.append(prevButtonSearch, pagination, nextButtonSearch);
}

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  cardContainer.innerHTML = "";
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  const formElements = event.target.elements.value;

  console.log("Data", data);
  console.log("Data value:", data.query);
  console.log(formElements);
  console.log("works");
  searchQuery = data.query;
  console.log("search", searchQuery);
  fetchCharactersSearch();
  event.target.reset();
});
