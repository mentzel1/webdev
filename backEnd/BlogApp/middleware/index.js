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

module.exports = middleware;
