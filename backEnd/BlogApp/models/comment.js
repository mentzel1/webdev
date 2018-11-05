var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
  author: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  body: String,
  date: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Comment", commentSchema);
