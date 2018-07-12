var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
  username: String,
  Password: String
});

//Provides extra methods to serialize, deserialize a user
//This takes care of the hashing/salting of users password
 userSchema.plugin(passportLocalMongoose);

module.exports =  mongoose.model("user", userSchema);
