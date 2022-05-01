const numberOfRows = document.querySelector("#rows").value;
const grid = document.querySelector("#grid");
const numberOfColumns = document.querySelector("#cols").value;
const numOfBoxes = document.querySelector("#boxes");
const form = document.querySelector(".form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  clearGrid();
  createGrid(numOfBoxes.value);
});

function clearGrid (){
  grid.innerHTML = "";
  grid.classList.remove("created-grid");
}
function createGrid(boxes) {
  console.log("adding", boxes, "boxes");
  for (let i = 0; i < boxes; i++) {
    let div = document.createElement("div");
    div.classList.add("grid-item");
    grid.append(div);
  }
  grid.classList.add("created-grid");

  grid.style.gridTemplateColumns = `repeat(${numberOfColumns}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${numberOfRows}, 1fr)`;
}
