

var i = 100;

 while (i > 0) {
  var j = ((i + 1) >> 1) - 1;
  console.log(j);
  i = j;
}