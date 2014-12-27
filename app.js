var m = 2;
var n = 2

var matrix = [];

var places = [];

function rand(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

for (var i = 0; i < m; i++) {
	matrix[i] = [];
	for (var j = 0; j < n; j++) {
		matrix[i][j] = null;
	}
}

var init = {
	x: 0,
	y: 0,
	n: false,
	e: true,
	s: true,
	w: false,
	prev: null
};
matrix[0][0] = init;
places.push(init);

while (places.length > 0) {
	var pop = places.pop();
	var r = rand(0,3);
	
}

console.log(matrix);