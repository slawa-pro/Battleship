let colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown', 'gray', 'cyan'];
let colorPairs = [...colors, ...colors];

let selectedCells = [];

let startTime;
let timerInterval;
let attempts = 0;

const gameContainer = document.querySelector('.game-playing');

function startNewGame() {
  colorPairs = colorPairs.sort(() => 0.5 - Math.random());
  gameRestart.play();

  const gameInfo = document.getElementById('gameInfo');
  gameInfo.classList.remove('hidden');

  gameContainer.innerHTML = '';

  colorPairs.forEach(color => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-color', color);
    cell.style.backgroundColor = color;
    gameContainer.appendChild(cell);
  });

  attempts = 0;
  updateAttempts();
  startTime = new Date();
  startTimer();

  let boxes = document.querySelectorAll('.cell');

  boxes.forEach(box => {
    box.addEventListener('click', function() {
      let color = box.getAttribute('data-color');
      selectedCells.push(box);
      clickSound.play();

      if (selectedCells.length === 2) {
        attempts++;
        updateAttempts();
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

function updateAttempts() {
  document.getElementById('attempts-count').innerText = `Attempts: ${attempts}`;
  if (attempts === 13) {
    gameoverSound.play();
    clearInterval(timerInterval); 
    disableCells();
    displayGameOverMessage();
  }
}

function startTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
  }

  const timeDisplay = document.getElementById('time-spent');
  
  function updateTime() {
    let currentTime = new Date();
    let timeSpent = Math.floor((currentTime - startTime) / 1000);
    timeDisplay.innerText = `Time spent: ${timeSpent} sec`;
  }

  timerInterval = setInterval(updateTime, 1000);
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
    clearInterval(timerInterval);
    winSound.play();
    displayWinningMessage();
  }
}

function displayWinningMessage() {
  const winningMessage = document.getElementById('winningMessage');
  winningMessage.classList.remove('hidden');
}

function displayGameOverMessage() {
  const gameOverMessage = document.getElementById('gameOverMessage');
  gameOverMessage.classList.remove('hidden');
}

function disableCells() {
  let boxes = document.querySelectorAll('.cell');
  boxes.forEach(box => {
    box.style.pointerEvents = 'none';
  });
}

document.getElementById('restartGame').addEventListener('click', () => {
  const winningMessage = document.getElementById('winningMessage');
  winningMessage.classList.add('hidden');
  startNewGame();
});

document.getElementById('restartGameOver').addEventListener('click', () => {
  const gameOverMessage = document.getElementById('gameOverMessage');
  gameOverMessage.classList.add('hidden');
  startNewGame();
});

document.getElementById('startGameButton').addEventListener('click', () => {
  const gameStartModal = document.getElementById('gameStartModal');
  gameStartModal.classList.add('hidden');
  startNewGame();
});

const startGameButton = document.getElementById('startGameButton');
const startSound = document.getElementById('start-sound');

const clickSound = document.getElementById('click-sound');
const winSound = document.getElementById('win-sound');
const gameoverSound = document.getElementById('gameover-sound');
const gameRestart = document.getElementById('game-restart');

startGameButton.addEventListener('click', function() {
  startSound.play();
  startNewGame();
});
