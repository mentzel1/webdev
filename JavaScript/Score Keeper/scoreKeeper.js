//Get buttons for player1, player2, and reset
var p1Button = document.querySelectorAll("button")[0];
var p2Button = document.querySelectorAll("button")[1];
var resetButton = document.querySelectorAll("button")[2];

//elems[0] = player1Score, elems[1]=player2Score, elems[2]=max where max is dispplay of the number of games that needs to be won in order to win overall game and setMax is the set number of games needed to win the game
var setMax = document.querySelector("input");
var elems = document.querySelectorAll("strong");
var p1Display = elems[0];
var p2Display = elems[1];
var max = elems[2];

//Variables holding original scores of each player and game
var p1Score = 0;
var p2Score = 0;
var gameOver = false;
var winningScore = 5;

//When you click the buttons call the appropriate functions
p1Button.addEventListener("click", addp1Display);
p2Button.addEventListener("click", addp2Display);
resetButton.addEventListener("click", reset);
setMax.addEventListener("change", setMaxDisplay);

//Add 1 to player 1's score. End game if player1 wins
function addp1Display(){
  if(!gameOver){
    p1Score++;
    p1Display.textContent = p1Score.toString();
    //need to convert back to a number for furhter calculations
    Number(p1Score);
    if(p1Score === winningScore){
      // p1Display.style.color = "green";
      p1Display.classList.add("winner");
      gameOver = true;
      console.log("is game over?" + gameOver);
    }
  }
}

//Add 1 to player 2's score. End game if player2 wins
function addp2Display(){
  if(!gameOver){
    p2Score++;
    // console.log("score 2:" + p2Score);
    p2Display.textContent = p2Score.toString();
    //need to convert back to number for further calculations
    Number(p2Score);
    if(p2Score === winningScore){
      // p2Display.style.color = "green";
      p2Display.classList.add("winner");
      gameOver = true;
      console.log("is game over?" + gameOver);
    }
  }
}

//Sets original scores to 0
function reset(){
  gameOver = false;
  p1Display.classList.remove("winner");
  p2Display.classList.remove("winner");
  p1Display.textContent = "0";
  p2Display.textContent = "0";
  p1Score = 0;
  p2Score = 0;
}

//Updates the display of max number of games needed to win over all games upon users input
function setMaxDisplay(){
  //document.value returns a string, we need to convert it to a number in order to compare later on if we reached max wining number
  max.textContent = setMax.value;
  winningScore = Number(setMax.value);
  reset();
}
