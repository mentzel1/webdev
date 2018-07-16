
//============================================================================
//                         CAMPGROUND ROUTES
//============================================================================

var express = require("express");
var router = express.Router();
var Campgrounds = require("../models/campground.js");
var User = require("../models/user.js")
var methodOverride = require("method-override");

router.use(methodOverride("_method"));

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
    description: campDes,
    //User has to be logged on, therefore req.user exists here
    author:{
      id: req.user._id,
      username: req.user.username
    }
  };

  //Add campground into to our database
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

//EDIT: Shows edit form for one campground.
router.get("/campgrounds/:id/edit", isLoggedIn, function(req, res){
  //Lookup campground and send it to edit page
  Campgrounds.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
    }else{
      res.render("campgrounds/edit", {campground: campground});
    }
  });
});

//UPDATE: updates object in our database
router.put("/campgrounds/:id", function(req, res){
  //Find campground in database
  Campgrounds.findByIdAndUpdate(req.params.id, {name: req.body.name, img: req.body.img, description: req.body.description}, function(err, campground){
    if(err){
      console.log(err);
    }else{
      res.redirect("/campgrounds/"+req.params.id);
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
