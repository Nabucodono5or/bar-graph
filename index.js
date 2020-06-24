import { select, selectAll } from "d3-selection";
import { csv, json } from "d3-fetch";
import { scaleLinear, scaleQuantile } from "d3-scale";
import { nest } from "d3-collection";
import { min, max, mean, extent } from "d3-array";

select("body")
  .append("h1")
  .text("Teste de valores estatísticos sobre população");

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

// ------------- carregando nome de cidades na página --------------------------------------

// function dataViz(incomingData) {
//   select("body")
//     .selectAll("div.cities")
//     .data(incomingData)
//     .enter()
//     .append("div")
//     .attr("class", "cities")
//     .html((d, i) => {
//       return d.label;
//     });
// }

// ------------------- Criando bar char apartir de um array ---------------------------------
// let array = [15, 50, 22, 8, 100, 10];
// let maxValor = max(array);

// function dataViz(incomingData) {
//   select("svg")
//     .selectAll("rect")
//     .data(incomingData)
//     .enter()
//     .append("rect")
//     .attr("class", "bar")
//     .attr("height", (d) => {
//       return d + 100;
//     })
//     .attr("width", 20)
//     .attr("x", (d, i) => {
//       return i * 25;
//     })
//     .attr("y", (d) => {
//       return 100 - d;
//     })
//     .style("fill", "#ef767a");
// }

// dataViz(array);

// ------------------ Criando bar char apartir de dados externos -----------------------------

csv(require("./data/cities.csv")).then((data) => {
  let parent = "svg";
  dataViz(data, parent);
});

function criandoYScale(data) {
  let maximo = max(data, (el) => {
    return +el.population;
  });
  let minimo = min(data, (el) => {
    return +el.population;
  });

  let yScale = scaleLinear().domain([minimo, maximo]).range([0, 500]);
  return yScale;
}

function dataViz(incomingData, parent) {
  let yScale = criandoYScale(incomingData);

  select(parent)
    .selectAll("rect")
    .data(incomingData)
    .enter()
    .append("rect")
    .attr("width", 20)
    .attr("height", (d) => {
      return yScale(+d.population);
    })
    .attr("x", (d, i) => {
      return i * 25;
    })
    .attr("y", (d) => {
      return 500 - yScale(+d.population);
    })
    .attr("class", "cities")
    .style("fill", "#ef767a");
}

// ------------------ Criando bar char apartir de array e usando polylinear scales -----------------

let lista = [14, 68, 24500, 430, 19, 1000, 5555];
let parent = "svg.segundo-graph";

function criandoPolynearScale(data) {
  let yScale = scaleLinear()
    .domain([0, 100, 1000, 24500])
    .range([0, 100, 200, 400]);

  return yScale;
}

function dataVizSecond(data, parent) {
  let yScale = criandoPolynearScale(data);

  select(parent)
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "num")
    .attr("height", (d) => {
      return yScale(d);
    })
    .attr("width", 20)
    .attr("x", (d, i) => {
      return i * 25;
    })
    .attr("y", (d) => {
      return 500 - yScale(d);
    })
    .style("fill", "#28536b");
}

dataVizSecond(lista, parent);

// ------------------ Criando bar char apartir de objetos json usando nested scale --------------

let parent2 = "svg.terceiro-graph";

function criandoYScaleTweets(incomingData) {
  let maxTweet = max(incomingData, (el) => {
    return el.numTweets;
  });
  
  let yScale = scaleLinear().domain([0, maxTweet]).range([0, 500]);

  return yScale;
}

function dataVizThird(incomingData, parent) {
  let nestedTweets = nest()
    .key((el) => {
      return el.user;
    })
    .entries(incomingData);

    
    nestedTweets.forEach((el) => {
      el.numTweets = el.values.length;
    });
    
  let yScale = criandoYScaleTweets(nestedTweets);

  select(parent)
    .selectAll("rect")
    .data(nestedTweets)
    .enter()
    .append("rect")
    .attr("height", (d) => {
      return yScale(d.numTweets);
    })
    .attr("width", 50)
    .attr("x", (d, i) => {
      return i * 60;
    })
    .attr("y", (d) => {
      return 500 - yScale(d.numTweets);
    })
    .style("fill", "#bb4430");
}

dataVizThird(tweets.tweets, parent2);
