class Cell {
	constructor(ox, oy) {
		this.ox = ox;
		this.oy = oy;
		this.x = this.ox * cellSize;
		this.y = this.oy * cellSize;
		this.isHidden = true;
		this.isFlag = false;
		this.isBomb = false;
		this.n = 0;
	}


	draw() {
		if (this.isHidden) {
			if (this.isFlag) {
				fill(0, 0, 255);
			} else {
				fill(160);
			}
			rect(this.x, this.y, cellSize, cellSize);

		} else {

			if (this.isBomb) {
				fill(255, 0, 0);
				rect(this.x, this.y, cellSize, cellSize);

			} else {

				fill(255);
				rect(this.x, this.y, cellSize, cellSize);

				if (this.n > 0) {
					fill(0);
					text(this.n, this.x + cellSize/2,
											this.y + cellSize/2);
				}
			}
		}
	}
}
