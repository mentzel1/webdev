var Campgrounds = require("../models/campground");
var Comment = require("../models/comment");
var middleware = {};

middleware.isOwnerOfCamp = function (req, res, next){
  //Check if user is logged inspect
  if(req.isAuthenticated()){
    //Lookup campgrounds
    Campgrounds.findById(req.params.id, function(err, campground){
      if(err || !campground){
        console.log(err);
        req.flash("error", "Campground not found!");
        res.redirect("/campgrounds");
      }else{
        //Check if user is owner of campground post
        if(req.user._id.equals(campground.author.id)){
          //if owner, continue
          next();
        }else{
          req.flash("error", "You are not authorized to edit this camground!");
          //Non ownders redirect back to campground
          res.redirect("/campgrounds/" + req.params.id);
        }
      }
    });
  }else {
    req.flash("error", "Login is required!");
    //If not logged in, direct to login page
    res.redirect("/login");
  }
};

middleware.isOwnerOfComment = function (req, res, next){
  //Check if user is logged inspect
  if(req.isAuthenticated()){
    //Lookup campgrounds
    Comment.findById(req.params.id, function(err, comment){
      if(err || !comment){
        console.log(err);
        req.flash("error", "Comment not found!");
        res.redirect("/campgrounds");
      }else{
        //Check if user is owner of campground post
        if(req.user._id.equals(comment.author.id)){
          //if owner, continue
          next();
        }else{
          req.flash("error", "You are not authorized to edit this comment!");
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
    req.flash("error", "Login is required!");
    //If not logged in, direct to login page
    res.redirect("/login");
  }
};

middleware.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
      return next();
    }else {
      req.flash("error", "Login is required!");
      res.redirect("/login");
    }
}

module.exports = middleware;
