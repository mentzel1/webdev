var squares = document.querySelectorAll(".square");
var resultsDisplay = document.querySelector(".results");

// NOTE: UPON LOADING WEBPAGE
//Add event listeners upon loading page and initial random colors. Cannot randomly add colors here bc we have issues with overriding our "selected" css style and even with !important we have issue later on with square stuck being black once correct color is selected. Plus !important is bad practice
for(var i=0; i<squares.length; i++){
  // squares[i].style.backgroundColor = colors[i];
  squares[i].style.backgroundColor = randColor();
  squares[i].addEventListener("click", clickedSquare);
}

//Pick a random square out of the six squares, this will be the "PICKED" color and update the h1 to display the color in rgb
var squareHard = Math.floor(Math.random()*6);
var squareEasy= Math.floor(Math.random()*3);
var colorDisplay = document.getElementById("colorDisplay");
var pickedColor= squares[squareHard].style.backgroundColor;
colorDisplay.textContent = pickedColor;


//Function colors specified number of random colored squares with random colors. Squares are colored black by default
function randSquareColors(num){
  for(var i=0; i<num; i++){
    squares[i].style.backgroundColor = randColor();
  }
}

// Method checks if clicked square is correct solution, if not, removes square by setting background to same color as the body. If it is correct, Shows "Correct!" on banner and ends game
function clickedSquare(){
  console.log(this.style.backgroundColor);
  if( this.style.backgroundColor === pickedColor){
    correct(pickedColor);
  }else{
    this.style.backgroundColor = "#14141f";
    resultsDisplay.textContent = "Try Again";
  }
}

//Generates a random RGB color. The document.style.color property takes a string so we must return a string
function randColor(){
  var red = Math.floor(Math.random() * 256);
  var green = Math.floor(Math.random() * 256);
  var blue = Math.floor(Math.random() * 256);
  var color = "RGB(" + red + ", " + green + ", " + blue +")";
  // console.log(color);
  return color;

}

//If user selects correct color, then banner color and all other sqaures become that color
function correct(pickedColor){
  for(var i=0; i<squares.length; i++){
    squares[i].style.backgroundColor = pickedColor;
  }
  resultsDisplay.textContent = "Correct!";
  var bannerDisplay = document.querySelector(".banner");
  console.log("banner :" + bannerDisplay);
  bannerDisplay.style.backgroundColor = pickedColor;
}
