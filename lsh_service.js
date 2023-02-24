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