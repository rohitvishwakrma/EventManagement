
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      quantity: Number
    }
  ],

  totalAmount: {
    type: Number
  },

  status: {
    type: String,
    enum: ["Received", "Processing", "Completed"],
    default: "Received"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Order", orderSchema);
