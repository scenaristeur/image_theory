// width & height of canvas
const width = 512;
const height = 512;

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
  classifier = window.classifier;

  classifier = ml5.imageClassifier('DoodleNet');
  // data = loadJSON("assets/data.json");
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

function draw() {
  // masquage()
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







