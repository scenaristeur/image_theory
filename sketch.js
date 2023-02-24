// width & height of canvas
const width = 550;
const height = 552;

/* interessant à voir, filtres et layers
https://idmnyu.github.io/p5.js-image/Advanced/index.html
KErnel convolution https://idmnyu.github.io/p5.js-image/Blur/index.html
edge detection https://idmnyu.github.io/p5.js-image/Edge/index.html

*/
// lsh https://ocw.snu.ac.kr/sites/default/files/NOTE/L5-lsh.pdf
// ouille https://piazza.com/class_profile/get_resource/kfcak69rtkh3d7/ki07adisk1n4fk
// https://www.di.fc.ul.pt/~vcogo/notes/2018_08_seteic_iff_lsh.pdf
// images medical https://www.sciencedirect.com/topics/computer-science/jaccard-similarity

// ML5 examples https://ml5js.github.io/ml5-examples/public/

/* 
----- variables for analyse of the image
- focus: focus position
- p_width: width of analysed plan
- p_height: height of analysed plan
- density: density of analyse
- steps: number of steps of analyse
- steps_to_run: how many steps/epoch to run left
- draw_plan: draw the plan of analyse
- mode: mode of analyse
- pixels_plan: an array of all pixels in the analysed plan not pixels because a p5js function with this name already exist // not sure is necessaire
- pix: the analysed pixels
----- mode of analyse can be 
- random
- square
- circle
- rayon
- star
- interest_point
or a custom function, or a combination of them
*/

let focus = { x: width / 2, y: height / 2 };
let p_width = 200;
let p_height = 200;
let density = 10;
let steps = 100;
let steps_to_run;
let draw_plan = true;
let mode = "random";
let pixels_plan = [];
let pix = [];

// lsh
let lsh_index = new LshIndex();
let focus_hash;

//preload an image
let img;
// load animage
let input;

// classifier
// Initialize the Image Classifier method using MobileNet
let classifier;
let currentIndex = 0;
let allImages = []; // not used yet
let predictions = [];

function preload() {
  img = loadImage("lena.png");
  classifier = ml5.imageClassifier("MobileNet");
  //classifier = ml5.imageClassifier('DoodleNet');
  data = loadJSON("assets/data.json");
}

function setup() {
  createCanvas(width, height);
  // 60FPS, no need to more refresh
  frameRate(60);
  //background(220);
  imageReady(img);
  reload();
  input = createFileInput(handleFile);
  //input.position(0, 0);
}

function reload() {
  image(img, 0, 0);
  newTheory();
}

function newTheory() {
  drawPlan();
  analyse();
  check_similitudes();
}

// When the image has been loaded,
// get a prediction for that image
function imageReady(img) {
  image(img, 0, 0);
  classifier.classify(img, gotResult);
}

function savePredictions() {
  predictionsJSON = {
    predictions: predictions,
  };
  saveJSON(predictionsJSON, "predictions.json");
}

// When we get the results
function gotResult(err, results) {
  // If there is an error, show in the console
  if (err) {
    console.error(err);
  }

  //information = {
  //name: allImages[currentIndex],
  // result: results
  //};

  //predictions.push(information);
  createDiv("Label: " + results[0].label);
  createDiv("Confidence: " + nf(results[0].confidence, 0, 2));
  //currentIndex++;
  // if (currentIndex <= allImages.length - 1) {
  //  loadImage(allImages[currentIndex], imageReady);
  //} else {
  //  savePredictions();
  // }
  console.info("PREDICTIONS", results);
 reload()
}

function draw() {
  // masquage()
}

function check_similitudes() {
  /* check similitudes, regroupe les pixels identiques et trouve des points d'interêts ( pixels différents) pour les exploiter en tant que nouveaux focus on utilise pour ça une variance ?
  - stocker les infos sous forme de lsHash, lsh gan
  - par rapport aux autres pixels de ce step
  - par rapport au plan d'analyse
  - par rapport aux précédents plans d'analyse
  - par rapport à toute l'image
  - par rapport par rapport à un set d'images
  stocker tout ça sur ipfs 
  pour créer des nouveaux modèles de similaritude
  
  */
  console.log("check_similitudes");
}

function analyse() {
  steps_to_run = steps;
  // get pixels https://p5js.org/reference/#/p5/get
  pixels_plan = img.get(
    focus.x - p_width / 2,
    focus.y - p_height / 2,
    p_width,
    p_height
  );
  focus.col = img.get(focus.x, focus.y);
  console.log("focus", focus);
  var m1 = new Minhash();
  focus_hash = new Minhash();
  // we lsh the color of the point
  focus.col.map(function (w) {
    focus_hash.update(w);
  });
  //focus_hash_id = 'focus_'+focus.x+'_'+focus.y
  //console.log("focus_hash_id", focus_hash_id, focus_m)
  lsh_index.insert("focus_hash", focus_hash);

  while (steps_to_run > 0) {
    console.log("steps to run ", steps_to_run, mode);
    steps_to_run--;
    switch (mode) {
      case "random":
        analyse_random();
        break;
      case "square":
        analyse_square();
        break;
      default:
        console.log("unknown mode");
        steps_to_run = 0;
    }
  }
  console.log("all pixels of the plan", pixels_plan);
  console.log("all analysed pixels", pix);

  // store similar pixels in lshash
  // https://github.com/scenaristeur/lsh
  //https://medium.com/@hbrylkowski/locality-sensitive-hashing-explained-304eb39291e4
  // ? https://learning2hash.github.io/
  match_focus_point();
}

