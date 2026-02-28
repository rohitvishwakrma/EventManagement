const User = require("../models/User");
const Membership = require("../models/Membership");


// Get all users
exports.getAllUsers = async (req,res)=>{
  const users = await User.find({ role: "user" });
  res.json(users);
};


// Get all vendors
exports.getAllVendors = async (req,res)=>{
  const vendors = await User.find({ role: "vendor" });
  res.json(vendors);
};


// Assign Membership to Vendor
exports.assignMembership = async (req, res) => {

  try {

    const { vendorId, membership } = req.body;

    const vendor = await User.findById(vendorId);

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    vendor.membership = membership;

    await vendor.save();

    res.json({
      message: "Membership assigned successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};

// Update Membership
exports.updateMembership = async (req,res)=>{

  const { type } = req.body;

  let months = 0;

  if(type === "6months") months = 6;
  if(type === "1year") months = 12;
  if(type === "2years") months = 24;

  const expiryDate = new Date();
  expiryDate.setMonth(expiryDate.getMonth() + months);

  const membership = await Membership.findByIdAndUpdate(
    req.params.id,
    { type, expiryDate },
    { new: true }
  );

  res.json(membership);
};