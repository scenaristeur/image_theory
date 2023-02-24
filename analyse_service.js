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
  
  
  
  function analyse_random() {
    let x = focus.x + Math.round(random(-p_width / 4, p_width / 4));
    let y = focus.y + Math.round(random(-p_height / 4, p_height / 4));
    let p = { x: x, y: y };
    push_point(p);
  }

function analyse_square() {
    console.log("todo");
    steps_to_run = 0;
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