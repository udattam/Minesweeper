import { createBoard, markTile, revealTile, checkGameEnd, getMarkedMinesCount, markedMax } from './minesweeper.js';

let BOARD_SIZE = 10;
let NUMBER_OF_MINES = 20;
let userInput = prompt("Enter the board size you want to play with");
if (userInput === null || userInput === "" | parseInt(userInput) < 4 || parseInt(userInput) > 20) {
    alert("Invalid input. Default board size will be used");
} else {
    BOARD_SIZE = parseInt(userInput);
    NUMBER_OF_MINES = Math.floor(BOARD_SIZE*BOARD_SIZE/5);
}

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
export const boardElement = document.querySelector('.board');
export const minesLeftText = document.getElementById('mines-left-count');
export const messageText = document.getElementById('message');

boardElement.addEventListener('contextmenu', e => {
    e.preventDefault();
});

board.forEach(row => {
    row.forEach(tile => {
        boardElement.append(tile.element);
        tile.element.addEventListener('click', () => {
            revealTile(board, tile);
            checkGameEnd(board);
        });
        tile.element.addEventListener('contextmenu', e => {
            e.preventDefault();
            if (markedMax(board)) {
                return;
            }
            markTile(tile);
            listMinesLeft(board);
            checkGameEnd(board);
        });
    });
});

boardElement.style.setProperty('--size', BOARD_SIZE);
minesLeftText.textContent = NUMBER_OF_MINES;

function listMinesLeft(board) {
    let markedMinesCount = getMarkedMinesCount(board);
    minesLeftText.textContent = NUMBER_OF_MINES - markedMinesCount;
};
