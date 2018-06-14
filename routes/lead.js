/*Route file for leads*/
var express = require("express");
var router = express.Router();
var Lead = require("../models/lead");

//INDEX - Show all leads
router.get("/", function(req, res){
   //get all leads from database
   Lead.find({}, function(err, allLeads){
       if(err){
           console.log(err);
       } else {
           res.render("leads/index",{leads: allLeads});
       }
   });
});

//CREATE - add new lead to DB
router.post("/", function(req, res){
    //get data from form and add to leadss array
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var addressStreet = req.body.addressStreet;
    var addressCity = req.body.addressCity;
    var addressState = req.body.addressState;
    var addressZip = req.body.addressZip;
    var phone = req.body.phone;
    var email = req.body.email;
    var leadStatus = req.body.leadStatus;
    var newLead = {firstName: firstName, lastName: lastName, addressStreet: addressStreet, addressCity: addressCity, addressState: addressState, addressZip: addressZip, phone: phone, email: email, leadStatus: leadStatus}
    //Create a new Lead and save to DB
    Lead.create(newLead, function(err, newlyCreated){
        if(err) {
            req.flash("error", "Something went wrong");
            res.redirect("back");
        } else {
            //redirect back to leads page
            req.flash("genInfo", "Lead Successfully Added!");
            res.redirect("/lead");   
        }
    });
});

//NEW - Show form to add new Lead info
router.get("/new", function(req, res){
    res.render("leads/new");
});

//SHOW - This will show info about specific lead
router.get("/:id", function(req, res){
    Lead.findById(req.params.id).exec(function(err, foundLead){
        if(err){
            console.log(err);
        } else {
            res.render("leads/show", {leads: foundLead});
        }
    });
});

//EDIT - Shows the form to edit a lead
router.get("/:id/edit", function(req, res){
    Lead.findById(req.params.id, function(err, foundLead){
        if(err){
            console.log(err);
        } else {
            res.render("leads/edit", {lead: foundLead});
        }
    });
});

//UPDATE Lead Route
router.put("/:id", function(req, res){
    Lead.findByIdAndUpdate(req.params.id, req.body.lead, function(err, updatedLead){
        if(err){
            req.flash("error", "Something went wrong");
            res.redirect("back");
        } else {
            res.redirect("/lead/" + req.params.id);
        }
    });
});

//DESTROY Lead Route
router.delete("/:id", function(req, res){
    Lead.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            req.flash("error", "Something went wrong");
            res.redirect("/lead");
        } else {
            req.flash("error", "Lead Deleted");
            res.redirect("/lead");
        }
    });
});

module.exports = router;