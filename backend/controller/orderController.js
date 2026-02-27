const Order = require("../models/Order");
const Cart = require("../models/Cart");


// Create Order (Checkout)
exports.createOrder = async (req, res) => {

  try {

    const { user } = req.body;

    const cartItems = await Cart.find({ user }).populate("product");

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let total = 0;

    const products = cartItems.map(item => {

      total += item.product.price * item.quantity;

      return {
        product: item.product._id,
        quantity: item.quantity
      };

    });

    const order = await Order.create({
      user,
      products,
      totalAmount: total
    });

    // Clear cart after order
    await Cart.deleteMany({ user });

    res.status(201).json({
      message: "Order placed successfully",
      order
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};


// Get Orders (User specific)
exports.getUserOrders = async (req, res) => {

  try {

    const { user } = req.params;

    const orders = await Order.find({ user })
      .populate("products.product");

    res.json(orders);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};


// Update Order Status
exports.updateOrderStatus = async (req, res) => {

  try {

    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(order);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

// Cancel Order
exports.cancelOrder = async (req,res)=>{

  try{

    const order = await Order.findByIdAndDelete(req.params.id);

    res.json({message:"Order cancelled"});

  }catch(error){

    res.status(500).json({error:error.message});

  }

};