var express = require("express");
var router = express.Router();

// NEW Route which shows signup Page
router.get("/signup", function(req, res){
  res.render("signup");
});

module.exports = router;
