var express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    passport                = require("passport"),
    flash                   = require("connect-flash"),
    mongoose                = require("mongoose"),
    methodOverride          = require("method-override"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    Lead                    = require("./models/lead"),
    Prospect                = require("./models/prospect");
    
    
//Requiring Routes
var leadRoutes      = require("./routes/lead"),
    indexRoutes     = require("./routes/index"),
    prospectRoutes  = require("./routes/prospect");
    

    
mongoose.connect("mongodb://localhost/blt");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   res.locals.genInfo = req.flash("genInfo");
   next();
});

app.get("/", function(req, res){
    res.render("landing");
});

app.use(indexRoutes);
app.use("/lead", leadRoutes);
app.use("/prospect", prospectRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("BLT Server has started...") 
});