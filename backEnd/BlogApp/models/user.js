var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String
});

//Plugin serializer/deserializer/authenticate/createocal strategy methods into the user schema to be used by passport so we do not have to write these ourselves. It will hash password for user

  userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
