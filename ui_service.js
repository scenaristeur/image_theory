function mouseClicked() {
    if (mouseX > 0 && mouseY > 0 && mouseX < img.width && mouseY < img.height) {
      focus = { x: mouseX, y: mouseY };
      reload();
    }
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
    imageReady(img);
    // reload();
  }
  