const searchBar = document.querySelector('[data-js="search-bar"]');

export function createSearchBar() {
  const searchBar = document.createElement("input");
  searchBar.addEventListener("submit", (event) => {
    console.log("seach");
    searchBar.innerHTML = `
    <input
    name="query"
    class="search-bar__input"
    type="text"
    placeholder="search characters"
    aria-label="character name"
  />
//   <button class="search-bar__button" aria-label="search for character">
//     <img
//       class="search-bar__icon"
//       src="assets/magnifying-glass.png"
//       alt=""
//     />
//   </button>
      `;
  });
  searchBarContainer.append(searchBar);
}
