// Requirements
var fs = require('fs');

var t = 0;

// Constants
var A = 100
  , M = 2 * A + 1
  , matrix = new Array(M * M)
  , walls = []
  , dimensions = 2
  , start, stop, time;

// Functions
var rand = function (min, max) { return Math.floor(Math.random() * (max - min)) + min; }
  ,	inMaze = function (point) {
	  	var test = 0 <= point && point < M ^ dimensions;
	  	return test;
	}
  , addWallOne = function (point, direction) {
		walls.push({
			point: point + direction,
			direction: direction
		});
	}
  , getCoordinates = function (point) {
		return [point / M | 0, point % M];
  }
  , addWall = function (wall) {
  		if (isFree(wall.point +  wall.direction)) {
  			matrix[wall.point] = 1;
			matrix[wall.point + wall.direction] = 1;
			for (var i = 0; i < directions.length; i++) {
				if (inDimension(wall.point + wall.direction, directions[i])) addWallOne(wall.point + wall.direction, directions[i]);
			};
  		};
	}
  , isFree = function (point) { return inMaze(point) && !matrix[point]; }
  , inDimension = function (point, direction) {
  		var test = inMaze(point + 2 * direction) && parseInt(point / (Math.abs(direction) * M)) == parseInt((point + 2 * direction) / (Math.abs(direction) * M))
		return test;
  	}

// Directions
var directions = (function () {
	var array = [];
	var mul = 1;
	for (var i = 0; i < dimensions; i++) {
		array.push(mul);
		array.push(-mul);
		mul = mul * M;
	};
  	return array;
})();

// Add the first cell (as a wall)
addWall({
	point: 0,
	direction: 0,
});
start = Date.now();
while (walls.length > 0) {
	var wall = walls.splice(rand(0, walls.length - 1), 1)[0];
	addWall(wall);
}
stop = Date.now();

console.log(stop - start + "ms");

var display = [];
while (matrix.length > 0) {
	var row = matrix.splice(0, M);
	display.push(row);
	//console.log(row);
}
fs.writeFile('./maze.json', JSON.stringify(display));