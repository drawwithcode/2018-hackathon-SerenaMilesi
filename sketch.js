var mySong;
var myCanvas;
var myImage;
var myAmplitude;
var logo1;
var logo2;
var cherry;

function preload() {
  // put preload code here
  mySong = loadSound('./assets/soundtrack.mp3');
  myImage = loadImage("./assets/welcome.jpg");
  logo1 = loadImage("./assets/logo.png");
  logo2 = loadImage("./assets/logo.png");
  cherry = loadImage("./assets/cherry.png");
}

function setup() {
  // put setup code here
  myCanvas = createCanvas(windowWidth, windowHeight);

  myAmplitude = new p5.Amplitude();

  mySong.pause();
  myAmplitude.setInput(mySong);
  mySong.playMode('sustain'); //In 'sustain' mode, the sound will overlap with itself. In 'restart' mode it will stop and then start again.

  myCanvas.mouseClicked(function() {
    if (mySong.isPlaying() == false) {
      mySong.play();
      myImage.filter("gray");
    } else {
      mySong.pause();
    }
  });

}

function draw() {
  // put drawing code here

  image(myImage, 0, 0, windowWidth, windowHeight);
  //weird effect
  var posX = random(0, width);
  var posY = random(0, height);

  // Grab the color at a particular position
  var col = get(posX, posY);
  fill(col);
  noStroke();
  ellipse(posX, posY, 20);

  var myText = 'TWIN PEAKS';
  var myText2 = 'Diane, 11:30 AM, February 24th. \nClick to enter the town of Twin Peaks.';

  push();
  fill('#7B491B');
  textFont('Roboto');
  textStyle(BOLD);
  strokeWeight(3);
  stroke('#42E022');
  textSize(60);
  textAlign(CENTER);
  text(myText, windowWidth / 2, windowHeight / 2);
  pop();

  push();
  fill('#7B491B');
  textFont('Roboto');
  textStyle(BOLD);
  strokeWeight(3);
  stroke('#42E022');
  textSize(20);
  textAlign(CENTER);
  text(myText2, windowWidth / 2, (windowHeight / 2) + 50);
  pop();

  var volume = 0;

  // get the volume and remap it to a bigger value
  volume = myAmplitude.getLevel();
  console.log(volume);
  volume = map(volume, 0, 1, 0, height);
  push();
  imageMode(CENTER);
  image(logo1, width / 4, height / 2, volume * 1.5, volume);
  image(logo2, ((width / 2) * 1.5) - 50, height / 2, volume * 1.5, volume);
  pop();

  //mouse
  push();
  imageMode(CENTER);
  image(cherry, mouseX, mouseY, 50, 50);
  pop();

}

//to restart the song
function keyPressed() {
  mySong.playMode('restart');
  mySong.play();
  image(logo1, width / 4, height / 2, 100, 100);

}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
