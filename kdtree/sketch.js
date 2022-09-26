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


function drawPoint(point, r = 255, g = 255, b = 255) {
  var x = point[0];
  var y = point[1];

  fill(r, g, b);
  circle((x * width) / maxx, height - (y * height) / maxy, 10); // 200 -y para q se dibuje apropiadamente
  textSize(16);
  text(x + ", " + y, (x * width) / maxx + 5, height - (y * height) / maxy - 5);
}

// function graficarKNN() {
//   crearCanvasPuntos();

//   var cantidadK = document.getElementById("cantidadK").value;
//   var knn = findKnn(root, pointP, parseInt(cantidadK)).nearestNeighbors;
//   console.log("PonitN graf: " + pointP);

//   for (let i = 0; i < knn.length; i++) {
//     fill(0, 0, 255);
//     circle(
//       (knn[i].point[0] * width) / maxx,
//       height - (knn[i].point[1] * height) / maxy,
//       10
//     );
//     console.log(knn[i].point);
//   }

//   drawPoint(pointP, 0, 255, 0);
// }


function classifier(data, data_test) {

  console.log("cantidad total de entrenamiento: " + data.length);

  var root = build_kdtree(data);

  for (let i = 0; i < data_test.length; i++) {
    console.log(data_test[i]);
    knnClassifier(root, [data_test[i][1], data_test[i][2]]);
  }
}

function knnClassifier(root, pointY) {

  var cantidadK = 1;
  var knn = findKnn(root, pointY, parseInt(cantidadK)).nearestNeighbors;
  // console.log(knn);
  var countHOF = 0, countNOT = 0;

  for (let i = 0; i < knn.length; i++) {
    // console.log(knn[i].point + ", " + knn[i].value);
    if (knn[i].value === "HOF") {
      countHOF++;
    } else {
      countNOT++;
    }
  }
  if (countHOF > countNOT) {
    console.log("Este tweet es OFENSIVO");
  } else {
    console.log("Este tweet NO es OFENSIVO");
  }
}


function draw() {

  background(0);

  classifier();

  // noFill();
  // stroke(0, 255, 0);
  // strokeWeight(4);
  // rectMode(CENTER);
  // let range = new Rectangle([mouseX, height - mouseY], [100, 100]);
  // rect(range.center[0], height - range.center[1], range.scope[0] * 2, range.scope[1] * 2);

  // points = [];
  // points = range_query_rect(root, range, points);
  // // console.log("Points found: " + points.length);
  // for (let p of points) {
  //   strokeWeight(2);
  //   drawPoint(p)
  // }
}
