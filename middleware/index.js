//middleware/index.js
var Contact  = require("../models/contact"),
    Comment     = require("../models/comment");
    
//all the middleware goes here
var middlewareObj = {};

middlewareObj.checkContactOwnership = function(req, res, next) {
    if(req.isAuthenticated()){                                              
        Contact.findById(req.params.id, function(err, foundContact){
            if(err){
                req.flash("error", "contact not found");
                res.redirect("back");
            } else {                
                    // does user own the contact?
                if(foundContact.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("You don't have permission to do that");
                    res.redirect("/contacts/" + req.params.id);
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("/contact/" + req.params.id);
    }
}

 middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else {
                    // does user own the comment?
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that!!!");
                    res.redirect("/contact/" + req.params.id);
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("/contact/" + req.params.id);
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("back");
}

module.exports = middlewareObj;