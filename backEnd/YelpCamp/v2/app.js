var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//Connect to mongoDB database
mongoose.connect("mongodb://localhost/yelpcamp");

//Create campground schema (aka template)
var campgroundSchema = new mongoose.Schema({
  name: String,
  img: String,
  description: String
});

//Create campground model (aka create DB collection of type campgroundSchema)
var Campgrounds = mongoose.model("Campground", campgroundSchema);

//Initialize database with this initial data
Campgrounds.create(
  {
    name: "Smokey Mountains", img:"https://www.rei.com/adventures/assets/adventures/images/trip/core/northamerica/smw_hero",
    description: "Smokey"
  },{
    name: "Estes Park",
    img: "https://43mbhp3aft5g3uc0tuhsk4a8-wpengine.netdna-ssl.com/wp-content/uploads/2016/03/00-Sky-Pond-in-Rocky-Mountain-National-Park-bratman-creative-commons.jpg",
    description: "Estes"
  }, {
    name: "Yosemite",
    img: "https://e794d552b4c822b8205c-27b9cc3fb8731a4a7598943b8a8a6a91.ssl.cf1.rackcdn.com/15/1/large.jpg",
    description: "Yo Yo"
  }, function(err, c1, c2, c3){
  if(err){
    console.log("Error with intializing database!");
    console.log(err);
  }else{
    console.log(c1);
    console.log(c2);
    console.log(c3);
  }
});

//parses url encoded data, needed for forms
app.use(bodyParser.urlencoded({extended: true}));

//Do not require ejs extension in file names
app.set("view engine", "ejs");

//Main page
app.get("/", function(req, res){
  res.render("landing");
});

//Displays a list of all campgrounds
app.get("/index", function(req, res){
  Campgrounds.find({}, function(err, campgroundsUpdated){
    if(err){
      console.log("No Campgrounds found. ERROR!");
      console.log(err);
    }else{
      res.render("index", {campgrounds: campgroundsUpdated});
    }
  });
});

//Shows form to create new campground
app.get("/index/new", function(req, res){
  res.render("new");
});

//Creates new camgrounds and redirects to display camp listing
app.post("/index", function(req, res){
  //Store new campground information
  var campName = req.body.name;
  var campUrl = req.body.img;
  var campDes = req.body.description;
  var newCamp = {
    name: campName,
    img: campUrl,
    description: campDes
  };
  //Add campground infor to our database
  Campgrounds.create(newCamp, function(err, campground){
    if(err){
      console.log("Error adding newly created campground!");
      console.log(err);
    }else{
      //redirect is get by default
      res.redirect("/index");
    }
  });
});

app.get("/index/:id", function(req, res){
  //lookup campground with this id to display its info
  // console.log(req);
  var campID = req.params.id;
Campgrounds.findById(campID, function(err, camp){
  if(err){
    console.log("Camp not found!");
  }else{
    console.log(camp.description);
    res.render("show", {campground: camp});
    }
  });

});

app.listen(3000, function(){
  console.log("YelpCamp Server is Starting!")
});
