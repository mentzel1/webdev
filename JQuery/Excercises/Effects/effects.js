//If you want a function excuted when the fade out is complete, you must include it as an anonymous function inside of the fade out function. Otherwise the fadeout will still be running while the next step exectues
$("button").on("click", function(){
  $("div").fadeOut(1000, function(){
    console.log("FADE OUT COMPLETE!!!!");
    //removes actual html code to delete div
    $(this).remove();
  });
  console.log("Fade out is NOT COMPLETE!");
});


//you can also fade in as we do with header
$("button").on("click", function(){
  $("h1").fadeIn(1000);
});

//you can use fade toggle to go in and out of fading
$("button").on("click", function(){
  $(".fadeToggle").fadeToggle(1000);
});


//slideUp() /slideToggle messes with the height of the element to show and unshow it via sliding feature
$("button").on("click", function(){
  $(".sliding").slideToggle(1000);
});
