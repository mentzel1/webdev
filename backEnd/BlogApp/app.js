//IMPORT NPM PACKAGES
//===============================================
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");

//APPLICATION SETUP
//=================================================
//Override with POST having ?_method=put
app.use(methodOverride("_method"));
//Tell express to use files in public folder
app.use(express.static("public"));
//Allows extraction of data from forms
app.use(bodyParser.urlencoded({extended: true}));
//Mount sanitizer to remove scripts from html input (prevent html injection)
app.use(expressSanitizer());
//Do not have to add ejs file extension
app.set("view engine", "ejs");
//Connect to mongoDB database for BlogApp
mongoose.connect('mongodb://localhost/blog_app');

//Create blogApp Schema (Define object blueprint)
const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  date: {type: Date, default: Date.now}
});
//Converts our bueprint into a "Model" we can work with (Create object constructor from schema definition).
var Blog = mongoose.model("Blog", blogSchema);

//ROUTES
//================================================
//"INDEX" displays a list of all blogs
app.get("/", function(req, res){
  res.redirect("/blogs");
});

app.get("/blogs", function(req, res){
  Blog.find({}, function(err, blogs){
    if(err){
      console.log("CANNOT FIND BLOGS!");
    }else{
      res.render("index", {blogs: blogs});
    }
  });
});
//"NEW" displays form to create new blog
app.get("/blogs/new", function(req, res){
  res.render("new");
});
//"CREATE" adds new blog post to database
app.post("/blogs", function(req, res){
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
app.get("/blogs/:id", function(req, res){
  //Get specific blog through ID
  Blog.findById(req.params.id, function(err, blog){
    if(err){
      res.redirect("blogs");
    }else{
      res.render("show", {blog: blog});
    }
  });
});

//"EDIT" route shows edit form for one blogs
app.get("/blogs/:id/edit", function(req, res){
  Blog.findById(req.params.id, function(err, foundBlog){
    if(err){
      res.redirect("/blogs");
    }else{
      res.render("edit", {blog: foundBlog});
    }
  });
});

//"UPDATE" route updates a particular blog, then redirects to blog Page
app.put("/blogs/:id", function(req, res){
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
app.delete("/blogs/:id", function(req, res){
  Blog.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/blogs");
    }else{
      res.redirect("/blogs");
    }
  });
})

//Start node server
app.listen(3000, function(){
  console.log("The BlogApp Server has started!");
});
