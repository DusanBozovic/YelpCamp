var Campground = require("../models/campground");
var Comment = require("../models/comment");
//all middleware
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        //does user own the campground
           Campground.findById(req.params.id, function(err, foundCampground){
        if (err) {
           res.redirect("/campgrounds")
    }  else {
             //does user own the campground
          if (foundCampground.author.id.equals(req.user._id)) {
            next();
          }else {
            res.redirect("back");
          }
        }
      });
    }else {
      res.redirect("back");
    }
  }


middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        //does user own the comment
           Comment.findById(req.params.commet_id, function(err, foundComment){
        if (err) {
          req.flash("error", "camp not found");
           res.redirect("/back");
    }  else {
             //does user own the comment
          if (foundCOmment.author.id.equals(req.user._id)) {
            next();
          }else {
            req.flash("error", "No permission");
            res.redirect("back");
          }
        }
      });
    }else {
      req.flash("error", "pls log in")
      res.redirect("back");
    }
  }

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please login first!");
    res.redirect("/login");
}



module.exports = middlewareObj;
