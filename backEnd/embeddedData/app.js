var mongoose = require("mongoose");

//Connect to mongo database
mongoose.connect("mongodb://localhost/embedded_data");

//Posts Schema (List first since users depend on posts)
var postSchema = new mongoose.Schema({
  title: String,
  post: String
});
//Post model
var Post = mongoose.model("Post", postSchema);


//Create User schema
var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  posts: [postSchema]
});
//Create User model
var User = mongoose.model("User", userSchema);

//THE BELOW DOES NOT WORK PROPERLY (posts not saved in user)
// User.create({
//   name: "Jacky Mentzel",
//   email: "jackymentzel45@gmail.com"
// }, function(err, user){
//   if(err){
//     console.log(err);
//   }else{
//     Post.create({
//       title: "How to lose belly fat!",
//       post: "Just drink alot of water before you eat anything and make sure to excercise every day!"
//     }, function(err, post){
//       if(err){
//         console.log(err);
//       }else{
//         user.posts.push(post);
//         user.save(function(err, newUser){
//           if(err){
//             console.log(err);
//           }else{
//             // console.log(user);
//           }
//         });
//       }
//     });
//   }
// });

//Create user object
var jacky = new User({
  name: "Jacky Mentzel",
  email: "jackymentzel45@gmail.com"
}, function(err, newUser){
  if(err){
    console.log(err);
  }else{
    console.log("Created User!");
  }
});

//Create post object
var post1 = new Post({
  title: "We Rock and RoLL!",
  post: "Shake that tail feather everyone. We got one hell of a night planned and nothing will stop us tonight!"
}, function(err, newPost){
  if(err){
    console.log(err);
  }else{
    console.log("Created new post!");
  }
});

//Save post object into databse
post1.save(function(err, post){
  if(err){
    console.log(err);
  }else{
    // console.log(post);
  }
})

//Add new post to the users
jacky.posts.push(post1);

//Save Updated Jacky object into database
jacky.save(function(err, updatedJacky){
  if(err){
    console.log(err);
  }else{
    console.log("Updated user!");
  }
});

User.findOne({name: "Jacky Mentzel"}, function(err, user){
  if(err){
    console.log(err);
  }else{
    console.log(user);
  }
});
