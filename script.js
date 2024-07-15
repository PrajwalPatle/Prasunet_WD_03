document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));

    function handleCellClick(e) {
        const cell = e.target;
        const index = parseInt(cell.getAttribute('data-cell'));

        if (gameState[index] !== '' || !gameActive) return;

        gameState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.style.color = currentPlayer === 'X' ? 'blue' : 'red';

        if (checkWin()) {
            announceWinner();
        } else if (checkDraw()) {
            announceDraw();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function checkWin() {
        return winningConditions.some(condition => {
            return condition.every(index => {
                return gameState[index] === currentPlayer;
            });
        });
    }

    function checkDraw() {
        return gameState.every(cell => {
            return cell !== '';
        });
    }

    function announceWinner() {
        gameActive = false;
        setTimeout(() => {
            alert(`Player ${currentPlayer} wins!`);
        }, 100);
    }

    function announceDraw() {
        gameActive = false;
        setTimeout(() => {
            alert('It\'s a draw!');
        }, 100);
    }
});
