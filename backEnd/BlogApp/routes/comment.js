var express = require("express");
var router = express.Router();
var Comment = require("../models/comment.js");
var Blog = require("../models/blogpost.js");

//NEW - shows page to create new Comment
router.get("/blogs/:id/comment/new", function(req, res){
  res.render("comment/new", {id: req.params.id});
});

//CREATE - Creats comments for specific blog in our databse
router.post("/blogs/:id/comment", function(req, res){
  //Clean text for potential scripts/html
  req.body.comment.body = req.sanitize(req.body.comment.body);
  //Create comment object
  Comment.create(req.body.comment, function(err, newComment){
    if(err){
      res.redirect("back");
    }else{
      //Lookup current blog we are making comment on by ID
      Blog.findById(req.params.id, function(err, blog){
        if(err){
          res.redirect("back");
        }else{
          //Add the commmment id to the blog in our database
          console.log("Comment id:");
          console.log(newComment._id);
          console.log("blog comments:");
          console.log(blog.comments);
          blog.comments.push(newComment._id);
          res.redirect("/blogs/" + req.params.id);
        }
      });
    }
  });
  //res.send("YAYA Comment route works!");
});

module.exports = router;
