// Prompt always returns a string so you have to convert it to a number
var age = Number(prompt("Please enter your age:"));

var square = Math.sqrt(age);

if(age === 21){
  console.log("Happy 21st birthday!");
}
if(age < 0){
  console.log("Error, incorrect input!");
}
if(age%2 !== 0 ){
  console.log("Your age is odd!");
}
if(age%square === 0){
  console.log("Perfect Square!")
}
