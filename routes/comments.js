//routes/comments.js
var express = require("express");
var router = express.Router({mergeParams: true});
var Contact  = require("../models/contact"),
    Comment     = require("../models/comment");
var middleware  = require("../middleware");

//Comments New
router.get("/new", middleware.isLoggedIn, function(req, res){
    //Find contact by id
    Contact.findById(req.params.id, function(err, contact){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {contact: contact});
        }
    });
})

//Comments Create
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup contact using id
    Contact.findById(req.params.id, function(err, contact){
        if(err){
            console.log(err);
            req.flash("error", "Something went wrong");
            res.redirect("/contact/" + contact._id);
        } else {
          Comment.create(req.body.comment, function(err, comment){
              if(err){
                  console.log(err);
              } else {
                  //add username and id to comment
                  comment.author.id = req.user._id;
                  comment.author.username = req.user.username;
                  //save comment
                  comment.save();
                  contact.comments.push(comment);
                  contact.save();
                  req.flash("genInfo", "Comment added");
                  res.redirect("/contact/" + contact._id);
              }
          })
        }
    });
})


//EDIT Comment 
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            req.flash("error", "Something went wrong");
            res.redirect("back");
        } else {
            res.render("comments/edit", {contact_id: req.params.id, comment: foundComment});
        }
    });
});

//UPDATE Comment
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err) {
           req.flash("error", "Something went wrong");
           res.redirect("back");
       } else {
           req.flash("genInfo", "Comment Updated");
           res.redirect("/contact/" + req.params.id);
       }
    });
});

//DESTROY Comment
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res, next){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           req.flash("error", "Something went wrong");
           res.redirect("back");
       } else {
           req.flash("error", "Comment Deleted");
           res.redirect("/contact/" + req.params.id);
       }
   }) 
});


module.exports = router;