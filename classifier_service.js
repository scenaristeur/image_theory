

// export class Classifier {
//   /* … */

//   constructor(net) {
//     console.log(net)
//    return this.init()
//   }

//   init(){
//     this.classifier = ml5.imageClassifier(net);
//     return this.classifier;
//   }
// }

// When the image has been loaded,
// get a prediction for that image
function imageReady(img) {
  image(img, 0, 0);
  classifier.classify(img, gotResult);
}

// function savePredictions() {
//   predictionsJSON = {
//     predictions: predictions,
//   };
//   saveJSON(predictionsJSON, "predictions.json");
// }

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
  reload();
}
