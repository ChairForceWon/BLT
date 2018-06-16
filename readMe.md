Authenication is set up, but disabled for ease of development. Go to middleware > index.js and find the isLoggedIn function.

uncomment the comment block and delete the 2nd "return next()" to enable.

/*      return next(); <<< Delete me
        req.flash("error", "You need to be logged in to do that"); <<< uncomment
        res.redirect("/login");*/ <<< uncomment