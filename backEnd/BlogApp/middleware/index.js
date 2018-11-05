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

//Checks if the current logged on user is the owner of a blogpost
middleware.confirmBlogOwner = function(req, res, next){
  //check if user is logged on
};


//Checks if the current logged on user is the owener of a comment

module.exports = middleware;