function match_focus_point() {
  console.log(lsh_index);

  // https://www.npmjs.com/package/minhash
  var s1 = [
    "minhash",
    "is",
    "a",
    "probabilistic",
    "data",
    "structure",
    "for",
    "estimating",
    "the",
    "similarity",
    "between",
    "datasets",
  ];
  var s2 = [
    "minhash",
    "is",
    "a",
    "probability",
    "data",
    "structure",
    "for",
    "estimating",
    "the",
    "similarity",
    "between",
    "documents",
  ];
  // create a hash for each set of words to compare
  var m1 = new Minhash();
  var m2 = new Minhash();
  // update each hash
  s1.map(function (w) {
    m1.update(w);
  });
  s2.map(function (w) {
    m2.update(w);
  });
  // estimate the jaccard similarity between two minhashes
  let sim = m1.jaccard(m2);
  console.log("sim", sim);

  var s1 = [
    "minhash",
    "is",
    "a",
    "probabilistic",
    "data",
    "structure",
    "for",
    "estimating",
    "the",
    "similarity",
    "between",
    "datasets",
  ];
  var s2 = [
    "minhash",
    "is",
    "a",
    "probability",
    "data",
    "structure",
    "for",
    "estimating",
    "the",
    "similarity",
    "between",
    "documents",
  ];
  var s3 = [
    "cats",
    "are",
    "tall",
    "and",
    "have",
    "been",
    "known",
    "to",
    "sing",
    "quite",
    "loudly",
  ];
  // generate a hash for each list of words
  var m1 = new Minhash();
  var m2 = new Minhash();
  var m3 = new Minhash();
  // update each hash
  s1.map(function (w) {
    m1.update(w);
  });
  s2.map(function (w) {
    m2.update(w);
  });
  s3.map(function (w) {
    m3.update(w);
  });
  // add each document to a Locality Sensitive Hashing index

  lsh_index.insert("m1", m1);
  lsh_index.insert("m2", m2);
  lsh_index.insert("m3", m3);
  // query for documents that appear similar to a query document
  var matches = lsh_index.query(m1);
  console.log("Jaccard similarity >= 0.5 to m1:", matches);
  var matches_focus = lsh_index.query(focus_hash);
  console.log("Jaccard similarity >= 0.5 to focus:", matches_focus);

  //var matches = lsh_index.query(lsh_index);
  // console.log('Jaccard similarity >= 0.5 to focus:', matches);
}

function analyse_random() {
  let x = focus.x + Math.round(random(-p_width / 4, p_width / 4));
  let y = focus.y + Math.round(random(-p_height / 4, p_height / 4));
  let p = { x: x, y: y };
  push_point(p);
}

function push_point(p) {
  p.col = img.get(p.x, p.y);
  pix.push(p);
  //console.log(pixel)
  // shown on ly if not overlap by masquage
  strokeWeight(4);
  stroke(0, 255, 0);
  point(p.x, p.y);
  strokeWeight(1);
  stroke(1);
  lsh_point(p);
}
function lsh_point(p) {
  let m = new Minhash();
  console.log("m empty", m);
  // we lsh the color of the point
  p.col.map(function (w) {
    m.update(w);
  });
  let point_id = p.x + "_" + p.y;
  console.log(point_id, m);
  lsh_index.insert(point_id, m);
}

function analyse_square() {
  console.log("todo");
  steps_to_run = 0;
}

function mouseClicked() {
  focus = { x: mouseX, y: mouseY };
  reload();
}

function drawPlan() {
  // adapt shape (circle for example according to mode)
  console.warn("draw_plan can affect the result !");
  if (draw_plan == true) {
    //let c = color(255, 204, 0,100);
    //fill(c);
    //noStroke();
    noFill();
    rectMode(CENTER);
    // +2 to englobe and not perturbe limit points
    rect(focus.x, focus.y, p_width / 2 + 2, p_height / 2 + 2); //
    strokeWeight(4);
    stroke(255, 0, 0);
    point(focus.x, focus.y);
  }
}

function masquage() {
  // masque des pixels déjà analysés
  for (let i = 0; i < pix.length; i++) {
    let p = pix[i];
    let col = p.col;
    // make in transparent or blue
    //console.log(col)
    //let c = color();
    //console.log(c)
    strokeWeight(4);
    stroke(0, 0, 255);
    point(p.x, p.y);
  }
}

// https://fr.wikipedia.org/wiki/Variance_(math%C3%A9matiques)
// https://www.tutorialspoint.com/calculating-variance-for-an-array-of-numbers-in-javascript

function findVariance(arr = []) {
  if (!arr.length) {
    return 0;
  }
  const sum = arr.reduce((acc, val) => acc + val);
  const { length: num } = arr;
  const median = sum / num;
  let variance = 0;
  arr.forEach((num) => {
    variance += (num - median) * (num - median);
  });
  variance /= num;
  return { median, variance };
}

function handleFile(file) {
  print(file);
  if (file.type === "image") {
    // img.remove()

    img = loadImage(file.data, prepareImg);

    //img.hide();
    // reload()
  } else {
    img = null;
  }
}

function prepareImg() {
  background(0);

  if (img.width != width) {
    img.resize(width, 0);
  }
  if (img.height > height) {
    img.resize(0, height);
  }
  focus = { x: img.width / 2, y: img.height / 2 };
  imageReady(img)
 // reload();
}
