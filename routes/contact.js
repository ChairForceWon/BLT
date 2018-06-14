/*Route file for leads*/
var express = require("express");
var router = express.Router();
var contact = require("../models/contact");

//INDEX - Show all contacts
router.get("/", function(req, res){
   //get all contacts from database
   contact.find({}, function(err, allcontacts){
       if(err){
           console.log(err);
       } else {
           res.render("contact/index",{contacts: allcontacts});
       }
   });
});

//CREATE - add new contact to DB
router.post("/", function(req, res){
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
    var newcontact = {firstName: firstName, lastName: lastName, addressStreet: addressStreet, addressCity: addressCity, addressState: addressState, addressZip: addressZip, phone: phone, email: email, contactType: contactType}
    //Create a new campground and save to DB
    contact.create(newcontact, function(err, newlyCreated){
        if(err) {
            req.flash("error", "Something went wrong");
            res.redirect("back");
        } else {
            //redirect back to contact page
            req.flash("genInfo", "Contact Successfully Added!");
            res.redirect("/contact");   
        }
    });
});

//NEW - Show form to add new contact to DB 
router.get("/new", function(res, res){
   res.render("contact/new");
});

//SHOW - Show info about specific
router.get("/:id", function(req, res){
    contact.findById(req.params.id).exec(function(err, foundcontact){
        if(err){
            console.log(err);
        } else {
            res.render("contact/show", {contacts: foundcontact});
        }
    });
});

//EDIT - Shows the form to edit a contact
router.get("/:id/edit", function(req, res){
    contact.findById(req.params.id, function(err, foundcontact){
        if(err){
            console.log(err);
        } else {
            res.render("contact/edit", {contact: foundcontact});
        }
    });
});

//UPDATE - contact Route
router.put("/:id", function(req, res){
   contact.findByIdAndUpdate(req.params.id, req.body.contact, function(err, updatedPropect){
       if(err){
            req.flash("error", "Something went wrong");
            res.redirect("back");
       } else {
           res.redirect("/contact/" + req.params.id);
       }
   });
});

//DESTROY - contact Route
router.delete("/:id", function(req, res){
   contact.findByIdAndRemove(req.params.id, function(err){
       if(err){
            req.flash("error", "Something went wrong");
            res.redirect("/contact");           
       } else {
           req.flash("error", "Contact Deleted");
           res.redirect("/contact")
       }
   }); 
});
module.exports = router;