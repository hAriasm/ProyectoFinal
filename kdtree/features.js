var mimir = require("./index"),
  bow = mimir.bow,
  dict = mimir.dict;

console.log("\n  *** Bolsa de Palabras ***  \n");

var fs = require("fs");

var tweets = [];
var tweet_class = [];

/***lectura y clasificacion de tweets */
var data = fs.readFileSync("data/training-tweets_500.txt", "utf-8");
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
    if (tweet_class[i] === "HOF")
      one_tweet.push(functionOfensivo(j));
    else 
      one_tweet.push(functionNoOfensivo(j));
  }
  tweets_matrix.push(one_tweet);
} 
// write JSON string to a file
const data2 = JSON.stringify(tweets_matrix);
fs.writeFile("./data/final_tweets_2d.js", "data = '" + data2 + "'; ", (err) => {
  if (err) {
    throw err;
    console.log("JSON data is saved.");
  }
});
function functionNoOfensivo(j) {
  return bow_all_dr[i][j] * 1000 + 100;
}

function functionOfensivo(j) {
  return bow_all_dr[i][j] * 500 + 100;
}

