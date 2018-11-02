var express = require("express");
var router = express.Router();
var middleware = require("../middleware");
var User = require("../models/user.js");
var passport = require("passport");

// NEW Route which shows signup Page
router.get("/signup", function(req, res){
  res.render("signup");
});

//CREATE - Creates new user in our database
router.post("/signup", middleware.confirmPassword, function(req, res){
  //Create user in mongo database using method we plugged into user Schema (also checks if username is unique, if not throws error)
  User.register({username: req.body.username}, req.body.password, function(err, user){
    if(err){
      console.log(err)
    }else{
      //Store First and last Name
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      console.log(req.body.lastName);
      //save changes made (didnt use create function which autosaves for us)
      user.save();

      //Log user in upon registering
      req.login(user, function(err){
        if(err){
          console.log(err);
          res.redirect("back");
        }else{
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
router.post("/login",
passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/blogs');
  });


//Log user out of the APPLICATION and redirect to main page
router.get("/logout", function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
