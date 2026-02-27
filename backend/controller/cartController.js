const Cart = require("../models/Cart");


// Add to Cart
exports.addToCart = async (req,res) => {

  try{

    const { user, product, quantity } = req.body;

    const cartItem = await Cart.create({
      user,
      product,
      quantity
    });

    res.status(201).json(cartItem);

  }catch(error){

    res.status(500).json({error:error.message});

  }

};



// Get Cart Items
exports.getCart = async (req,res) => {

  try{

    const cartItems = await Cart.find()
      .populate("product")
      .populate("user","name email");

    res.json(cartItems);

  }catch(error){

    res.status(500).json({error:error.message});

  }

};



// Remove Cart Item
exports.removeFromCart = async (req,res) => {

  try{

    await Cart.findByIdAndDelete(req.params.id);

    res.json({message:"Item removed from cart"});

  }catch(error){

    res.status(500).json({error:error.message});

  }

};