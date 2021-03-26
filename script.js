let button;
let undoButton;
var starNum = 200;
var reachedStar = [];
var lineList = [];
var prevLines = [];
var savePic;
var canvas;
var fitScreenHeight;
var fitScreenWidth;


function setup() {
  fitScreenWidth = document.body.clientWidth;
  fitScreenHeight = document.body.clientHeight;
  canvas = createCanvas(fitScreenWidth, fitScreenHeight);
  background(0, 0, 0);
  createStars(starNum);
  button = createButton("Rescatter stars");
  button.position(30, fitScreenHeight - 180);
  button.size(150, 50);
  button.style("font-family", "Wave Max");
  button.style("font-size", "20px");
  button.style("color", "#FFFFFF");
  button.style("background-color", "#0f1921");
  button.style("border", "#30526a");
  button.mousePressed(refresh);
  undoButton = createButton("Undo");
  undoButton.position(30, fitScreenHeight - 120);
  undoButton.size(150, 50);
  undoButton.style("font-family", "Wave Max");
  undoButton.style("font-size", "20px");
  undoButton.style("color", "#FFFFFF");
  undoButton.style("background-color", "#0f1921");
  undoButton.style("border", "#30526a");
  undoButton.mousePressed(back);
  savePic = createButton("Save Constellation");
  savePic.position(30, fitScreenHeight - 60);
  savePic.size(150, 50);
  savePic.style("font-family", "Wave Max");
  savePic.style("font-size", "20px");
  savePic.style("color", "#FFFFFF");
  savePic.style("background-color", "#0f1921");
  savePic.style("border", "#30526a");
  savePic.mousePressed(savePicture);
}
function savePicture() {
  var fileName = prompt("What is the name of your constellation?");
  saveCanvas(canvas, fileName, "png");
}
function back() {
  background(0, 0, 0);
  reachedStar.forEach(function(star) {
    createStar(star.x, star.y, star.sizeOfStar);
  });
  prevLines.pop();
  prevLines.forEach(function(stars) {
    stroke(225, 225, 224);
    line(stars[0].x, stars[0].y, stars[1].x, stars[1].y);
  });
}
function draw() {}

function mouseClicked() {
  console.log(reachedStar, mouseX, mouseY);
  for (var i = 0; i < reachedStar.length; i += 1) {
    var star = reachedStar[i];
    console.log(
      reachedStar,
      mouseX,
      mouseY,
      star.x - star.sizeOfStar / 2,
      mouseX
    );
    if (
      star.x - star.sizeOfStar / 2 < mouseX &&
      star.x + star.sizeOfStar / 2 > mouseX
    ) {
      if (
        star.y - star.sizeOfStar / 2 < mouseY &&
        star.y + star.sizeOfStar / 2 > mouseY
      ) {
        lineList.push(star);
        if (lineList.length >= 2) {
          prevLines.push(lineList);
          stroke(225, 225, 224);
          line(lineList[0].x, lineList[0].y, lineList[1].x, lineList[1].y);
          lineList = [];
        }
      }
    }
  }
}

function refresh() {
  background(0, 0, 0);
  createStars(starNum);
  lineList = [];
  prevLines = [];
}

function createStar(x, y, size) {
  fill(225, 225, 222);
  //console.log(circle(x, y, size));
  var c = circle(x, y, size);
}
function createStars(stars) {
  reachedStar = [];
  for (let i = 0; i < stars; i += 1) {
    let x = Math.random() * fitScreenWidth;
    let y = Math.random() * fitScreenHeight;
    var sizeOfStar = 6 + 9 * Math.random();
    reachedStar.push({ x, y, sizeOfStar });
    createStar(x, y, sizeOfStar);
  }
}
