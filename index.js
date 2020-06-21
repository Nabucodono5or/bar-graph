import { select } from "d3-selection";
import { csv, json } from "d3-fetch";

select("body").append("h1").text("Olá mundo");

csv(require("./data/cities.csv")).then((data) => {
  console.log(data);
});

let tweets = require("./data/tweets.json");
console.log(tweets.tweets);