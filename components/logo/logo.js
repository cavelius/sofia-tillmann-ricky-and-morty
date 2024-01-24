const logo = document.querySelector('[data-js="logo"]');

export function logoRefreshPage(searchQuery, page, callback) {
  logo.addEventListener("click", (event) => {
    console.log("Logo click");
    searchQuery = "";
    page = 1;
    callback;
  });
}
