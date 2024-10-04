let colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown', 'gray', 'cyan'];
let colorPairs = [...colors, ...colors];
let selectedCells = [];

const gameContainer = document.querySelector('.game-playing');

function startNewGame() {
  colorPairs = colorPairs.sort(() => 0.5 - Math.random());
  
  gameContainer.innerHTML = '';

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
        setTimeout(() => {
          compareColors(selectedCells);
          selectedCells = [];
        }, 100);
      }

      console.log(color);
    });
  });
}

function compareColors(cells) {
  let color1 = cells[0].getAttribute('data-color');
  let color2 = cells[1].getAttribute('data-color');

  if (color1 === color2) {

    cells[0].style.visibility = 'hidden';
    cells[1].style.visibility = 'hidden';

    checkGameEnd();
  } else {
    console.log('Цвета не совпадают: ', color1, color2);
  }
}

function checkGameEnd() {
  const visibleCells = document.querySelectorAll('.cell');
  let allHidden = true;

  visibleCells.forEach(cell => {
    if (cell.style.visibility !== 'hidden') {
      allHidden = false;
    }
  });

  if (allHidden) {
    displayWinningMessage();
  }
}

function displayWinningMessage() {
  const winningMessage = document.getElementById('winningMessage');
  winningMessage.classList.remove('hidden');
}

document.getElementById('restartGame').addEventListener('click', () => {
  const winningMessage = document.getElementById('winningMessage');
  winningMessage.classList.add('hidden');
  startNewGame(); 
});

document.getElementById('startGameButton').addEventListener('click', () => {
  const gameStartModal = document.getElementById('gameStartModal');
  gameStartModal.classList.add('hidden');
  startNewGame();
});
