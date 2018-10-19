var express = require("express");
var router = express.Router();
var middleware = require("../middleware");

// NEW Route which shows signup Page
router.get("/signup", function(req, res){
  res.render("signup");
});

//CREATE - Creates new user in our database
router.post("/signup", middleware.confirmPassword, function(req, res){
  res.send("Path works!");
});

module.exports = router;
