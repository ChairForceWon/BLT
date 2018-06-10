var mongoose = require("mongoose");

var leadSchema = new mongoose.Schema({
      firstName: String,
      lastName: String,
      addressStreet: String,
      addressCity: String,
      addressState: String,
      addressZip: String,
      phone: String,
      email: String,
      type: String,
   });

module.exports = mongoose.model("Lead", leadSchema);