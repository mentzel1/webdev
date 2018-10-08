var express = require("express");
var router = express.Router();
var Blog = require("../models/blogpost.js");
var Comment = require("../models/comment.js");

//"INDEX" displays a list of all blogs
router.get("/", function(req, res){
  res.redirect("/blogs");
});

//"INDEX" displays a list of all blogs
router.get("/blogs", function(req, res){
  Blog.find({}, function(err, blogs){
    if(err){
      console.log("CANNOT FIND BLOGS!");
    }else{
      res.render("index", {blogs: blogs});
    }
  });
});

//"NEW" displays form to create new blogpost
router.get("/blogs/new", function(req, res){
  res.render("blogpost/new");
});

//"CREATE" adds new blog post to database
router.post("/blogs", function(req, res){
  //Replace an HTTP posted body property with the sanitized String
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.create(req.body.blog, function(err, newBlog){
    if(err){
      res.redirect("/blogs/new");
    }else{
      res.redirect("blogs");
    }
  });
});

//"SHOW" route shows details about a specific blogs
router.get("/blogs/:id", function(req, res){
  //Get specific blog through ID
  Blog.findById(req.params.id).populate('comments').exec(function(err, blog){
    if(err){
      redirect("back");
    }else{
      res.render("blogpost/show", {blog: blog});
    }
  });
});

//"EDIT" route shows edit form for one blogs
router.get("/blogs/:id/edit", function(req, res){
  Blog.findById(req.params.id, function(err, foundBlog){
    if(err){
      res.redirect("/blogs");
    }else{
      res.render("blogpost/edit", {blog: foundBlog});
    }
  });
});

//"UPDATE" route updates a particular blog, then redirects to blog Page
router.put("/blogs/:id", function(req, res){
  //Replace an HTTP posted body property with the sanitized String
  req.body.blog.body = req.sanitize(req.body.blog.body);
  //Update databse with new update blog
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
    if(err){
      res.redirect("/blogs");
    }else{
      res.redirect("/blogs/"+req.params.id);
    }
  });
});

//"DELETE" route removes a particular blog, then redirects
router.delete("/blogs/:id", function(req, res){
  Blog.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/blogs");
    }else{
      res.redirect("/blogs");
    }
  });
})

module.exports = router;
