/*Route file for leads*/
var express = require("express");
var router = express.Router();
var Prospect = require("../models/prospect");

//INDEX - Show all prospects
router.get("/", function(req, res){
   //get all prospects from database
   Prospect.find({}, function(err, allProspects){
       if(err){
           console.log(err);
       } else {
           res.render("prospect/index",{prospects: allProspects});
       }
   });
});

//CREATE - add new prospect to DB
router.post("/", function(req, res){
    //get data from form and add to prospect array
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var addressStreet = req.body.addressStreet;
    var addressCity = req.body.addressCity;
    var addressState = req.body.addressState;
    var addressZip = req.body.addressZip;
    var phone = req.body.phone;
    var email = req.body.email;
    var newProspect = {firstName: firstName, lastName: lastName, addressStreet: addressStreet, addressCity: addressCity, addressState: addressState, addressZip: addressZip, phone: phone, email: email}
    //Create a new campground and save to DB
    Prospect.create(newProspect, function(err, newlyCreated){
        if(err) {
            req.flash("error", "Something went wrong");
            res.redirect("back");
        } else {
            //redirect back to prospect page
            req.flash("genInfo", "Prospect Successfully Added!");
            res.redirect("/prospect");   
        }
    });
});

//NEW - Show form to add new prospect to DB 
router.get("/new", function(res, res){
   res.render("prospect/new");
});

//SHOW - Show info about specific
router.get("/:id", function(req, res){
    Prospect.findById(req.params.id).exec(function(err, foundProspect){
        if(err){
            console.log(err);
        } else {
            res.render("prospect/show", {prospects: foundProspect});
        }
    });
});

//EDIT - Shows the form to edit a Prospect
router.get("/:id/edit", function(req, res){
    Prospect.findById(req.params.id, function(err, foundProspect){
        if(err){
            console.log(err);
        } else {
            res.render("prospect/edit", {prospect: foundProspect});
        }
    });
});

//UPDATE - Prospect Route
router.put("/:id", function(req, res){
   Prospect.findByIdAndUpdate(req.params.id, req.body.prospect, function(err, updatedPropect){
       if(err){
            req.flash("error", "Something went wrong");
            res.redirect("back");
       } else {
           res.redirect("/prospect/" + req.params.id);
       }
   });
});

//DESTROY - Prospect Route
router.delete("/:id", function(req, res){
   Prospect.findByIdAndRemove(req.params.id, function(err){
       if(err){
            req.flash("error", "Something went wrong");
            res.redirect("/prospect");           
       } else {
           req.flash("error", "Prospect Deleted");
           res.redirect("/prospect")
       }
   }); 
});
module.exports = router;