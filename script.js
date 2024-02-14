const board = document.getElementById('board');
const cells = Array.from(board.children);
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

resetButton.addEventListener('click', resetGame);

function handleClick(e) {
    const cell = e.target;
    cell.textContent = currentPlayer;
    cell.removeEventListener('click', handleClick);
    switchPlayer();
    checkWinCondition();
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinCondition() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (cells[a].textContent === currentPlayer && cells[b].textContent === currentPlayer && cells[c].textContent === currentPlayer) {
            alert(`Player ${currentPlayer} wins!`);
            resetGame();
            return;
        }
    }

    if (cells.every(cell => cell.textContent !== '')) {
        alert('It\'s a draw!');
        resetGame();
    }
}

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
    currentPlayer = 'X';
}
function checkWin(board, player) {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
        return true;
      }
    }
  
    // Check columns
    for (let i = 0; i < 3; i++) {
      if (board[0][i] === player && board[1][i] === player && board[2][i] === player) {
        return true;
      }
    }
  
    // Check diagonals
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
      return true;
    }
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
      return true;
    }
  
    return false;
  }