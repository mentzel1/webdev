//============================================================================
//                          AUTHENTICATION ROUTES
//============================================================================
var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user.js")

//Show registration form
router.get("/register", function(req, res){
  res.render("register");
});

//Store new user information in our database
router.post("/register", function(req, res){
  //Create user
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err);
      req.flash("error", err.message);
      return res.render("register");
    }else{
      //Log user in, then direct to main campgrounds page
      passport.authenticate("local")(req, res, function(){
        req.flash("success", "Successfully signed up!");
        res.redirect("/campgrounds");
      });
    }
  });
});

//Show login form
router.get("/login", function(req, res){
  res.render("login");
});

//Login logistics, authenticate before response sent
router.post("/login", passport.authenticate("local", {failureRedirect: "/login"}), function(req, res){
  // console.log(req.user);
  req.flash("success", "Successfully logged in!");
  res.redirect("/campgrounds");
});

//logout
router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "Successfully logged out!");
  res.redirect("/campgrounds");
});

module.exports = router;
