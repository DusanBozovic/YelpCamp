var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comment");


var data = [

    {
      name: "Kopaonik",
      image: "http://www.kopaonik.rs/kopaonik/wp-content/uploads/2013/03/kopskonaci.jpg",
      description: "vukojebina srpska"
    },
    {
      name: "Zlatibor",
      image: "https://s-ec.bstatic.com/images/hotel/max1024x768/833/83384622.jpg",
      description: "vukojebina srpska"
    },
    {
      name: "Tara",
      image: "http://www.tara-planina.com/Zaovine-leto/Tara-Zaovine-leto-s16.jpg",
      description: "vukojebina srpska"
    }

  ]
function seedDB(){
  Campground.remove({}, function(err){
    if (err) {
      console.log(err);
    }
    console.log("removed campgrounds");
    //add a few campgrounds
    data.forEach(function(seed){
      Campground.create(seed, function(err, campground){
        if (err) {
          console.log(err);
        }else {
          console.log("added a campground");
          //create comment on each campground
          Comment.create(
            {text: "this place is great no internet",
             author: "Homer"
          }, function(err, comment){
            if (err) {
              console.log(err);
            }else {
              campground.comments.push(comment);
              campground.save();
              console.log("created comments");
            }

          });
        }
      });
    });
  });


  //add a few comments
}
module.exports = seedDB;
