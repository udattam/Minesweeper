import { boardElement, messageText, minesLeftText } from './script.js';
export const TILE_STATUSES = {
    HIDDEN: 'hidden',
    MINE: 'mine',
    NUMBER: 'number',
    MARKED: 'marked',
};


export function createBoard(boardSize, numberOfMines) {
    const board = [];
    const minePositions = getMinePositions(boardSize, numberOfMines);

    for (let x = 0; x < boardSize; x++) {
        const row = [];
        for (let y = 0; y < boardSize; y++) {
            const element = document.createElement('div');
            element.dataset.status = TILE_STATUSES.HIDDEN;
            const tile = {
                element,
                x,
                y,
                mine: exists(minePositions, { x, y }),
                get status() {
                    return this.element.dataset.status;
                },
                set status(value) {
                    this.element.dataset.status = value;
                },
            };
            row.push(tile);
        };
        board.push(row);
    };

    return board;
};
export function markTile(tile) {
    if (tile.status === TILE_STATUSES.HIDDEN) {
        tile.status = TILE_STATUSES.MARKED;
        return;
    }
    if (tile.status === TILE_STATUSES.MARKED) {
        tile.status = TILE_STATUSES.HIDDEN;
        return;
    };
}
function getMinePositions(boardSize, numberOfMines) {
    const positions = [];
    while (positions.length < numberOfMines) {
        const position = {
            x: randomNumber(boardSize),
            y: randomNumber(boardSize),
        };

        if (!exists(positions, position)) {
            positions.push(position);
        };
    };

    return positions;
};

function randomNumber(size) {
    return Math.floor(Math.random() * size);
};

function exists(positions, position) {
    for (let i = 0; i < positions.length; i++) {
        if (positions[i].x === position.x && positions[i].y === position.y) {
            return true;
        };
    }
    return false;
};


export function revealTile(board, tile) {
    if (tile.status !== TILE_STATUSES.HIDDEN) {
        return;
    };
    if (tile.mine) {
        tile.status = TILE_STATUSES.MINE;
        gameOver(board);
        messageText.textContent = 'You lost!';
        boardElement.addEventListener('click', stopProp, { capture: true });
        boardElement.addEventListener('contextmenu', stopProp, { capture: true });
        return;
    }
    tile.status = TILE_STATUSES.NUMBER;
    const adjacentTiles = nearbyTiles(board, tile);
    const mines = adjacentMines(adjacentTiles);
    if (mines === 0) {
        for (let i = 0; i < adjacentTiles.length; i++) {
            revealTile(board, adjacentTiles[i]);
        };
    } else {
        tile.element.textContent = mines;
    };
};

function nearbyTiles(board, { x, y }) {
    const tiles = [];
    for (let xOffset = -1; xOffset <= 1; xOffset++) {
        for (let yOffset = -1; yOffset <= 1; yOffset++) {
            if (x + xOffset < 0 || x + xOffset >= board.length || y + yOffset < 0 || y + yOffset >= board.length) {
                continue;
            };
            const tile = board[x + xOffset][y + yOffset];
            if (tile) tiles.push(tile);
        };
    };
    return tiles;
};

function adjacentMines(tiles) {
    let mines = 0;
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].mine) {
            mines++;
        };
    };
    return mines;
};

function gameOver(board) {
    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board.length; y++) {
            const tile = board[x][y];
            if (tile.mine) {
                tile.status = TILE_STATUSES.MINE;
            };
        };
    };
};

export function checkGameEnd(board) {
    let win = true;
    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board.length; y++) {
            const tile = board[x][y];
            if (tile.status === TILE_STATUSES.HIDDEN && !tile.mine) {
                win = false;
            };
        };
    };
    if (win) {
        messageText.textContent = 'You won!';
        minesLeftText.textContent = '0';
        boardElement.addEventListener('click', stopProp, { capture: true });
        boardElement.addEventListener('contextmenu', stopProp, { capture: true });
    };

};

function stopProp(e) {
    e.stopImmediatePropagation();
};

export function getMarkedMinesCount(board) {
    let markedMinesCount = 0;
    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board.length; y++) {
            if (board[x][y].status === TILE_STATUSES.MARKED && board[x][y].mine) {
                markedMinesCount++;
            };
        };
    };
    return markedMinesCount;
}

export function markedMax(board) {
    let markedMax = 0;
    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board.length; y++) {
            if (board[x][y].status === TILE_STATUSES.MARKED) {
                markedMax++;
            };
        };
    };
    return markedMax == Math.floor(board.length * board.length / 5);
}
