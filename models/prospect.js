var mongoose = require("mongoose");

var prospectSchema = new mongoose.Schema({
      firstName: String,
      lastName: String,
      addressStreet: String,
      addressCity: String,
      addressState: String,
      addressZip: String,
      phone: String,
      email: String,
      prospectStatus: String,
   });

module.exports = mongoose.model("Prospect", prospectSchema);