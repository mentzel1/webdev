//Note, if you want to be able to access the todos variable from the chrome developer console then you'll need to put it in the global scope, see example below:
// var items = [];

window.setTimeout(function() {
  var items = [];
  var input = prompt("What would you like to do?");

  while(input !== "quit"){
    if(input === "new"){
      addItem();
    }else if(input === "list"){
      list();
    }else if(input === "delete"){
      removeItem();
    }
    // Keep prompting user until they quit the application
    input = prompt("What would you like to do?");
  }
  alert("You have quit the todolist application!");

  function addItem(){
    var newItem = prompt("Please eneter a new item:");
    items.push(newItem);
    alert("You have added a new item to the list!");
  }

  function list(){
    //Print out as a numbered List using a forEach loop
    console.log("**************");
    items.forEach(function(item, index){
      console.log(index + ": " + item);
    })
    console.log("**************");
  }

  function removeItem(){
    //Ask user which item at which index they would like to Deletes
    var remove = prompt("Please provide the index of the item to be deleted:");
    items.splice(remove, 1);
    alert("You have deleted an item from the list!");
  }
}, 500);
