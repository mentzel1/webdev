//==========================================================================
//                           COMMENT ROUTES
//==========================================================================
var express = require("express");
var router = express.Router();
var Campgrounds = require("../models/campground.js");
var Comment = require("../models/comment");

//NEW - COMMENTS Displays form to make a new comment for specific campground, AKA NESTED ROUTES
router.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
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
router.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
  Campgrounds.findById(req.params.id, function(err, campground){
    if(err){
      console.log("Camp not found!");
      res.redirect("/campgrounds");
    }else{
      //Create comments
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          console.log(err);
          res.redirect("/campgrounds");
        }else{
          //Add user info to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          //Save comment to the database first (even thou create does this, need to do it now so that it is properly added to the campground)
          comment.save();
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
