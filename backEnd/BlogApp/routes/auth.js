var express = require("express");
var router = express.Router();
var middleware = require("../middleware");
var User = require("../models/user.js");

// NEW Route which shows signup Page
router.get("/signup", function(req, res){
  res.render("signup");
});

//Displays login Page
router.get("/login", function(req, res){
  res.render("login");
});

//CREATE - Creates new user in our database
router.post("/signup", middleware.confirmPassword, function(req, res){
  //Create user in mongo database using method we plugged into user Schema
  User.register({username: req.body.username}, req.body.password, function(err, result){
    if(err){
      console.log(err)
    }else{
      res.redirect("/blogs");
    }
  });
});

module.exports = router;
