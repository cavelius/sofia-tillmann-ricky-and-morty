export function createBtn(text, callback) {
  const btn = document.createElement("button");
  btn.textContent = text;
  btn.addEventListener("click", callback);
  return btn;
}
