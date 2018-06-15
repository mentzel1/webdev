var express = require("express");
var app = express();

app.get("/", function(req, res){
  res.render("home.ejs");
});

app.get("/fallinlovewith/:thing", function(req, res){
  var thing = req.params.thing;
  res.render("love.ejs", {thingVar: thing});
});

app.get("/posts", function(req, res){
  var posts = [
    {title: "Harry Potter", author: "J.K Rowling"},
    {title: "Hipster near the woods", author: "Dana Vuderburg" },
    {title: "Dr. Who went where?", author: "Chris Butterburg"}
  ];
  res.render("posts.ejs", {posts: posts});
});

app.listen(3000, function(){
  console.log("The server is starting!!!");
});
