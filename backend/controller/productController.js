const Product = require("../models/Product");


// Add Product
exports.addProduct = async (req, res) => {
  try {

    const { name, description, price, vendor } = req.body;

    const product = await Product.create({
      name:req.body.name,
      description:req.body.description,
      price:req.body.price,
      vendor:req.user._id   // 🔥 Important
    });

    res.status(201).json(product);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Get All Products
exports.getProducts = async (req, res) => {
  try {

    const products = await Product.find().populate("vendor", "name email");

    res.json(products);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Delete Product
exports.deleteProduct = async (req, res) => {
  try {

    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Product
exports.updateProduct = async (req,res) => {

  try{

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new:true }
    );

    res.json(product);

  }catch(error){

    res.status(500).json({error:error.message});

  }

};

// Vendor Products
exports.getVendorProducts = async (req,res)=>{

  try{

    const products = await Product.find({vendor:req.user._id});

    res.json(products);

  }catch(error){

    res.status(500).json({error:error.message});

  }

};