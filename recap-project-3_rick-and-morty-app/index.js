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
const maxPage = 10;
let page = 5;
const searchQuery = "";

function createPrevBtn() {
  const prevBtn = document.createElement("button");
  prevBtn.textContent = "previous";
  navigation.append(prevBtn);
  prevBtn.addEventListener("click", (event) => {
    // page = 10;
    console.log("clicked");
  });
}
createPrevBtn();

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
}
fetchCharacters();

/* <button class="button button--prev" data-js="button-prev">
previous
</button>
<span class="navigation__pagination" data-js="pagination">1 / 1</span>
<button class="button button--next" data-js="button-next">next</button> */
