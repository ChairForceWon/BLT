/*Route file for leads*/
var express = require("express");
var router = express.Router();
var Contact = require("../models/contact");
var middleware = require("../middleware");

//INDEX - Show all contacts
router.get("/", middleware.isLoggedIn, function(req, res){
   //get all contacts from database
   Contact.find({}, function(err, allcontacts){
       if(err){
           console.log(err);
       } else {
           res.render("contact/index",{contacts: allcontacts});
       }
   });
});

//CREATE - add new contact to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    //get data from form and add to contact array
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var addressStreet = req.body.addressStreet;
    var addressCity = req.body.addressCity;
    var addressState = req.body.addressState;
    var addressZip = req.body.addressZip;
    var phone = req.body.phone;
    var email = req.body.email;
    var contactType = req.body.contactType;
    var created = req.body.created;
    var contactStrength = req.body.contactStrength;
    var contactStatus = req.body.contactStatus;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newcontact = {firstName: firstName, lastName: lastName, addressStreet: addressStreet, addressCity: addressCity, addressState: addressState, addressZip: addressZip, phone: phone, email: email, contactType: contactType, author: author, created: created, contactStrength: contactStrength, contactStatus: contactStatus};
    //Create a new contact and save to DB
    Contact.create(newcontact,  function(err, newlyCreated){
        if(err) {
            req.flash("error", "Something went wrong");
            console.log(err);
            res.redirect("back");
        } else {
            //redirect back to contact page
            req.flash("genInfo", "Contact Successfully Added!");
            res.redirect("back");
        }
    });
});

//NEW - Show form to add new contact to DB 
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("contact/new");
});

//SHOW - This will show info about the specific contact
router.get("/:id", function(req, res){
    //Find the contact with provided ID
   Contact.findById(req.params.id).populate("comments").exec(function(err, foundContact){
       if(err) {
           console.log(err);
       } else {
           //render SHOW template with that contact
           res.render("contact/show", {contacts: foundContact});
       }
   });
    
});

//EDIT - Shows the form to edit a contact
router.get("/:id/edit", middleware.isLoggedIn, function(req, res){
    Contact.findById(req.params.id, function(err, foundcontact){
        if(err){
            console.log(err);
        } else {
            res.render("contact/edit", {contact: foundcontact});
        }
    });
});

//UPDATE - contact Route
router.put("/:id", middleware.isLoggedIn, function(req, res){
   Contact.findByIdAndUpdate(req.params.id, req.body.contact, function(err, updatedPropect){
       if(err){
            req.flash("error", "Something went wrong");
            res.redirect("back");
             console.log(err);
       } else {
           res.redirect("back");
       }
   });
});

//DESTROY - contact Route
router.delete("/:id", middleware.isLoggedIn, function(req, res){
   Contact.findByIdAndRemove(req.params.id, function(err){
       if(err){
            req.flash("error", "Something went wrong");
            res.redirect("/contact");   
             console.log(err);
       } else {
           req.flash("error", "Contact Deleted");
           res.redirect("/contact");
       }
   }); 
});
module.exports = router;