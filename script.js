import { createBoard, markTile, revealTile, checkGameEnd, getMarkedMinesCount } from './minesweeper.js';

const userInput = prompt("Enter the board size you want to play with");
while (userInput < 4 || userInput > 15) {
    userInput = prompt("Enter the board size you want to play with");
};

const BOARD_SIZE = userInput;
const NUMBER_OF_MINES = userInput;


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
