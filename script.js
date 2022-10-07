import { TILE_STATUSES, createBoard, markTile } from './minesweeper.js';

// addEventListener('contextmenu', e => {
//     e.preventDefault();
// });


const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 100;


const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
const boardElement = document.querySelector('.board');
const minesLeftText = document.getElementById('mines-left-count');

board.forEach(row => {
    row.forEach(tile => {
        boardElement.append(tile.element);
        tile.element.addEventListener('click', () => {
            revealTile(board, tile);
        });
        tile.element.addEventListener('contextmenu', e => {
            e.preventDefault();
            markTile(tile);
            listMinesLeft();
        });
    });
});

boardElement.style.setProperty('--size', BOARD_SIZE);
minesLeftText.textContent = NUMBER_OF_MINES;

function revealTile(board, tile) {
    if (tile.status !== TILE_STATUSES.HIDDEN) {
        return;
    };
    if (tile.mine) {
        console.log('GAME OVER');
        return;
    };
    tile.status = TILE_STATUSES.VISIBLE;
    listMinesLeft();
    if (tile.neighbour === 0) {
        tile.neighbours.forEach(neighbour => {
            revealTile(board, neighbour);
        });
    };
};

function listMinesLeft() {
    let markedMinesCount = 0;
    for (let x = 0; x < BOARD_SIZE; x++) {
        for (let y = 0; y < BOARD_SIZE; y++) {
            if (board[x][y].status === TILE_STATUSES.MARKED) {
                markedMinesCount++;
            };
        };
    };
    minesLeftText.textContent = NUMBER_OF_MINES - markedMinesCount;
};
