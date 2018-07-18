var Campgrounds = require("../models/campground");
var Comment = require("../models/comment");
var middleware = {};

middleware.isOwnerOfCamp = function (req, res, next){
  //Check if user is logged inspect
  if(req.isAuthenticated()){
    //Lookup campgrounds
    Campgrounds.findById(req.params.id, function(err, campground){
      if(err){
        console.log(err);
        res.redirect("/campgrounds");
      }else{
        //Check if user is owner of campground post
        if(req.user._id.equals(campground.author.id)){
          //if owner, continue
          next();
        }else{
          //Non ownders redirect back to campground
          res.redirect("/campgrounds/" + req.params.id);
        }
      }
    });
  }else {
    //If not logged in, direct to login page
    res.redirect("/login");
  }
};

middleware.isOwnerOfComment = function (req, res, next){
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

middleware.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
      return next();
    }else {
      res.redirect("/login");
    }
}

module.exports = middleware;
