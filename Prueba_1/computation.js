//https://github.com/browserify/browserify
//browserify practice_4/descriptor/bag_of_words/computation.js  > practice_4/descriptor/bag_of_words/computation_bundle.js
//browserify -t brfs practice_4/descriptor/bag_of_words/computation.js  > practice_4/descriptor/bag_of_words/computation_bundle.js
//bag of word --> https://github.com/techfort/mimir

//var loc = window.location.pathname;
//var dir = loc.substring(0, loc.lastIndexOf('/'));
//console.log(loc)

// *** llamando a las funciones que me generan la bolsa de palabras ***
var mimir = require("./index"),
    bow = mimir.bow,
    dict = mimir.dict;

console.log("\n---------- Bolsa de Palabras -----------------\n");

// *** leemos cada archivo mail y se coloca como un elemento de la lista ***
var fs = require("fs");
var path = require("path");

//const base_text_path = "./base_datos/mails/";
//var filenames = fs.readdirSync(path.join(__dirname, base_text_path));

// *** leyendo la data ***
var tweets = [];
var tweet_class = [];

var data = fs.readFileSync("base_datos/training-tweets.csv", "utf-8");
data = data.split("\r\n");
for (let i = 0; i < data.length - 1; i++) {
   // console.log(data[i]);
    data[i] = data[i].split(";");
    tweets.push(data[i][1]);
    tweet_class.push(data[i][2]);
}

// for (const file in filenames) {
//     if (filenames[file].slice(0, 5) == "spmsg") {
//         tweet_class.push("Class B"); // es spam = Clase B
//     } else {
//         tweet_class.push("Class A"); // no es spam = Clase A
//     }
//     text = fs
//         .readFileSync(path.join(__dirname, base_text_path + filenames[file]))
//         .toString("utf-8");
//     email_body = text.split("\n")[2]; // la 3ra linea contiene el cuerpo principal del mensaje
//     tweets.push(email_body);
// }
//console.log(body_mails)
//console.log(spam_mails)

// *** calculando universo de palabras ***
var vocabulary = dict(tweets); //vocabulario
//console.log(bow(body_mails[25], vocabulary));
//console.log(bow(body_mails[25], vocabulary).reduce((a, b) => a + b, 0));
//console.log("vocabulary: " +  vocabulary);

// *** calculando la bolsa de palabras (bow) para cada email ***
var bow_list = [];
for (const i in tweets) {
    bow_list.push(bow(tweets[i], vocabulary));
}
//console.log(bow_list);

// *** MDS - Dimensionality reduction ***
//import * as druid from "@saehrimnir/druidjs";
druid = require("@saehrimnir/druidjs");
let matrix = druid.Matrix.from(bow_list); //matriz (# documentos , # palabras en el vocabulario calculado)

//console.log("matrix con druidjs: " + matrix);

// Dimensionality reduction (dr)
var new_dimensions = 2;
my_dr = new druid.MDS(matrix, new_dimensions);
var bow_all_dr = my_dr.transform().to2dArray; // computamos la reduccion de dimensionalidad y obtenemos un vector de 2 dimensiones
console.log("matrix con transform: " + bow_all_dr);

var tweets_matrix = [];
for (i in bow_all_dr) {
    var one_mail = [];
    one_mail.push(tweet_class[i]);
    for (let j = 0; j < new_dimensions; j++) {
        one_mail.push(bow_all_dr[i][j]);
    }
    tweets_matrix.push(one_mail);
}

// ***  Obtenemos la salida final de la lista para el uso en KDTree y KNN
// Formato [class(0:no_spam, 1:spam),dimension1,dimension2] --> [[1,2.234,53.23124], [2,123.1234,123,4.123], ..]
console.log(tweets_matrix);

// write JSON string to a file
const data2 = JSON.stringify(tweets_matrix);
fs.writeFile("final_spam_dr_2d.json", data2, (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
});
