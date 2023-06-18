// ----------------------------Step 1---------------------------
// Create the board with 9 cells
let board = ['', '', '', '', '', '', '', '', ''];
const infoDisplay = document.getElementById('info');
const infoWin = document.getElementById('win');
const infoTie = document.getElementById('infoHeader');
const reStart = document.getElementById('reset-btn');
const changeColors = document.querySelector('body');
let goPlay = true;
function Player(marker, name) {
  this.name = name;
  this.marker = marker;
}

// create the  players Object

const player1 = new Player('X', 'Player 1');
const player2 = new Player('O', 'Player 2');

// The current player, starts with "X"
let currentPlayer = player1.marker;

// ----------------------------Step 2---------------------------
// Function to handle a player's move
function handleMove(cellIndex) {
  // Check if the clicked cell is already occupied
  if (board[cellIndex] !== '') {
    return;
  }
  // Mark the cell with the current player's marker
  if (!checkWin()) {
    board[cellIndex] = currentPlayer;
  }

  if (currentPlayer === 'X' && !checkWin()) {
    infoDisplay.textContent = 'This round' + ' ' + player2.name + '  ' + "'O'";
  } else if (currentPlayer === 'O' && !checkWin()) {
    infoDisplay.textContent = 'This round' + ' ' + player1.name + '  ' + "'X'";
  } else {
    infoDisplay.textContent = 'Game over';
  }

  // Update the display of the board
  renderBoard();

  // Check for a winning combination
  if (checkWin()) {
    if (currentPlayer === 'X') {
      infoWin.textContent = 'Win' + ' ' + player1.name + '🏆' + '👍';
      changeColors.style.backgroundColor = 'lime';
    } else {
      infoWin.textContent = 'Win' + ' ' + player2.name + '🏆' + '👍';
      changeColors.style.backgroundColor = 'aqua';
    }
    // Disabled board
    const noClick = document.querySelector('#board');
    myDiv.addEventListener('click', (e) => {
      e.preventDefault();
    });
  }

  // Check if the board is full (game ends in a tie)
  const isTie = board.every((e) => e !== '');
  if (isTie && !checkWin()) {
    // infoDisplay.textContent = '';
    infoTie.textContent = "It's a tie!";
    changeColors.style.backgroundColor = 'blue';
    infoDisplay.textContent = 'Game over';
    return;
  }

  // Switch the turn to the next player
  if (currentPlayer === 'X') {
    currentPlayer = player2.marker;
  } else {
    currentPlayer = player1.marker;
  }
}

// --------------------------------Step 3-------------------------
// Function to render the board array on the screen
function renderBoard() {
  const cells = document.getElementsByClassName('cell');
  for (let i = 0; i < cells.length; i++) {
    // const element = array[index];
    cells[i].innerHTML = board[i];
  }
}

// --------------------------------Step 4-------------------------
// Function to check for a winning combination
function checkWin() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Horizontal combinations
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Vertical combinations
    [0, 4, 8],
    [2, 4, 6], // Diagonal combinations
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    if (
      board[winningCombinations[i][0]] === 'X' &&
      board[winningCombinations[i][1]] === 'X' &&
      board[winningCombinations[i][2]] === 'X'
    ) {
      return true;
    } else if (
      board[winningCombinations[i][0]] === 'O' &&
      board[winningCombinations[i][1]] === 'O' &&
      board[winningCombinations[i][2]] === 'O'
    ) {
      return true;
    }
  }
  return false;
}

// --------------------------------Step 5-------------------------
// Function to end the game
function endGame(message) {
  alert(message);
}

// Add event listeners to the cells (click event for each cell)
const cells = document.getElementsByClassName('cell');
for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener('click', cellClickHandler);
}

// Reset Code
function reset() {
  board = ['', '', '', '', '', '', '', '', ''];
  const cells = document.getElementsByClassName('cell');
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = board[i];
  }
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', cellClickHandler);
  }
  infoWin.textContent = '';
  infoDisplay.textContent = 'The Game is start';
  infoTie.textContent = '';
  changeColors.style.backgroundColor = 'blanchedalmond';
}
reStart.addEventListener('click', reset);

//--------------- Do not change this code ------------------

// Event handler for cell clicks
function cellClickHandler() {
  // alert('clicked');
  const cellIndex = parseInt(this.dataset.index);
  handleMove(cellIndex);
}

// Render the initial board
renderBoard();
