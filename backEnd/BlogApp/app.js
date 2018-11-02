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
//Required for user authentication
var passport = require("passport");
var expressSession = require("express-session");
var passportSession = require("passport-session");
var passportLocal = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
//Required to store express session information in mongodb databse
var mongoStore = require("connect-mongo")(expressSession);
var User = require("./models/user.js");

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
mongoose.connect('mongodb://blogAppUser:Bl0g_App_Pazzw0rd@localhost/blog_app?authSource=blog_app');
//Need express session for passport to piggy back off of it (also configure it)
app.use(expressSession({
  //Only saves session information if the user logs in (not only visit website)
  saveUninitialized: false,
  //Double check if needed to be true depending on session store
  resave: false,
  //Used to sign the session Cookie ID
  secret: "Kitty is a cute little bugger!",
  //Save to monogDB store using new connection to Mongo databse
  // store: new mongoStore({url: "mongodb://localhost/sessions"})
   store: new mongoStore({ mongooseConnection: mongoose.connection })
}));
//Configure passport, reqired in express app
app.use(passport.initialize());
//Need this middleware for persistant login sesssions (login info stored always)
app.use(passport.session());
//Configure passport to use local strategy (username/password stored on server) and passport-local-mongoose automatically creates local strategy for us
passport.use(User.createStrategy());
//Set serializer and deserializer for sessions
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//When we set app.use without a path, this middleware is executed on every route of our app. We declare local variables so when passport populates req.user so it is available only to the view(s) rendered during that request / response cycle (if any). Thus only avlaiable when user logged on, and it is avaliable anywehre in our app. Otherwise we would have to pass it as an object to each one of our routes manually.
app.use(function(req, res, next){
  res.locals.user = req.user;
  next();
});

//================================
//             ROUTES
//================================
//Include ROUTES (why do these have to be at the end??beacuse the "user listed above is not avaliable yet, so need routes after this")
app.use(commentRouter);
app.use(blogpostRouter);
app.use(authRouter);


//Start node server
app.listen(3000, function(){
  console.log("The BlogApp Server has started!");
});
