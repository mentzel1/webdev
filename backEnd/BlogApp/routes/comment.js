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
          //Save comment to the database first (even thou create does this, need to do it now so that it is properly added to the blog. Comment wont be saved till the end of this function, but we need it to be saved before the finished execution of this function)
          newComment.save();
          //Add new comment to blog
          blog.comments.push(newComment._id);
          //Save updates to blog
          blog.save();
          res.redirect("/blogs/" + req.params.id);
        }
      });
    }
  });
});

module.exports = router;
