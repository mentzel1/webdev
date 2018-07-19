//==========================================================================
//                           COMMENT ROUTES
//==========================================================================
var express = require("express");
var router = express.Router();
var Campgrounds = require("../models/campground.js");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//NEW - COMMENTS Displays form to make a new comment for specific campground, AKA NESTED ROUTES
router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function(req, res){
  var campID = req.params.id;
Campgrounds.findById(campID).populate("comment").exec(function(err, camp){
  //If there is error or no camp is found
  if(err || !camp){
    console.log("Camp not found!");
    req.flash("error", "Campground not found!");
    res.redirect("/");
  }else{
    res.render("comments/new", {campground: camp});
    }
  });
});

//CREATE-COMMENT Adds new comment to database and redirects to the campground detail page
router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function(req, res){
  Campgrounds.findById(req.params.id, function(err, campground){
    //Checks if campground exists
    if(err || !campground){
      console.log("Camp not found!");
      req.flash("error", "Campground not found!");
      res.redirect("/campgrounds");
    }else{
      //Create comments
      Comment.create(req.body.comment, function(err, comment){
        if(err || !comment){
          console.log(err);
          req.flash("error", "Campground not found!");
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
          req.flash("success", "Comment successfully added!");
          res.redirect("/campgrounds/" + campground._id)
        }
      });
    }
  });
});

//EDIT: Shows edit form for commentsRouter
router.get("/campgrounds/:id/comment/:id/edit", middleware.isOwnerOfComment, function(req, res){
  //Need Campground ID so we get url and split it by "/"
  var url = req.url;
  var array = url.split("/", 3);
  var campID = array[2];
  //Lookup comment
  Comment.findById(req.params.id, function(err, comment){
    //Check if comment exists
    if(err || !comment){
      console.log(err);
      req.flash("error", "Comment not found!");
      res.redirect("/campgrounds/" + req.params.id);
    }else{
      res.render("comments/edit", {comment: comment, campID: campID});
    }
  });
});

//UPDATE: Updates the comment information in our database with changes
router.put("/campgrounds/:id/comment/:id", middleware.isOwnerOfComment, function(req, res){
  var url = req.url;
  var array = url.split("/comment");
  var newurl = array[0];
  Comment.findByIdAndUpdate(req.params.id, req.body.comment, function(err, comment){
    if(err || !comment){
      console.log(err);
      req.flash("error", "Comment not found!");
      res.redirect("/campgrounds");
    }else{
      req.flash("success", "Comment successfully updated!");
      res.redirect(newurl);
    }
  });
});

//DELETE: Deletes comment from our database
router.delete("/campgrounds/:id/comment/:id", middleware.isOwnerOfComment, function(req, res){
  var url = req.url;
  var array = url.split("/comment");
  var newurl = array[0];
  Comment.findByIdAndRemove(req.params.id, function(err, comment){
    if(err || !comment){
      console.log(err);
        req.flash("error", "Comment not found!");
      res.redirect(newurl);
    }else{
      req.flash("success", "Comment successfully deleted!");
      res.redirect(newurl);
    }
  });
});

module.exports = router;
