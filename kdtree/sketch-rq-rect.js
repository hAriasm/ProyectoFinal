let width = 800;
let height = 600;
var maxx = width;
var maxy = height;
let scalex = 10;
let scaley = 5;

let data = [];
let root;

class Rectangle {
  constructor(center, scope) {
    this.center = center
    this.scope = scope;
  }

  contains(point) {
    return !(point[i] > this.center[i] + this.scope[i] ||
    point[i] < z.center[i] - this.scope[i]);
  }


}

function setup() {

  createCanvas();
  createCanvas(width, height);

  for (let i = 0; i < 500; i++) {
    var x = Math.floor(Math.random() * maxx);
    var y = Math.floor(Math.random() * maxy);
    data.push([x, y]);

  }

  root = build_kdtree(data);


  // drawtmp();
}


function drawPoint(point, r = 255, g = 255, b = 255) {
  var x = point[0];
  var y = point[1];

  fill(r, g, b);
  circle((x * width) / maxx, height - (y * height) / maxy, 10);
  // textSize(16);
  // text(x + ", " + y, (x * width) / maxx + 5, (y * height) / maxy - 5);
}

function showData() {
  background(0);
  stroke('blue');
  strokeWeight(1);

  for (let i = 0; i < data.length; i++) {
    x = data[i][0];
    y = data[i][1];
    fill(255, 255, 255, 200);
    circle(x * width / maxx, height - y * height / maxy, 10);
    // textSize(8);
    // text(
    //   x + ", " + y,
    //   x * width / maxx + 5,
    //   height - y * height / maxy - 5
    // );

  }

}

function draw() {

  background(0);

  showData();

  noFill();
  stroke(0, 255, 0);
  strokeWeight(4);
  rectMode(CENTER);
  let range = new Rectangle([mouseX, height - mouseY], [100, 100]);
  rect(range.center[0], height - range.center[1], range.scope[0] * 2, range.scope[1] * 2);

  points = [];
  points = range_query_rect(root, range, points);
  // console.log("Points found: " + points.length);
  for (let p of points) {
    strokeWeight(2);
    drawPoint(p)
  }
}
