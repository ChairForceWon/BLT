/*Route file for leads*/
var express = require("express");
var router = express.Router();
var contact = require("../models/contact");
var middleware  =require("../middleware");

//INDEX - Show all contacts
router.get("/", middleware.isLoggedIn, function(req, res){
   //get all contacts from database
   contact.find({}, function(err, allcontacts){
       if(err){
           console.log(err);
       } else {
           res.render("lead/index",{contacts: allcontacts});
       }
   });
});

module.exports = router;