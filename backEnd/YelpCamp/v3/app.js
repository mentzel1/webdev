var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campgrounds = require("./models/campground.js")
var seedDB = require("./seeds.js");

seedDB();

//Connect to mongoDB database
mongoose.connect("mongodb://localhost/yelpcamp");

//parses url encoded data, needed for forms
app.use(bodyParser.urlencoded({extended: true}));

//Do not require ejs extension in file names
app.set("view engine", "ejs");

//Main page
app.get("/", function(req, res){
  res.render("landing");
});

//INDEX: Displays a list of all campgrounds
app.get("/campgrounds", function(req, res){
  Campgrounds.find({}, function(err, campgroundsUpdated){
    if(err){
      console.log("No Campgrounds found. ERROR!");
      console.log(err);
    }else{
      res.render("index", {campgrounds: campgroundsUpdated});
    }
  });
});

//NEW: Displays form to create new campground
app.get("/campgrounds/new", function(req, res){
  res.render("new");
});

//CREATE: Creates new camgrounds, adds to our database and redirects to display camp listing
app.post("/campgrounds", function(req, res){
  //Store new campground information
  var campName = req.body.name;
  var campUrl = req.body.img;
  var campDes = req.body.description;
  var newCamp = {
    name: campName,
    img: campUrl,
    description: campDes
  };
  //Add campground infor to our database
  Campgrounds.create(newCamp, function(err, campground){
    if(err){
      console.log("Error adding newly created campground!");
      console.log(err);
    }else{
      //redirect is get by default
      res.redirect("/campgrounds");
    }
  });
});

//SHOW: Displays infor about one campground
app.get("/campgrounds/:id", function(req, res){
  //lookup campground with this id to display its info
  // console.log(req);
  var campID = req.params.id;
Campgrounds.findById(campID).populate("comment").exec(function(err, camp){
  if(err){
    console.log("Camp not found!");
  }else{
    res.render("show", {campground: camp});
    }
  });

});

app.listen(3000, function(){
  console.log("YelpCamp Server is Starting!")
});
