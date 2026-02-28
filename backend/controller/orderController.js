const Order = require("../models/Order");
const Cart = require("../models/Cart");


// Create Order (Checkout)
exports.createOrder = async (req, res) => {

  try {

    const { items, total } = req.body;

    const order = new Order({
      user: req.user.id,
      items: items.map(item => ({
        product: item.product._id,
        quantity: item.quantity
      })),
      total: total,
      status: "Received"
    });

    await order.save();

    res.status(201).json({
      message: "Order Created",
      order
    });

  } catch (error) {

    console.log(error);
    res.status(500).json({ message: "Server Error" });

  }

};



// Get Orders (User specific)
exports.getUserOrders = async (req, res) => {
  try {

    const orders = await Order.find({
      user: req.user.id
    }).populate("items.product");

    res.json(orders);

  } catch (error) {
    console.log(error);
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


exports.getVendorOrders = async (req,res)=>{
  try{

    const orders = await Order.find()
      .populate("user","email")
      .populate("items.product");

    res.json(orders);

  }catch(error){

    console.log(error);
    res.status(500).json({error:error.message});

  }
};