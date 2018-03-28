//Clicking on a todo item checks and unchecks the item
$("ul").on("click", "li", function(){
  console.log("LI");
  $(this).toggleClass("completed");
});

//Clicking on delete marker deletes the todo item
$("span").on("click", function(event){
  console.log("SPAN");
  $(this).parent().fadeOut(500, function(){
    $(this).remove();
  });
  //Stop propagation (executing parent event listeners)
  event.stopPropagation();
});

//Add item to the todo list upon clicking enter
$("input[type='text']").on("keypress", function(event){
  //Save user input each time they press a key
  var todoItem = $("input").val();
  //Pressing enter adds item to beggining of list, clears input
  if(event.which === 13){
    $("ul").append("<li><span>X</span> " + todoItem + "</li>");
    $("input").val("");
  }
});
