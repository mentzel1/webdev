var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
  username: String,
  password: String
});

//Add extra authentiction methods to user schema
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
