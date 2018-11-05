var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
  author: {},
  body: String,
  date: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Comment", commentSchema);
