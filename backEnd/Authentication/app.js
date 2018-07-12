var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    localStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User = require("./models/user.js")

//APP Setup
var app = express();
app.use(require("express-session")({
  //This secret is used to encode and decode the sessions. Resave should only be set to true if there is an expiration date set on your session
  secret: "Rusty is the best and cutest dog in the world",
  resave: false,
  saveUninitialized: false
}));

//Setup express to use passport, initialize is required, session is reccommended if app using perssistant login sessiosn
app.use(passport.initialize());
app.use(passport.session());
//We do not have to write our own methods to encode our session ID info and decode it because we are getting it from passportLocalMongoose we pluged into user shcema
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//Telling passport that for the local strategy, use that version of user.authenticate
passport.use(new localStrategy(User.authenticate()));

//Set default file extension to use
app.set("view engine", "ejs");

//Connect to mongo database
mongoose.connect("mongodb://localhost/auth_demo_app");

//parses url encoded data, needed for forms
app.use(bodyParser.urlencoded({extended: true}));

//====================================
//ROUTES
//====================================
app.get("/", function(req, res){
  res.render("index");
});

//Show page that requires Authentication
app.get("/secret", isLoggedIn,function(req, res){
  res.render("secret");
});

//AUTHENTICATION ROUTES
//Show sign up form
app.get("/register", function(req, res){
  res.render("register");
});
//Store credentials from sign up page in database
app.post("/register", function(req, res){
  // console.log(req.body.username);
  // console.log(req.body.password);
  User.register(new User({username: req.body.username}), req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.render("register");
    }else{
      //Logs user in, takes care of session, will run serializeUser method
      passport.authenticate("local")(req, res, function(){
        res.redirect("/secret");
      });
    }
  })
});

//LOGIN ROUTES
//Shows login page for user
app.get("/login", function(reg, res){
  res.render("login");
});
//Check users credentials using authenticate function (used here as MIDDLEWARE) before we reach end of route signified by our callback function
app.post("/login", passport.authenticate("local", {
  successRedirect: "/secret",
  failureRedirect:"/login"
}), function(req, res){
});

//LOGOUT ROUTE
app.get("/logout", function(req, res){
  //All user data is erased from this session by passport?
  req.logout();
  res.redirect("/");
});

//Function which checks if user is logged in. This is MIDDLEWARE!!!
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }else{
    res.redirect("/login");
  }
}

app.listen(3000, function(){
  console.log("Authentication server is starting!");
});
