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
exports.assignMembership = async (req,res)=>{

  const { vendorId, type } = req.body;

  let months = 0;

  if(type === "6months") months = 6;
  if(type === "1year") months = 12;
  if(type === "2years") months = 24;

  const startDate = new Date();
  const expiryDate = new Date();
  expiryDate.setMonth(expiryDate.getMonth() + months);

  const membership = await Membership.create({
    vendor: vendorId,
    type,
    startDate,
    expiryDate
  });

  res.json(membership);
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