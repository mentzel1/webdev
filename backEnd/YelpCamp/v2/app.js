var express = require("express");
var app = express();
var bodyParser = require("body-parser");

//parses url encoded data, needed for forms
app.use(bodyParser.urlencoded({extended: true}));

//Do not require ejs extension in file names
app.set("view engine", "ejs");


var campgrounds = [
  {name: "Smokey Mountains", img:"https://www.rei.com/adventures/assets/adventures/images/trip/core/northamerica/smw_hero"},
  {name: "Estes Park", img: "https://43mbhp3aft5g3uc0tuhsk4a8-wpengine.netdna-ssl.com/wp-content/uploads/2016/03/00-Sky-Pond-in-Rocky-Mountain-National-Park-bratman-creative-commons.jpg"},
  {name: "Yosemite", img: "https://e794d552b4c822b8205c-27b9cc3fb8731a4a7598943b8a8a6a91.ssl.cf1.rackcdn.com/15/1/large.jpg"},
  {name: "Smokey Mountains", img:"https://www.rei.com/adventures/assets/adventures/images/trip/core/northamerica/smw_hero"},
  {name: "Estes Park", img: "https://43mbhp3aft5g3uc0tuhsk4a8-wpengine.netdna-ssl.com/wp-content/uploads/2016/03/00-Sky-Pond-in-Rocky-Mountain-National-Park-bratman-creative-commons.jpg"},
  {name: "Yosemite", img: "https://e794d552b4c822b8205c-27b9cc3fb8731a4a7598943b8a8a6a91.ssl.cf1.rackcdn.com/15/1/large.jpg"}
];

//Main page
app.get("/", function(req, res){
  res.render("landing");
});

//Campground listing Page
app.get("/campgrounds", function(req, res){
  res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new", function(req, res){
  res.render("new");
});

app.post("/campgrounds", function(req, res){
  //Store new campground information
  var campName = req.body.name;
  var campUrl = req.body.img;
  var newCamp = {
    name: campName,
    img: campUrl
  };
  campgrounds.push(newCamp);
  //redirect is get by default
  res.redirect("/campgrounds");
});

app.listen(3000, function(){
  console.log("YelpCamp Server is Starting!")
});
