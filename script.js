import { createBoard, markTile, revealTile, checkGameEnd, getMarkedMinesCount } from './minesweeper.js';

let BOARD_SIZE = 8;
let NUMBER_OF_MINES = 8;
let userInput = prompt("Enter the board size you want to play with");
if (userInput === null || userInput === "" | parseInt(userInput) < 4 || parseInt(userInput) > 20) {
    alert("Invalid input. Default board size will be used");
} else {
    BOARD_SIZE = parseInt(userInput);
    NUMBER_OF_MINES = parseInt(userInput);
};

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
export const boardElement = document.querySelector('.board');
export const minesLeftText = document.getElementById('mines-left-count');
export const messageText = document.getElementById('message');

board.forEach(row => {
    row.forEach(tile => {
        boardElement.append(tile.element);
        tile.element.addEventListener('click', () => {
            revealTile(board, tile);
            checkGameEnd(board);
        });
        tile.element.addEventListener('contextmenu', e => {
            e.preventDefault();
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
