var Contact = require("../models/contact");
var Comment = require("../models/comment");

// all the middleare goes here
var middlewareObj = {};

middlewareObj.checkContactOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Contact.findById(req.params.id, function(err, foundContact){
           if(err){
               req.flash("error", "Contact not found");
               res.redirect("back");
           }  else {
               // does user own the Contact?
            if(foundContact.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the comment?
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
        return next();
/*    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");*/
}

module.exports = middlewareObj;