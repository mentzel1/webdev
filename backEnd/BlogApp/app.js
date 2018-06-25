var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//APPLICATION SETUP

//Tell express to use files in public folder
app.use(express.static("public"));
//Allows extraction of data from forms
app.use(bodyParser.urlencoded({extended: true}));
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

//Populate blog_app database with dummy database
// Blog.create({
//   title: "Basil Goat Cheese Pie",
//   image: "https://tmbidigitalassetsazure.blob.core.windows.net/secure/RMS/attachments/37/1200x1200/exps193273_TH163621C02_11_1b.jpg",
//   body: "Preheat oven to 375°. On a floured sheet of parchment paper, roll pastry into a 10-in. circle. Transfer to a baking sheet. Mix blueberries, 2 tablespoons sugar, cornstarch and basil. Spoon blueberry mixture over pastry to within 2 in. of edge. Fold pastry edge over filling, pleating as you go and leaving the center uncovered. Whisk egg and water; brush over pastry. Sprinkle with remaining sugar. Bake 30 minutes. Sprinkle with goat cheese; bake until crust is golden and filling bubbly, about 10 minutes. Transfer to a wire rack to cool. Top with torn basil leaves before serving. Pastry for single-crust pie (9 inches): Combine 1-1/4 cups all-purpose flour and 1/4 tsp. salt; cut in 1/2 cup cold butter until crumbly. Gradually add 3-5 Tbsp. ice water, tossing with a fork until dough holds together when pressed. Wrap in plastic wrap and refrigerate 1 hour."
// });

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
  Blog.create(req.body.blog, function(err, newBlog){
    if(err){
      res.redirect("/blogs/new");
    }else{
      res.redirect("blogs");
    }
  });
});

//Start node server
app.listen(3000, function(){
  console.log("The BlogApp Server has started!");
});
