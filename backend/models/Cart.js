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

// Prevent duplicate cart items for the same user and product
cartSchema.index({ userId: 1, product: 1 }, { unique: true });

module.exports = mongoose.model("Cart", cartSchema);