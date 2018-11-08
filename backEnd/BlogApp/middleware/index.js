var Blog = require("../models/blogpost.js");
var flash = require("connect-flash-plus");
var Comment = require("../models/comment.js");
//Empty object variable we are defining methods for
var middleware = {};


middleware.confirmPassword = function(req, res, next){
  if(req.body.password != req.body.passwordConfirm){
    req.flash("error", "Passwords do not match!");
    res.render("signup", {error: req.flash("error")});
  }else{
    next();
  }
};

//Checks if the current user is logged on. If not, redirects to login page. If not signed up then redirects to login page
middleware.loggedOn = function(req, res, next){
  if(req.user){
    next();
  }else{
    req.flash("error", "Log in is required for blog posting!");
    //Redirect to login page
    res.render("login", {error: req.flash("error")});
  };
};

//Checks if the current logged on user is the owner of the blog
middleware.confirmBlogOwner = function(req, res, next){
  //find blog in database
  Blog.findById(req.params.id, function(err, blog){
    //If blog not found, show err
    if(err){
      console.log(err);
    }else{
      //If logged on user is author of blog, continue
      if(req.user._id.equals(blog.author)){
        next();
        //stay on page and flash error
      }else{
        // res.send("ACCESS DENIED! Go Back!");
        res.redirect("/blogs");
      }
    }
  });
};

//Checks if the current logged on user is the owener of a comment
middleware.confirmCommentOwner = function(req, res, next){
  //find comment in database
  Comment.findById(req.params.id_comment, function(err, comment){
    //If comment not found, show err
    if(err){
      console.log(err);
    }else{
      //If logged on user is author of comment, continue
      if(req.user._id.equals(comment.author._id)){
        next();
        //stay on page and flash error
      }else{
        // res.send("ACCESS DENIED! Go Back!");
        res.redirect("/blogs");
      }
    }
  });
};

module.exports = middleware;
