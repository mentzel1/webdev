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
initGame();


// Add event listeners for all buttons
for(var i=0; i<squares.length; i++){
  squares[i].addEventListener("click", clickedSquareChecker);
}
reset.addEventListener("click", initGame);
hard.addEventListener("click", function(){
  numGame = numHard;
  resetGame(numGame);
})
easy.addEventListener("click", function(){
  numGame = numEasy;
  resetGame(numGame);
})

//Resets the game by regenerating random squares for current game mode selected (easy or hard) and clearing display
function resetGame(gameType){
  if(gameType === numEasy){
    hard.classList.remove("selected");
    easy.classList.add("selected");
  }else{
    hard.classList.add("selected");
    easy.classList.remove("selected");
  }
  randSquareColors(gameType);
  pickedColor= colorPicker(gameType);
  colorDisplay.textContent = pickedColor.toUpperCase();
  bannerDisplay.style.backgroundColor = "#538CC6";
  resultsDisplay.textContent = " ";
  reset.textContent = "NEW COLORS";
}

//Initializes the game using reset which sets squares and default buttons and display screen
function initGame(){
  resetGame(numGame);
}

//Generates Specified number of colored squares by coloring in set "num" if squares with a random color and all other squares are set to background color so they are removed
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
  return squares[Math.floor(Math.random()*numColors)].style.backgroundColor;
}

//Generates a random RGB color and returns it as a string
function randColor(){
  var red = Math.floor(Math.random() * 256);
  var green = Math.floor(Math.random() * 256);
  var blue = Math.floor(Math.random() * 256);
  return "RGB(" + red + ", " + green + ", " + blue +")";
}

// Method checks if clicked square is correct solution, if not, removes square by setting background to same color as the body. If it is correct, Shows "Correct!" on banner, then banner color and all other sqaures become that color. Game ends, user can play again by clicking buttons
function clickedSquareChecker(){
  if( this.style.backgroundColor === pickedColor){
    for(var i=0; i<numGame; i++){
      squares[i].style.backgroundColor = pickedColor;
    }
    resultsDisplay.textContent = "Correct!";
    reset.textContent = "PLAY AGAIN?"
    bannerDisplay.style.backgroundColor = pickedColor;
  }else{
    this.style.backgroundColor = "#14141f";
    resultsDisplay.textContent = "Try Again";
  }
}
