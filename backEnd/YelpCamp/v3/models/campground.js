var mongoose = require("mongoose");
var Comment = require("./comment.js");

//Create campground schema (aka template)
var campgroundSchema = new mongoose.Schema({
  name: String,
  img: String,
  description: String,
  comment: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

//Create campground model (aka create DB collection of type campgroundSchema) and export it
module.exports = mongoose.model("Campground", campgroundSchema);
