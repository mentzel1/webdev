var mongoose = require("mongoose");

//Create blogApp Schema (Define object blueprint)
const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  date: {type: Date, default: Date.now}
});

//Converts our bueprint into a "Model" we can work with (Create object constructor from schema definition) and export it for use outside file
module.exports = mongoose.model("Blog", blogSchema);
