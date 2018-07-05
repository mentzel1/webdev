var express = require("express"),
    mongoose = require("mongoose"),
    bodyparser = require("body-parser"),
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
passport.serializeUser(User.serializeUser()):
passpoer.deserializeUser(User.deserializeUser());

//Set default file extension to use
app.set("view engine", "ejs");

//Connect to mongo database
mongoose.connect("mongodb://localhost/auth_demo_app");

app.get("/", function(req, res){
  res.render("index");
});

app.get("/secret", function(req, res){
  res.render("secret");
});

app.listen(3000, function(){
  console.log("Authentication server is starting!");
});
