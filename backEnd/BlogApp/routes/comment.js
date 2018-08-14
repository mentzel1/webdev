var express = require("express");
var router = express.Router();

router.get("/blogs/:id/comment/new", function(req, res){
  res.render("comment/new");
});

module.exports = router;
