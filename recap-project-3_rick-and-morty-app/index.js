import { createCharacterCard } from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 42;
let page = 1;
const searchQuery = "";

// create previous button and append to navigation
// add event listener to show previous page

function createPrevBtn() {
  const prevBtn = document.createElement("button");
  prevBtn.textContent = "previous";
  prevBtn.addEventListener("click", (event) => {
    console.log("clicked");
    page = page - 1;
    if (page < 1) {
      return;
    }
    console.log(page);
    fetchCharacters();
  });
  return prevBtn;
}

// create pagination

function createPagination() {
  const pagination = document.createElement("span");
  pagination.classList.add("navigation__pagination");
  pagination.textContent = `${page} / ${maxPage}`;
  return pagination;
}

// create next button and append to navigation
// add event listener to show next page

function createNextBtn() {
  const nextBtn = document.createElement("button");
  nextBtn.textContent = "next";
  nextBtn.addEventListener("click", (event) => {
    console.log("clicked");
    page = page + 1;
    if (page > 42) {
      return;
    }
    console.log(page);
    fetchCharacters();
  });
  return nextBtn;
}

// createCharacterCard();

async function fetchCharacters() {
  cardContainer.innerHTML = "";
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}`
  );
  const data = await response.json();
  console.log(data);
  // return data;
  const cards = data.results;

  cards.forEach((card) => {
    createCharacterCard(card);
  });
  navigation.innerHTML = "";
  const prevButton = createPrevBtn();
  const pagination = createPagination();
  const nextButton = createNextBtn();
  navigation.append(prevButton, pagination, nextButton);
}
fetchCharacters();
