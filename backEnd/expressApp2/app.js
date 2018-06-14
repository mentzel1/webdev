var express = require("express");
var app = express();

app.get("/", function(req, res){
  res.send("Hi there, welcome to my assighnment!");
});

app.get("/speak/:animal", function(req, res){
  var animal = req.params.animal;
  //console.log(req);

  if(animal == "pig"){
    res.send("The pig says'Oink'");
  }else if( animal == "cow"){
    res.send("The pig says 'Moo'");
  }else if( animal == "dog"){
    res.send("The pig says 'Woof Woof!'");
  }
});

app.listen(3000, function(){
  console.log("Server Starting!");
});
