// Requirements
var fs = require('fs');

var t = 0;

// Constants
var A = 2
  , M = 2 * A + 1
  , matrix = new Array(M * M)
  , walls = []
  , dimensions = 2
  , start, stop, time;

// Functions
var rand = function (min, max) { return Math.floor(Math.random() * (max - min)) + min; }
  ,	inMaze = function (point) {
  		console.log(point > M);
		var Y = point % M;
	  	var X = point / M | 0;
	  	var test = 0 <= point && point < M * M && 0 <= X && 0 <= Y && X < M && Y < M;
	  	return ++t < 3000 && test;
	}
  , addWallOne = function (point, direction) {
		if (inMaze(point + direction)) {
			walls.push({
				point: point + direction,
				direction: direction
			});
		}
	}
  , getCoordinates = function (point) {
		return [point / M | 0, point % M];
  }
  , addWall = function (point) {
		matrix[point] = 1;
		for (var i = 0; i < directions.length; i++) {
			addWallOne(point, directions[i]);
		};
	}
  , isFree = function (point) { return inMaze(point) && !matrix[point]; }

// Directions
var directions = (function () {
  	return [1, -1, M, -M]
})();

// Add the first cell (as a wall)
addWall(0);

start = Date.now();
while (walls.length > 0) {
	var r = rand(0, walls.length - 1);
	var wall = walls.splice(r, 1)[0];
	//console.log(wall);
	if (isFree(wall.point + wall.direction)) {
		matrix[wall.point] = 1;
		addWall(wall.point + wall.direction);
	};
}
stop = Date.now();

fs.writeFile('./maze.json', JSON.stringify(matrix));

console.log(stop - start + "ms");

while (matrix.length > 0) {
	console.log(matrix.splice(0, M));
}