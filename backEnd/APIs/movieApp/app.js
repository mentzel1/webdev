var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");

//Tell express to use body parser. Required for input forms
app.use(bodyParser.urlencoded({ extended: true }))
//So you dont have to type in file extensions ejs
app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("home");
});

app.post("/results", function(req, res){
  console.log("request val: " + req.body.data);
  var movie = req.body.data;
  var url = "http://www.omdbapi.com/?s=" + movie + "&plot=full&apikey=thewdb";

  request(url, function(error, response, body){
    if(!error && response.statusCode == 200){
      //Convert the json string to an object using built in parse function
      var movieData = JSON.parse(body);
      console.log(typeof movieData);
      res.render("results", {data: movieData});
    }
  });
});

app.listen(3000, function(){
  console.log("Movie App is starting!");
});
