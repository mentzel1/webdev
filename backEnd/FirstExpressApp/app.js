console.log("YAY, our first express app!!");
var express = require("express");
var app = express();

// "/" => "Hi here!"
app.get("/", function(req, res){
  res.send("Hi there!");
});

// "/bye" => "Goodbye!"
app.get("/bye", function(req, res){
  res.send("Goodbye!!");
});

// "/dog" => "MEOW!"
app.get("/dog", function(req, res){
  console.log("Someone made a request to /dog!");
  res.send("MEOW!");
});

//Tell Express to listen for requests (start server)
app.listen(3000, function(){
  console.log("The server has started!!");
  }
);
