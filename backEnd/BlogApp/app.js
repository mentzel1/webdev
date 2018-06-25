var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//APPLICATION SETUP

//Allows extraction of data from forms
app.use(bodyParser.urlencoded({extended: true}));
//Do not have to add ejs file extension
app.set("view engine", "ejs");
//Connect to mongoDB database for BlogApp
mongoose.connect('mongodb://localhost/blog_app');

//Create blogApp Schema (Define object blueprint)
const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  date: {type: String, default: Date.now}
});
//Converts our bueprint into a "Model" we can work with (Create object constructor from schema definition).
var Blog = mongoose.model("Blog", blogSchema);


//RESTFUL ROUTES
app.get("/", function(req, res){
  res.render("index");
});

//Start node server
app.listen(3000, function(){
  console.log("The BlogApp Server has started!");
});
