const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {
  console.log('addToCart called');
  console.log('req.body:', req.body);
  console.log('req.user:', req.user);
  try {
    const { product, quantity } = req.body;
    const userId = req.user.id;
    let cartItem = await Cart.findOne({ userId, product });
    if (cartItem) {
      cartItem.quantity += quantity || 1;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({
        userId,
        product,
        quantity: quantity || 1
      });
    }
    res.status(201).json(cartItem);
  } catch (error) {
    console.error('addToCart error:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find()
      .populate("product")
      .populate("userId", "name email");
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};