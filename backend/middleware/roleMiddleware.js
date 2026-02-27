exports.isAdmin = (req,res,next) => {

  if(req.user.role !== "admin"){
    return res.status(403).json({message:"Admin access required"});
  }

  next();

};


exports.isVendor = (req,res,next) => {

  if(req.user.role !== "vendor"){
    return res.status(403).json({message:"Vendor access required"});
  }

  next();

};


exports.isUser = (req,res,next) => {

  if(req.user.role !== "user"){
    return res.status(403).json({message:"User access required"});
  }

  next();

};