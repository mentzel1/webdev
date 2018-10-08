//IMPORT NPM PACKAGES
//===============================================
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");
var Blog = require("./models/blogpost.js");
var Comment = require("./models/comment.js");

//import routes
var blogpostRouter = require("./routes/blogpost.js");
var commentRouter = require("./routes/comment.js");
var authRouter = require("./routes/auth.js");

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

// ROUTES
app.use(commentRouter);
app.use(blogpostRouter);
app.use(authRouter);


//Start node server
app.listen(3000, function(){
  console.log("The BlogApp Server has started!");
});
