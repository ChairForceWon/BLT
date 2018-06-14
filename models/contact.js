var mongoose = require("mongoose");

var contactSchema = new mongoose.Schema({
      firstName: String,
      lastName: String,
      addressStreet: String,
      addressCity: String,
      addressState: String,
      addressZip: String,
      phone: String,
      email: String,
      contactType: String,
   });

module.exports = mongoose.model("Contact", contactSchema);