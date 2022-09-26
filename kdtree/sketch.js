var maxx = 250;
var maxy = 200;
var root;
let width = 800;
let height = 600;
let scalex = 10;
let scaley = 5;
var data_train = [];
var data_test = [];

function setup() {
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
  data_train = data;
  data_test = data_test;

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
  var countHOF = 0,
    countNOT = 0;

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
  for (let i = 0; i < data_train.length; i++) {
    let x = data_train[i][1];
    let y = data_train[i][2];
    if (data_train[i][0] === "HOF") {
      drawPoint([x, y], 255, 0, 0);
    } else {
      drawPoint([x, y], 0, 255, 0);
    }
  }

  for (let i = 0; i < data_test.length; i++) {
    let x = data_test[i][1] ;
    let y = data_test[i][2] ;
    drawPoint([x, y], 255, 255, 255);
  }

  // background(0);

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


function drawPoint(point, r = 255, g = 255, b = 255, size = 7) {
  var x = point[0];
  var y = point[1];

  fill(r, g, b);
  circle((x * width) / maxx, height - (y * height) / maxy, size); // 200 -y para q se dibuje apropiadamente
  // textSize(6);
  // text(x + ", " + y, (x * width) / maxx + 5, height - (y * height) / maxy - 5);
}
