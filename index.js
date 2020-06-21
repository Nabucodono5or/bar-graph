import { select } from "d3-selection";
import { csv, json } from "d3-fetch";
import { scaleLinear, scaleQuantile } from "d3-scale";
import { nest } from "d3-collection";

select("body").append("h1").text("Olá mundo");

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

csv(require("./data/cities.csv")).then((data) => {
  console.log(data);
});

let tweets = require("./data/tweets.json");
let nestedTweets = nest()
  .key((el) => {
    return el.user;
  })
  .entries(tweets.tweets);

console.log(tweets.tweets);
console.log(nestedTweets);