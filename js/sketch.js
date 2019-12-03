let cols,
		rows,
		cellSize,
		bombsCount,
		map = [];



function setup() {
	createCanvas(windowWidth, windowHeight);

	bombsCount = 2;
	cellSize = 64;

	cols = Math.floor(width / cellSize);
	rows = Math.floor(height / cellSize);

	textSize(50);
	textAlign(CENTER, CENTER);

	createMap();
}



function draw() {
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			map[j][i].draw();
		}
	}
}



function rand(min=0, max=10) {
	return Math.floor(Math.random() * (max - min) + min);
}



function createMap() {
	for (let i = 0; i < rows; i++) {
		map[i] = [];

		for (let j = 0; j < cols; j++) {
			map[i][j] = new Cell(j, i);
		}
	}


	for (let i = 0; i < bombsCount; i++) {
		let x = rand(0, cols),
				y = rand(0, rows);

		if (map[y][x].isBomb) {
			i--;
			continue;
		}

		map[y][x].isBomb = true;
	}


	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			let cell = map[i][j];

			if (!cell.isBomb) continue;

			setNumbers(j, i);
		}
	}
}



function setNumbers(x, y) {
	for (let i = -1; i <= 1; i++) {
		for (let j = -1; j <= 1; j++) {
			let _x = x + j,
					_y = y + i;

			if (_y < 0 || _y >= rows || 
					_x < 0 || _x >= cols) continue;

			map[_y][_x].n++;
		}
	}
}



function showCell(x, y) {
	map[y][x].isHidden = false;

	if (map[y][x].n !== 0) return;

	for (let i = -1; i <= 1; i++) {
		for (let j = -1; j <= 1; j++) {
			let _x = x + j,
					_y = y + i;

			if (_y < 0 || _y >= rows || 
					_x < 0 || _x >= cols || 
					!map[_y][_x].isHidden) continue;

			showCell(_x, _y);
		}
	}
}



function mousePressed() {
	let x = Math.trunc(mouseX / cellSize),
			y = Math.trunc(mouseY / cellSize);

	if (x >= cols || y >= rows) return;

	let cell = map[y][x];


	if (mouseButton === RIGHT) {
		cell.isFlag = cell.isFlag ? false : true;
		checkWin();
		return;
	}


	if (cell.isFlag) return;


	if (cell.isBomb) {
		cell.isHidden = false;

		setTimeout(() => {
			alert('You loose');
			setup();
		}, 50);

	} else {
		cell.isHidden = false;
		if (cell.n === 0) showCell(x, y);

		checkWin();
	}
}



window.oncontextmenu = event => {
	event.preventDefault();
};



function checkWin() {
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			let cell = map[i][j];

			if (cell.isBomb && !cell.isFlag) return;
		}
	}

	win();
}



function win() {
	setTimeout(() => {
		alert('You win');
		setup();
	}, 50);
}

