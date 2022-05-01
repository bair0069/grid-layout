const numberOfRows = document.querySelector("#rows");
const grid = document.querySelector("#grid");
const numberOfColumns = document.querySelector("#cols");
const numOfBoxes = document.querySelector("#boxes");
const form = document.querySelector(".form");
const boxHeight = document.querySelector("#height");
const boxWidth = document.querySelector("#width");
const gap = document.querySelector("#gap");
const boxRatios = document.querySelectorAll(".ratio-choice");
const gridAutos = document.querySelectorAll(".grid-auto-choice");

form.addEventListener("change", (e) => {
  e.preventDefault();
  clearGrid();
  getBoxRatioSelection();
  createGrid(numOfBoxes.value);
});

function clearGrid() {
  grid.innerHTML = "";
  grid.classList.remove("created-grid");
}

function getBoxRatioSelection() {
  let ratioList = Array.from(boxRatios);
  let radioChoice = ratioList.filter((radio) => {
    radio.addEventListener("click", (e) => {
      let selection = e.target.closest(".ratio-choice");
      selection.checked = true;
    });
    return radio.checked;
  });
  if(radioChoice.length==0)   {
    boxHeight.value = 10;
    boxWidth.value = 10;
  } else {
    let choice = radioChoice[0].value;
    switch (choice) {
      case "1:1":
        boxHeight.disabled = false;
        boxWidth.disabled = true;
        return (boxWidth.value = boxHeight.value);

      case "3:4":
        boxHeight.disabled = false;
        boxWidth.disabled = true;
        return (boxWidth.value = (boxHeight.value * 3) / 4);
      case "4:3":
        boxHeight.disabled = false;
        boxWidth.disabled = true;
        return (boxWidth.value = (boxHeight.value * 4) / 3);
      case "16:9":
        boxWidth.disabled = false;
        boxHeight.disabled = true;
        return (boxHeight.value = (boxWidth.value * 9) / 16);
      case "Custom":
        boxHeight.disabled = false;
        boxWidth.disabled = false;
        return;
      default:
        return;
    }
  }
}

function getGridAutoSelection() {
  let autoList = Array.from(gridAutos);
  let radioChoice = autoList.filter((radio) => {
    radio.addEventListener("click", (e) => {
      let selection = e.target.closest(".grid-auto-choice");
      selection.toggleAttribute("checked");
    });
    return radio
  });

  radioChoice.forEach((choice) => {
    if(choice.checked) {
      if (choice.name == "rows-auto") {
        grid.style.gridTemplateRows = 'auto';
        numberOfRows.disabled = choice.checked
      }
    }
    else {
      numberOfRows.disabled = false;
    }
  });
}

function createGrid(boxes) {
  for (let i = 0; i < boxes; i++) {
    let div = document.createElement("div");
    div.classList.add("grid-item");
    grid.append(div);
  }
  grid.classList.add("created-grid");

  grid.style.gridTemplateColumns = `repeat(${numberOfColumns.value}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${numberOfRows.value}, 1fr)`;
  getGridAutoSelection();
  grid.style.gridGap = `${gap.value}rem`;

  let gridItems = document.querySelectorAll(".grid-item");
  if (gridItems) {
    gridItems.forEach((item) => {
      item.style.height = `${boxHeight.value}rem`;
      item.style.width = `${boxWidth.value}rem`;
    });
  } else {
    (boxHeight.display = "none"), (boxWidth.display = "none");
  }
}
