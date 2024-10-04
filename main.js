let colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown', 'gray', 'cyan'];
let colorPairs = [...colors, ...colors];

let container = document.getElementById('container');
let selectedCells = [];

colorPairs = colorPairs.sort(() => 0.5 - Math.random());

const gameContainer = document.querySelector('.game-playing');
  colorPairs.forEach(color => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-color', color);
    cell.style.backgroundColor = color;
    gameContainer.appendChild(cell);
  });

let boxes = document.querySelectorAll('.cell');  

boxes.forEach(box => {
  box.addEventListener('click', function() {
    let color = box.getAttribute('data-color');
    selectedCells.push(box);

    if (selectedCells.length === 2) {
      compareColors(selectedCells);
      selectedCells = []; 
    }
    console.log(color);
  });
});


function compareColors(cells) {
  let color1 = cells[0].getAttribute('data-color');
  let color2 = cells[1].getAttribute('data-color');

  if (color1 === color2) {
    cells[0].classList.add('hidden');
    cells[1].classList.add('hidden');

    checkGameEnd(); 
  } else {
    console.log(color1, color2);
  }
}

function checkGameEnd() {
  const visibleCells = document.querySelectorAll('.cell:not(.hidden)');
  
  if (visibleCells.length === 0) {
      displayWinningMessage();
  }
}

function displayWinningMessage() {
  
}