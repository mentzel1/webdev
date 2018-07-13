
//============================================================================
//                         CAMPGROUND ROUTES
//============================================================================

var express = require("express");
var router = express.Router();
var Campgrounds = require("../models/campground.js");
var User = require("../models/user.js")

//Main page
router.get("/", function(req, res){
  res.render("landing");
});

//INDEX: Displays a list of all campgrounds
router.get("/campgrounds", function(req, res){
  Campgrounds.find({}, function(err, campgroundsUpdated){
    if(err){
      console.log("No Campgrounds found. ERROR!");
      console.log(err);
    }else{
      res.render("campgrounds/index", {campgrounds: campgroundsUpdated, user: req.user});
    }
  });
});

//NEW: Displays form to create new campground
router.get("/campgrounds/new", isLoggedIn, function(req, res){
  res.render("campgrounds/new");
});

//CREATE: Creates new camgrounds, adds to our database and redirects to display camp listing
router.post("/campgrounds", isLoggedIn, function(req, res){
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
router.get("/campgrounds/:id", function(req, res){
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

//============================================
//      FUNCTIONS
//============================================
//Function proceeds to next function call if true, else goes to login page
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }else {
      res.redirect("/login");
    }
}

module.exports = router;
