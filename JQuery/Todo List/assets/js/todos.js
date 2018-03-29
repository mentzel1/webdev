//NOTE: You have to use .on() here because it will set listeners for all future items you add to your todo list. Futhermore, you have to specify element through parent which is always on the html wepage (as "ul" is here. we will never delete the "ul"). So we want events to be set on all "li" inside the "ul" and all "span" inside "ul."

//Clicking on a todo item checks and unchecks the item
$("ul").on("click", "li", function(){
  console.log("LI");
  $(this).toggleClass("completed");
});

//Clicking on delete marker deletes the todo item
$("ul").on("click", "span", function(event){
  console.log("SPAN");
  $(this).parent().fadeOut(500, function(){
    $(this).remove();
  });
  //Stop propagation (executing parent event listeners aka li here)
  event.stopPropagation();
});

//Add item to the todo list upon clicking enter
$("input[type='text']").on("keypress", function(event){
  //Save user input each time they press a key
  var todoItem = $("input").val();
  //Pressing enter adds item to beggining of list, clears input
  if(event.which === 13){
    if(todoItem.length < 31){
      $("ul").append('<li><span><i class="fas fa-trash-alt"></i></span> ' + todoItem + "</li>");
      $("input").val("");
    }else{
        alert("Your todo item is too long!");
        $("input").val("");
    }
  }
});

//Toggles input field when plus icon clicked
$("#plus").on("click", function(){
  $("input").fadeToggle(200);
});
