// NOTE: click() only adds listeners for existing elements and on() adds listeners for all potential future elemtents!!!!
//*********************************************************


//The click() jquery Listener here changes background color of button to pink when clicked
$("button").click(function(){
  // alert("You clicked me!");
  $(this).css("background", "pink");
  console.log("You clicked:" + $(this).text());
});

// keypress() - executes code inbetween keydown and keup
// keydown() - executes code when key pressed keydown
// keyup() -executes code when key is released

//The keypress() listener here will print to our console each key we press inbetween push down and release of the button
$("input[type='text']").keypress(function(){
  // console.log("What you have typed:" + $(this).val());
  console.log("What you have typed something");
});

//If you want to only execute the anonymous function if a certain event happens, then here is an exaple. Event object here was always being passed but we just werent capturing it into a variable. We need to capture it here to save which key was being pressed by the user. You access what it is by objects "which" property
$("input[type='text']").keypress(function(event){
  if(event.which === 13){
    alert("You clicked ENTER!");
  }
});

//GENERAL USE: Similar to addEventListener in javascript, it lets you specify the type of event to listen for
$("h1").on("click", function(){
  $(this).css("backgroundColor", "green");
});

$("input[type='text']").on("keypress", function(e){
  if(e.which === 101){
    console.log("You clicked e button!");
  }else{
    console.log("you pressed: " + e.which);
  }
});

//When you mouse over a button, the button text becomes bold
$("button").on("mouseenter", function(){
  // console.log("Mouse Enter!");
  $(this).css("font-weight", "bold");
});

//When you mouse off button, the button text becomes bold
$("button").on("mouseleave", function(){
  $(this).css("font-weight", "normal");
});
