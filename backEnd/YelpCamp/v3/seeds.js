var mangoose = require("mongoose");
var Campgrounds = require("./models/campground.js");
var Comment = require("./models/comment.js");

//Array of campground objects we want to add to our DB
var data = [
  { name: "Salt Creek -  Strait of Juan de Fuca",
    img: "http://www.seattlemag.com/sites/default/files/field/image/11906303179a5642b40do_0.jpg",
    description: "Sea stars, swimming and s’mores, oh my! Salt Creek Recreation Area off State Route 112 on the north side of the Olympic Peninsula has a wealth of options for family campers who like to get to where they’re going and stay put. This Clallam County campground offers dozens of drive-in campsites with golden views across the Strait of Juan de Fuca, and also some of the best tide pooling in the Pacific Northwest at Tongue Point Marine Sanctuary a few wet footsteps away from your tent. On hot summer days nothing beats the heat better than a dip into Salt Creek, which meanders along the beach at Crescent Bay (right by the campground) on its way into the Pacific. Hikers, kayakers, surfers and photographers will find plenty to do in and around Salt Creek. And if the kids still have some energy to burn, the campground offers a playground, basketball hoops, a ball field and a volleyball court. Coin-op showers and firewood for sale (BYO s’mores) seal the deal: The living is sweet at Salt Creek."},
  { name: "Waldseilgarten Campy Resort - Germany",
    img: "https://assets2.roadtrippers.com/uploads/blog_post_section/attachment/image/183381/blog_post_section/attachment-image-e9cd2b2f-3a78-4638-bd6c-8bd0f7d6fe14.jpg",
    description: "These awesome hanging tents, or portaledges, are the specialty of the Waldseilgarten camping resort in Germany. For just a few hundred bucks, the resort will give you an elevated tent high in the trees or on a cliffside, provide you with all the gear, and even feed you!"},
  { name: "Hotel Kakslauttanen - Finaland",
    img: "https://assets0.roadtrippers.com/uploads/blog_post_section/attachment/image/183382/blog_post_section/attachment-image-25b81b52-9bc2-41fc-9a70-053ed4c8e657.jpg",
    description: "Located in the Arctic Circle, Finland’s Hotel Kakslauttanen offers the unique opportunity to spend the night cozied in a heated igloo. But the best part? The  igloo’s glass ceiling is specially designed to provide an incredible view of the beautiful Northern Lights."}
];

function seedDB(){
  //Remove All currently added campgrounds
  Campgrounds.remove({}, function(err){
    if(err){
      console.log(err);
    }else{
      console.log("Removed items from campground database!");
      //Remove comments?
      Comment.remove({}, function(err){
        if(err){
          console.log(err);
        }else{
          console.log("Removed Comment!");
          // //Add dummy campground database
          // data.forEach(function(camp){
          //   Campgrounds.create(camp, function(err, newCamp){
          //     if(err){
          //       console.log(err);
          //     }else{
          //       console.log("Added a campground");
          //       //Add comments to campgrounds
          //       Comment.create({
          //         text: "Wow, this place was amazing! Definietly need to bring some bug spray next time though. Way too  many bugs!",
          //         author: "Jack Ripe"
          //       }, function(err, newComment){
          //         if(err){
          //           console.log(err);
          //         }else{
          //           //Add comment to campground
          //           newCamp.comment.push(newComment);
          //           //Save new campground with comment to database in MongoDB
          //           newCamp.save();
          //           console.log("Comment created!");
          //         }
          //       });
          //     }
          //   });
          // });
        }
      });
    }
  })

};

module.exports = seedDB;
