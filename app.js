var m = 31;
var n = 21;

var matrix = [];

var walls = [];

function rand(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

for (var i = 0; i < m; i++) {
	matrix[i] = [];
	for (var j = 0; j < n; j++) {
		matrix[i][j] = 0;
	}
}

matrix[0][0] = 1;
walls.push({
	x: 0,
	y: 1,
	direction: {
		x: 0,
		y: 1
	}
});
walls.push({
	x: 1,
	y: 0,
	direction: {
		x: 1,
		y: 0
	}
});

while (walls.length > 0) {
	var r = rand(0, walls.length - 1);
	var wall = walls.splice(r, 1)[0];
	var newX = wall.x + wall.direction.x;
	var newY = wall.y + wall.direction.y;
	if (0 <= newX && m > newX && 0 <= newY && n > newY && 0 <= wall.x && m > wall.x && 0 <= wall.y && n > wall.y && !matrix[newX][newY]) {
		matrix[wall.x][wall.y] = 1;
		matrix[newX][newY] = 1;
		walls.push({
			x: newX,
			y: newX + 1,
			direction: {
				x: 0,
				y: 1
			}
		});
		walls.push({
			x: newX + 1,
			y: newY,
			direction: {
				x: 1,
				y: 0
			}
		});
		walls.push({
			x: newX,
			y: newX - 1,
			direction: {
				x: 0,
				y: -1
			}
		});
		walls.push({
			x: newX - 1,
			y: newY,
			direction: {
				x: -1,
				y: 0
			}
		});
	};
}

console.log(matrix);