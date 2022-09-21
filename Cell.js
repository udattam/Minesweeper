function Cell(i, j, w) {
    this.i = i;
    this.j = j;
    this.x = i * w;
    this.y = j * w;
    this.w = w;
    this.mine = false;
    this.revealed = false;
    this.neighbourMines = 0;
}

Cell.prototype.show = function () {
    stroke(0);
    noFill();
    rect(this.x, this.y, this.w, this.w);
    if (this.revealed) {
        if (this.mine) {
            fill(color(230, 57, 70));
            ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.75);
        }
        else {
            fill(color(131, 211, 154));
            rect(this.x, this.y, this.w, this.w);
            textAlign(CENTER);
            if (this.neighbourMines > 0) {
                fill(70, 85, 92);
                text(this.neighbourMines, this.x + this.w * 0.5, this.y + this.w - 6);
            }
        }
    }
}

Cell.prototype.countMines = function () {
    if (this.mine) {
        this.neighbourMines = -1;
        return;
    }
    let total = 0;
    for (let xOffset = -1; xOffset <= 1; xOffset++) {
        for (let yOffset = -1; yOffset <= 1; yOffset++) {
            let neighbourX = this.i + xOffset;
            let neighbourY = this.j + yOffset;
            if (neighbourX > -1 && neighbourX < cols && neighbourY > -1 && neighbourY < rows) {
                let neighbour = grid[neighbourX][neighbourY];
                if (neighbour.mine) total++;
            }
        }
    }
    this.neighbourMines = total;
}

Cell.prototype.contains = function (x, y) {
    return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}

Cell.prototype.reveal = function () {
    this.revealed = true;
    if (this.neighbourMines == 0) {
        this.floodFill();
    }
}

Cell.prototype.floodFill = function () {
    for (let xOffset = -1; xOffset <= 1; xOffset++) {
        for (let yOffset = -1; yOffset <= 1; yOffset++) {
            let neighbourX = this.i + xOffset;
            let neighbourY = this.j + yOffset;
            if (neighbourX > -1 && neighbourX < cols && neighbourY > -1 && neighbourY < rows) {
                let neighbour = grid[neighbourX][neighbourY];
                if (!neighbour.mine && !neighbour.revealed) neighbour.reveal();
            }
        }
    }
}