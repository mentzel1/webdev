var express = require("express");
var router = express.Router();
var middleware = require("../middleware");
var User = require("../models/user.js");
var passport = require("passport");
var flash = require("connect-flash-plus");

// NEW Route which shows signup Page
router.get("/signup", function(req, res){
  res.render("signup");
});

//CREATE - Creates new user in our database
router.post("/signup", middleware.confirmPassword, function(req, res){
  //Create user in mongo database using method we plugged into user Schema (also checks if username is unique, if not throws error)
  User.register({username: req.body.username}, req.body.password, function(err, user){
    if(err){
      console.log(err);
      req.flash("error", err.message);
      res.redirect("/signup");
    }else{
      //Store First and last Name
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      //save changes made (didnt use create function which autosaves for us)
      user.save();

      //Log user in upon registering
      req.login(user, function(err){
        if(err){
          console.log(err);
          res.redirect("back");
        }else{
          req.flash("success", "Successfully registered!");
          res.redirect("/blogs");
        }
      });
    }
  });
});

//Displays login Page
router.get("/login", function(req, res){
  res.render("login");
});

//Logs the user in using passport authentication middleware method
router.post("/login", passport.authenticate("local", {failureRedirect: "/login"}), function(req, res){
  req.flash("success", "Successfully logged in!");
  // console.log(req.user);
  res.redirect("/blogs");
});

//Log user out of the APPLICATION and redirect to main page
router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "Successfully logged out!");
  res.redirect("/login");
});

module.exports = router;
