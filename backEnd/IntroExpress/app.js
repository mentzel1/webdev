console.log("First APP!");

var express = require("express");
//Execute and save to a variable
var app = express();

//Order of declaring this routes matter, server checks for each route and goes down list until it finds an applicable route.
// "/" => "hi there!"
app.get("/", function(req, res){
  res.send("Hi there!");
});

//Pattern based routes, AKA param routes
app.get("/r/:subredditName", function(req, res){
  res.send("Welcome to a SUBREDDIT!");
});

app.get("/r/:subredditName/comments/:id/:title/", function(req, res){
  //You can retrieve info from request, like the page they are trying to view. Must match the rout definied above, in this case subredditName
  var subreddit = req.params.subredditName;
  res.send("WElCOME TO " + subreddit.toUpperCase() + " SUBREDDIT!");
});

// "/bye" => "Goodbye!"
app.get("/bye", function(req, res){
  res.send("Goodbye!");
});

// "/dog" => "MEOW!
app.get("/dog", function(req, res){
  res.send("MEOW!");
});

//Catch all for when users try to access a page/route that does not exist
app.get("*", function(req, res){
    res.send("This page does not EXIST!");
});

//Tell Express to listen for requests (start server essentially)
app.listen(3000, function(){
  console.log("Server has started running!");
});
