var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campgrounds = require("./models/campground.js")
var seedDB = require("./seeds.js");
var Comment = require("./models/comment.js");
var User = require("./models/user.js");
var passport = require("passport");
var localStrategy = require("passport-local");
var session = require("express-session");
var flash = require("connect-flash-plus");

var authRouter = require("./routes/auth.js");
var commentsRouter = require("./routes/comments.js");
var campgroundRouter = require("./routes/campgrounds.js");

//Fill database with temp data to test app
// seedDB();

//Connect to mongoDB database
mongoose.connect("mongodb://localhost/yelpcamp");

//parses url encoded data, needed for forms
app.use(bodyParser.urlencoded({extended: true}));

//Tell node to use public directory
app.use(express.static(__dirname + "/public"));

//Do not require ejs extension in file names
app.set("view engine", "ejs");

//===PASSPORT CONFIGURATION=======
//Tell express to use session
app.use(session({
  secret: "Kitty is a sweet, cute, evil, little cat that I love!",
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
//To use passport in express you need this
app.use(passport.initialize());
//For apps using persistant login sessions this is reccommended but not required
app.use(passport.session());
//Tell passport to use your user models authenticate method from localStrategy
passport.use(new localStrategy(User.authenticate()));
//Tell passport to use your user models serialize and desearialize methods for session support. When starting session this will serialize the user ID, and when ending session, finding the user by ID and desearializing.
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//Make variables user, error, success avaliable to all VIEWS under the "views" folder (so we do not have to add it manually to each route in order to access). We need to check if these variables exist and if length greater than 0
app.use(function(req, res, next){
  res.locals.user = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

//================================
//             ROUTES
//================================
//Include ROUTES (why do these have to be at the end??beacuse the "user listed above is not avaliable yet, so need routes after this")
app.use(authRouter);
app.use(campgroundRouter);
app.use(commentsRouter);

app.listen(3000, function(){
  console.log("YelpCamp Server is Starting!")
});
