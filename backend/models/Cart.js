const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({


  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },

  quantity: {
    type: Number,
    default: 5
  }

});

module.exports = mongoose.model("Cart", cartSchema);