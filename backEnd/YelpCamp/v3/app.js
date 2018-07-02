var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campgrounds = require("./models/campground.js")
var seedDB = require("./seeds.js");
var Comment = require("./models/comment.js");

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
      res.render("campgrounds/index", {campgrounds: campgroundsUpdated});
    }
  });
});

//NEW: Displays form to create new campground
app.get("/campgrounds/new", function(req, res){
  res.render("campgrounds/new");
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
  var campID = req.params.id;
Campgrounds.findById(campID).populate("comment").exec(function(err, camp){
  if(err){
    console.log("Camp not found!");
  }else{
    res.render("campgrounds/show", {campground: camp});
    }
  });

});

//NEW - COMMENTS Displays form to make a new comment for specific campground, AKA NESTED ROUTES
app.get("/campgrounds/:id/comments/new", function(req, res){
  var campID = req.params.id;
Campgrounds.findById(campID).populate("comment").exec(function(err, camp){
  if(err){
    console.log("Camp not found!");
    res.redirect("/");
  }else{
    res.render("comments/new", {campground: camp});
    }
  });
});

//CREATE-COMMENT Adds new comment to database and redirects to the campground detail page
app.post("/campgrounds/:id/comments", function(req, res){
  Campgrounds.findById(req.params.id, function(err, campground){
    if(err){
      console.log("Camp not found!");
      res.redirect("/campgrounds");
    }else{
      //Create comments
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          console.log(err);
          res.redirect("/camgrpunds");
        }else{
          //Add new comment to campgrounds
          campground.comment.push(comment);
          //Save updates to campgrounds
          campground.save();
          //Redirect to detail campground page
          res.redirect("/campgrounds/" + campground._id)
        }
      });
    }
  });
});

app.listen(3000, function(){
  console.log("YelpCamp Server is Starting!")
});
