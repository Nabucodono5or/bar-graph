import { select, selectAll } from "d3-selection";
import { csv, json } from "d3-fetch";
import { scaleLinear, scaleQuantile } from "d3-scale";
import { nest } from "d3-collection";
import { min, max, mean } from "d3-array";

select("body").append("h1").text("Olá mundo");

// --------------- Trabalhando com scales métodos (linear e quantile) ----------------
// let newRamp = scaleLinear().domain([500000, 13000000]).range([0, 500]);
// console.log(newRamp(1000000));
// console.log(newRamp(9000000));
// console.log(newRamp.invert(313)); // retorna o valor na posição x;

// let newRampColor = scaleLinear()
//   .domain([500000, 13000000])
//   .range(["blue", "red"]);

// console.log(newRampColor(1000000));
// console.log(newRampColor(9000000));
// console.log(newRampColor.invert("#ad0052")); // retorna NaN, pois o método invert só funciona para valores númericos.

// let sampleArray = [423, 124, 66, 424, 58, 10, 900, 44, 1];
// let newRampQuantile = scaleQuantile().domain(sampleArray).range(["small", "medium", "large"]);
// console.log(newRampQuantile(423));
// console.log(newRampQuantile(69));
// console.log(newRampQuantile(29));
// console.log(newRampQuantile(1000));

// --------------- Trabalhando com min, max e mean métodos ----------------
// csv(require("./data/cities.csv")).then((data) => {
//   console.log(data);
//   let minimo = min(data, (el) => {
//     return +el.population;
//   });

//   let maximo = max(data, (el) => {
//     return +el.population;
//   });

//   let media = mean(data, (el) => {
//     return +el.population;
//   });

//   console.log(minimo);
//   console.log(maximo);
//   console.log(media);
// });

let tweets = require("./data/tweets.json");

// --------------- Trabalhando com agrupamentos de dados usando nest método ----------------
// let nestedTweets = nest()
//   .key((el) => {
//     return el.user;
//   })
//   .entries(tweets.tweets);

// console.log(tweets.tweets);
// console.log(nestedTweets);

function dataViz(incomingData) {
    select("body")
    .selectAll("div.cities")
    .data(incomingData)
    .enter()
    .append("div")
    .attr("class", "cities")
    .html((d, i) => {
      return d.label;
    });

}

csv(require("./data/cities.csv")).then((data) => {
    dataViz(data);
});
