const BOARD_SIZE = 15;
let currentPlayer = 'black';
let gameBoard = [];
let gameOver = false;

const boardElement = document.getElementById('board');
const playerBlackLabel = document.getElementById('player-black');
const playerWhiteLabel = document.getElementById('player-white');
const winMessage = document.getElementById('win-message');
const winnerText = document.getElementById('winner-text');
const resetBtn = document.getElementById('reset-btn');

// Initialize the game
function initGame() {
    boardElement.innerHTML = '';
    gameBoard = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));
    gameOver = false;
    currentPlayer = 'black';
    
    // Update UI
    winMessage.classList.add('hidden');
    updatePlayerIndicators();
    
    // Create cells
    for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.addEventListener('click', () => handleCellClick(r, c));
            boardElement.appendChild(cell);
        }
    }
}

function handleCellClick(r, c) {
    if (gameOver || gameBoard[r][c] !== null) return;

    // Update board state
    gameBoard[r][c] = currentPlayer;
    
    // Update UI (Place piece)
    const cellIndex = r * BOARD_SIZE + c;
    const cell = boardElement.children[cellIndex];
    const piece = document.createElement('div');
    piece.classList.add('piece', currentPlayer);
    cell.appendChild(piece);

    // Check for win
    if (checkWin(r, c)) {
        endGame();
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
    updatePlayerIndicators();
}

function updatePlayerIndicators() {
    if (currentPlayer === 'black') {
        playerBlackLabel.classList.add('active');
        playerWhiteLabel.classList.remove('active');
    } else {
        playerWhiteLabel.classList.add('active');
        playerBlackLabel.classList.remove('active');
    }
}

function checkWin(r, c) {
    const directions = [
        [0, 1],  // Horizontal
        [1, 0],  // Vertical
        [1, 1],  // Diagonal \
        [1, -1]  // Diagonal /
    ];

    const type = gameBoard[r][c];

    for (const [dr, dc] of directions) {
        let count = 1;

        // Check forward
        let nr = r + dr;
        let nc = c + dc;
        while (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE && gameBoard[nr][nc] === type) {
            count++;
            nr += dr;
            nc += dc;
        }

        // Check backward
        nr = r - dr;
        nc = c - dc;
        while (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE && gameBoard[nr][nc] === type) {
            count++;
            nr -= dr;
            nc -= dc;
        }

        if (count >= 5) return true;
    }

    return false;
}

function endGame() {
    gameOver = true;
    const winnerName = currentPlayer === 'black' ? '黑方' : '白方';
    winnerText.textContent = `${winnerName} 獲勝！`;
    winMessage.classList.remove('hidden');
}

resetBtn.addEventListener('click', initGame);

// Start on load
window.addEventListener('DOMContentLoaded', initGame);
