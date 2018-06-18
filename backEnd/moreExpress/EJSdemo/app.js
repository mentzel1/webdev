var express = require("express");
var app = express();

//Need to tell express to explicitly serve all directories (other than default views) in order for it to be found
app.use(express.static("public"));

//We can specify that all are view files will be ejs, so we do not need to include the extension, just the name of the files ("home.ejs" vis "home")
app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("home");
});

app.get("/fallinlovewith/:thing", function(req, res){
  var thing = req.params.thing;
  res.render("love", {thingVar: thing});
});

app.get("/posts", function(req, res){
  var posts = [
    {title: "Harry Potter", author: "J.K Rowling"},
    {title: "Hipster near the woods", author: "Dana Vuderburg" },
    {title: "Dr. Who went where?", author: "Chris Butterburg"}
  ];
  res.render("posts", {posts: posts});
});

app.listen(3000, function(){
  console.log("The server is starting!!!");
});
