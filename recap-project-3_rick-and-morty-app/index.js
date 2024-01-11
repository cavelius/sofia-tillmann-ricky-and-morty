import { createCharacterCard } from "./components/card/card.js";
// import { createSearchBar } from "./components/search-bar/search-bar.js";

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
let maxPage = 42;
let page = 1;
let searchQuery = "";

// create previous button and append to navigation
// add event listener to show previous page

function createPrevBtn() {
  const prevBtn = document.createElement("button");
  prevBtn.textContent = "previous";
  prevBtn.addEventListener("click", (event) => {
    console.log("clicked");
    if (page <= 1) {
      return;
    } else {
      page = page - 1;
    }
    console.log(page);
    fetchCharacters();
  });
  return prevBtn;
}

function createPrevBtnSearch() {
  const prevBtnSearch = document.createElement("button");
  prevBtnSearch.textContent = "previous";
  prevBtnSearch.addEventListener("click", (event) => {
    console.log("clicked");
    if (page <= 1) {
      return;
    } else {
      page = page - 1;
    }
    console.log(page);
    fetchCharactersSearch();
  });
  return prevBtnSearch;
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
    if (page >= 42) {
      return;
    } else {
      page = page + 1;
    }
    console.log(page);
    fetchCharacters();
  });
  return nextBtn;
}

function createNextBtnSearch() {
  const nextBtnSearch = document.createElement("button");
  nextBtnSearch.textContent = "next";
  nextBtnSearch.addEventListener("click", (event) => {
    console.log("clicked");
    if (page >= `${maxPage}`) {
      return;
    } else {
      page = page + 1;
    }
    console.log(page);
    fetchCharactersSearch();
  });
  return nextBtnSearch;
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

// const form = document.querySelector('["search-bar"]');

async function fetchCharactersSearch() {
  cardContainer.innerHTML = "";
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?name=${searchQuery}&page=${page}`
  );
  const data = await response.json();
  console.log(data);
  // return data;
  const cards = data.results;

  cards.forEach((card) => {
    createCharacterCard(card);
  });
  maxPage = data.info.pages;
  navigation.innerHTML = "";
  const prevButtonSearch = createPrevBtnSearch();
  const pagination = createPagination();
  const nextButtonSearch = createNextBtnSearch();
  navigation.append(prevButtonSearch, pagination, nextButtonSearch);
}

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  cardContainer.innerHTML = "";
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  const formElements = event.target.elements.value;
  // searchQuery = data;

  console.log("Data", data);
  console.log("Data value:", data.query);
  console.log(formElements);
  // console.log(formElements.query.value);
  console.log("works");
  searchQuery = data.query;
  console.log("search", searchQuery);
  fetchCharactersSearch();
  event.target.reset();
});

// console.log(event.target);
// console.log(formElements);
// console.log(formElements.firstName);
// console.log(formElements.firstName.value);

// function createSearchBar() {
//   const searchBar = document.createElement("input");
//   searchBar.innerHTML = `

//   `;
//   searchBar.addEventListener("submit", (event) => {
//     console.log("seach");
//   });
//   searchBarContainer.append(searchBar);
// }

// createSearchBar();
