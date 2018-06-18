var express = require("express");
var app = express();
var bodyParser = require("body-parser");

//Tell express to use body parser
app.use(bodyParser.urlencoded({ extended: true }))

app.set("view engine", "ejs");

var friends = ["Dorothy", "Scott", "Allen", "Tweety", "Dexter"];

app.get("/", function(req, res){
  res.render("home");
});

app.get("/friends", function(req, res){
  res.render("friends", {friends: friends});
});

app.post("/addfriend", function(req, res){
  //Should verify this body object (type) before using
  console.log(req.body);
  var newfriend = req.body.newfriend;
  friends.push(newfriend);
  //This runs the friends route
  res.redirect("/friends");
});

app.listen(3000, function(){
  console.log("The server has startes!");
});
