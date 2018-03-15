// alert("YAYA!");

//Alerts the user when you click on the button
function boom(){
  alert("You click the button!");
}

//When you click on the button the paragraph changes contenet
function change(){
  p.textContent = "You clicked the button!";
}

//Changes background to pink when button clicked on
function color(){
    h1.style.background = "pink";
}

//Changes color between white and purple
function toggle(){
  button.classList.toggle("color");
}

var p = document.querySelector("p");
var button = document.querySelector("button");
button.addEventListener("click", toggle);

var h1 = document.querySelector("h1");
h1.addEventListener("click", color);
