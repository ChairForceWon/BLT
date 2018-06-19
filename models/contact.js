var mongoose = require("mongoose");

var contactSchema = new mongoose.Schema ({
      firstName: String,
      lastName: String,
      addressStreet: String,
      addressCity: String,
      addressState: String,
      addressZip: String,
      phone: String,
      email: String,
      contactType: String,
      contactStrength: String,
      created: {type: Date, default: Date.now},
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});
 
module.exports = mongoose.model("Contact", contactSchema);