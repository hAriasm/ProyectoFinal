var maxx = 250;
var maxy = 200;
var data = [];
var pointP = [140, 90];
var root;
let width = 800;
let height = 600;
let scalex = 10;
let scaley = 5;

function setup() {
  root = null;
  data = null;

  createCanvas();
  createCanvas(width, height);

  background(0);
  for (var x = 0; x < width; x += width / scalex) {
    for (var y = 0; y < height; y += height / scaley) {
      stroke(125, 125, 125);
      strokeWeight(1);
      line(x, 0, x, height);
      line(0, y, width, y);
    }
  }

}


function crearCanvasPuntos() {
  createCanvas();
  createCanvas(width, height);

  background(0);
  for (var x = 0; x < width; x += width / scalex) {
    for (var y = 0; y < height; y += height / scaley) {
      stroke(125, 125, 125);
      strokeWeight(1);
      line(x, 0, x, height);
      line(0, y, width, y);
    }
  }

  for (let i = 0; i < data.length; i++) {
    drawPoint(data[i]);
  }
}

function drawPoint(point, r = 255, g = 255, b = 255) {
  var x = point[0];
  var y = point[1];

  fill(r, g, b);
  circle((x * width) / maxx, height - (y * height) / maxy, 10); // 200 -y para q se dibuje apropiadamente
  textSize(16);
  text(x + ", " + y, (x * width) / maxx + 5, height - (y * height) / maxy - 5);
}

function graficarKNN() {
  crearCanvasPuntos();

  var cantidadK = document.getElementById("cantidadK").value;
  var knn = findKnn(root, pointP, parseInt(cantidadK)).nearestNeighbors;
  console.log("PonitN graf: " + pointP);

  for (let i = 0; i < knn.length; i++) {
    fill(0, 0, 255);
    circle(
      (knn[i].point[0] * width) / maxx,
      height - (knn[i].point[1] * height) / maxy,
      10
    ); 
    console.log(knn[i].point);
  }

  drawPoint(pointP, 0, 255, 0);
}

function limpiarCuadro() {
  createCanvas(width, height);
  root = null;
  background(0);
  fill(255, 255, 255);
  for (var x = 0; x < width; x += width / scalex) {
    for (var y = 0; y < height; y += height / scaley) {
      stroke(125, 125, 125);
      strokeWeight(1);
      line(x, 0, x, height);
      line(0, y, width, y);
    }
  }
}
