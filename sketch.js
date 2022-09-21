function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}
let grid;
let w = 20;
let cols;
let rows;
let totalMines = 50;

function setup() {
    createCanvas(500, 500);
    cols = floor(width / w);
    rows = floor(height / w);
    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = new Cell(i, j, w);
        }
    }

    //All i and j possibilities
    let options = [];
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            options.push([i, j]);
        }
    }

    //Pick totalMines spots
    for (let n = 0; n < totalMines; n++) {
        let index = floor(random(options.length));
        let choice = options[index];
        let i = choice[0];
        let j = choice[1];
        //Delete that spot so it's no longer an option
        options.splice(index, 1);
        //Set the mine
        grid[i][j].mine = true;
    }

    //Count the mines
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].countMines();
        }
    }
}
function gameOver() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].revealed = true;
        }
    }
    return;
}

function mousePressed() {
    background(255);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (grid[i][j].contains(mouseX, mouseY)) {
                grid[i][j].reveal();
                if (grid[i][j].mine) {
                    gameOver();
                }
            }
        }
    }
}

function draw() {
    background(255);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].show();
        }
    }
}


