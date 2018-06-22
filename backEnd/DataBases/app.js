//includes mongoose package
const mongoose = require("mongoose");

//connects to our database called cats_app
mongoose.connect("mongodb://localhost/cats_app");

//Defining model through "Schema" for a cats_app (capitalize by convention)
const CatSchema = new mongoose.Schema({
  name: String,
  color: String,
  age: Number,
});

//Access your collection "Cat" defined by bluprint model CatSchema, if does not exist, it will automatically be created for your. Mongoose adds the plural form of Cat as the colelction name in your database
const Cat = mongoose.model("Cat", CatSchema);

//Create new cat following model
var kitty = new Cat({
  name: "Pink",
  color: "White",
  age: 11
});

//Save newly created cat to our database
kitty.save(function(err, cat){
  if(err){
    console.log("We have an ERROR!");
  }else{
    console.log("Cat added successfully!");
    console.log(kitty);
  }
});

//create a cat usiing model and directly save it to mongodb database without first saving it to a variable
Cat.create({
  name: "Tweety",
  color: "Purple",
  age: 4
}, function(err, sam){
  if(err){
    console.log("Cat Not added, ERROR!");
  }else{
    console.log("Sam has been successfully added to database!");
  }
});

//Retrieve all cats from Cats database and console.log each one
Cat.find({}, function(err, cats){
  if(err){
    console.log("ERROR!");
  }else{
    console.log(cat);
  }
});
