var express = require("express");
var app = express();

app.get("/", function(req, res){
  res.send("Hi there, welcome to my assighnment!");
});

app.get("/speak/:animal", function(req, res){
  var animal = req.params.animal.toLowerCase();
  var sounds = {
    pig: "Oink",
    cow: "Moo",
    dog: "Woof Woof!",
    fish: "..."
  };
  console.log(sounds[animal]);
  if(sounds[animal] == undefined){
    res.send("Sorry, page not found....What are you doin gwith your life?");
  }else{
    res.send("The " + animal + " says '" + sounds[animal] + "'");
  }
});

app.get("/repeat/:word/:val", function(req, res){
  var num = Number(req.params.val);
  var str = req.params.word;
  var strFinal = " ";

  while(num > 0){
    strFinal += " " + str + " ";
    num--;
  }
  res.send(strFinal);
});

app.get("*", function(req, res){
  res.send("Sorry, page not found....What are you doin gwith your life?");
});

app.listen(3000, function(){
  console.log("Server Starting!");
});
