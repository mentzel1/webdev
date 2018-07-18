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

//EDIT: Shows edit form for commentsRouter
router.get("/campgrounds/:id/comment/:id/edit", isOwnerOfComment, function(req, res){
  //Need Campground ID so we get url and split it by "/"
  var url = req.url;
  var array = url.split("/", 3);
  var campID = array[2];
  //Lookup comment
  Comment.findById(req.params.id, function(err, comment){
    if(err){
      console.log(err);
      res.redirect("/campgrounds/" + req.params.id);
    }else{
      res.render("comments/edit", {comment: comment, campID: campID});
    }
  });
});

//UPDATE: Updates the comment information in our database with changes
router.put("/campgrounds/:id/comment/:id", isOwnerOfComment, function(req, res){
  var url = req.url;
  var array = url.split("/comment");
  var newurl = array[0];
  Comment.findByIdAndUpdate(req.params.id, req.body.comment, function(err, comment){
    if(err){
      console.log(err);
    }else{
      res.redirect(newurl);
    }
  });
});

//DELETE: Deletes comment from our database
router.delete("/campgrounds/:id/comment/:id", isOwnerOfComment, function(req, res){
  var url = req.url;
  var array = url.split("/comment");
  var newurl = array[0];
  Comment.findByIdAndRemove(req.params.id, function(err, comment){
    if(err){
      console.log(err);
      res.redirect(newurl);
    }else{
      res.redirect(newurl);
    }
  });
});

//============================================
//      MIDDLEWARE
//============================================
//Function checks if user is logged in, then checks if user is owner of campground (Assumes you are on campground page). If they are, then edit/delete buttons visible and are able to go to modify campground. Otherwise the buttons are hidden
function isOwnerOfComment(req, res, next){
  //Check if user is logged inspect
  if(req.isAuthenticated()){
    //Lookup campgrounds
    Comment.findById(req.params.id, function(err, comment){
      if(err){
        console.log(err);
        res.redirect("/campgrounds");
      }else{
        //Check if user is owner of campground post
        if(req.user._id.equals(comment.author.id)){
          //if owner, continue
          next();
        }else{
          //Get orginal url and slice it to go back to specific camp
          var url = req.url;
          var array = url.split("/comment");
          var newurl = array[0];
          //Non ownders redirect back to campground
          res.redirect(newurl);
        }
      }
    });
  }else {
    //If not logged in, direct to login page
    res.redirect("/login");
  }
};

//Function proceeds to next function call if true, else goes to login page
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }else {
      res.redirect("/login");
    }
}

module.exports = router;
