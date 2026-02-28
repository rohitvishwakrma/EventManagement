const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema({

  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  type: {
    type: String,
    enum: ["6months", "1year", "2years"],
    required: true
  },

  startDate: {
    type: Date,
    default: Date.now
  },

  expiryDate: {
    type: Date
  },
  membership: {
    type: String,
    default: null
  }

});

module.exports = mongoose.model("Membership", membershipSchema);