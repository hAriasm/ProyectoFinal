var mimir = require("./index"),
  bow = mimir.bow,
  dict = mimir.dict;

console.log("\n  *** Bolsa de Palabras ***  \n");

var fs = require("fs");

var tweets = [];
var tweet_class = [];

/***lectura y clasificacion de tweets */
var data = fs.readFileSync("data/test-tweets.txt", "utf-8");
data = data.split("\r\n");
for (let i = 0; i < data.length; i++) {
  // console.log(data);
  data[i] = data[i].split("|");
  tweets.push(data[i][1]);
  tweet_class.push(data[i][2]);
}

// *** calculando universo de palabras ***
var vocabulary = dict(tweets); //vocabulario

// *** calculando la bolsa de palabras (bow) para cada  tweet ***
var bow_list = [];
for (const i in tweets) {
  bow_list.push(bow(tweets[i], vocabulary));
}
//console.log(bow_list);

// *** reduccion con tipo -> MDS ***
druid = require("@saehrimnir/druidjs");
let matrix = druid.Matrix.from(bow_list); //matriz (# documentos , # palabras en el vocabulario calculado)


// numero  de reducciones 
var new_dimensions = 2;
my_dr = new druid.MDS(matrix, new_dimensions);
var bow_all_dr = my_dr.transform().to2dArray; // computamos la reduccion de dimensionalidad y obtenemos un vector de 2 dimensiones

var tweets_matrix = [];
for (i in bow_all_dr) {
  var one_tweet = [];
  one_tweet.push(tweet_class[i]);
  for (let j = 0; j < new_dimensions; j++) {
    one_tweet.push(bow_all_dr[i][j]);
  }
  tweets_matrix.push(one_tweet);
}

// ***  Obtenemos la salida final de la lista para el uso en KDTree y KNN
// Formato [class(0:no_spam, 1:spam),dimension1,dimension2] --> [[1,2.234,53.23124], [2,123.1234,123,4.123], ..]
// console.log(tweets_matrix);

// write JSON string to a file
const data2 = JSON.stringify(tweets_matrix);
fs.writeFile("./data/test_tweets_2d.js", "data_test = '" + data2 + "'; ", (err) => {
  if (err) {
    throw err;
    console.log("JSON data is saved.");
  }
});

