var Blog = require("../models/blogpost.js");
//Empty object variable we are defining methods for
var middleware = {};


middleware.confirmPassword = function(req, res, next){
  if(req.body.password != req.body.passwordConfirm){
    console.log("Bad password");
    res.render("signup", {badPass: true});
  }else{
    next();
  }
};

//Checks if the current user is logged on. If not, redirects to login page. If not signed up then redirects to login page
middleware.loggedOn = function(req, res, next){
  if(req.user){
    next();
  }else{
    //Redirect to login page
    res.redirect("/login");
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
        res.send("ACCESS DENIED! Go Back!");
        // res.redirect("/blogs");
      }
    }
  });
};

//Checks if the current logged on user is the owener of a comment

module.exports = middleware;
