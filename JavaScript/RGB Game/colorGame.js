//Get all squares and resuls display
var squares = document.querySelectorAll(".square");
var resultsDisplay = document.querySelector(".results");
var colorDisplay = document.getElementById("colorDisplay");
var bannerDisplay = document.querySelector(".banner");
var reset = document.querySelector(".reset");
var hard = document.querySelector(".hard");
var easy = document.querySelector(".easy");
var numEasy = 3;
var numHard = 6;
var numGame = numHard;
var pickedColor;

//Initialize game with reset function
resetGame();

// //Set Random colors
// randSquareColors(numGame);
// //Cant pick random squarecolor until you set all the random squares with colors
// var pickedColor= colorPicker(numHard);
//
// //Update the h1 to display the color in rgb
// colorDisplay.textContent = pickedColor.toUpperCase();

// Add event listeners
for(var i=0; i<squares.length; i++){
  squares[i].addEventListener("click", clickedSquare);
}
reset.addEventListener("click", resetGame);
hard.addEventListener("click", function(){
  hard.classList.add("selected");
  easy.classList.remove("selected");
  numGame = numHard;
  resetDifficulty(numGame);
})
easy.addEventListener("click", function(){
  hard.classList.remove("selected");
  easy.classList.add("selected");
  numGame = numEasy;
  resetDifficulty(numGame);
})

function resetDifficulty(num){
  randSquareColors(num);
  pickedColor= colorPicker(num);
  colorDisplay.textContent = pickedColor.toUpperCase();
  bannerDisplay.style.backgroundColor = "#538CC6";
  resultsDisplay.textContent = " ";
}

function resetGame(){
  hard.classList.add("selected");
  easy.classList.remove("selected");
  randSquareColors(numGame);
  reset.textContent = "NEW COLORS";
  pickedColor= colorPicker(numHard);
  colorDisplay.textContent = pickedColor.toUpperCase();
  bannerDisplay.style.backgroundColor = "#538CC6";
  resultsDisplay.textContent = " ";
}

//Generates Specified number of colored squares
function randSquareColors(num){
  for(var i=0; i<squares.length; i++){
    if(i < num){
      squares[i].style.backgroundColor = randColor();
    }else{
      squares[i].style.backgroundColor = "#14141f";
    }
  }
}

//Picks color at random from generated squares, returns as string
function colorPicker(numColors){
  var color = squares[Math.floor(Math.random()*numColors)].style.backgroundColor;
  return color;
}

//Generates a random RGB color and returns it as a string
function randColor(){
  var red = Math.floor(Math.random() * 256);
  var green = Math.floor(Math.random() * 256);
  var blue = Math.floor(Math.random() * 256);
  var color = "RGB(" + red + ", " + green + ", " + blue +")";
  console.log("color: " + color);
  // console.log(color);
  return color;
}

// Method checks if clicked square is correct solution, if not, removes square by setting background to same color as the body. If it is correct, Shows "Correct!" on banner and resets game
function clickedSquare(){
  console.log("clicked square background color" + this.style.backgroundColor);
  if( this.style.backgroundColor === pickedColor){
    correct(pickedColor);
  }else{
    this.style.backgroundColor = "#14141f";
    resultsDisplay.textContent = "Try Again";
  }
}

//If user selects correct color, then banner color and all other sqaures become that color
function correct(pickedColor){
  for(var i=0; i<numGame; i++){
    squares[i].style.backgroundColor = pickedColor;
  }
  resultsDisplay.textContent = "Correct!";
  reset.textContent = "PLAY AGAIN?"
  bannerDisplay.style.backgroundColor = pickedColor;
}
