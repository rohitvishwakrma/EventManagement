const Guest = require("../models/Guest");

exports.addGuest = async(req,res)=>{

  try{

    const guest = await Guest.create({
      name:req.body.name,
      email:req.body.email,
      user:req.user._id
    });

    res.json(guest);

  }catch(error){

    res.status(500).json({error:error.message});

  }

};


exports.getGuests = async(req,res)=>{

  try{

    const guests = await Guest.find({user:req.user._id});

    res.json(guests);

  }catch(error){

    res.status(500).json({error:error.message});

  }

};


exports.deleteGuest = async(req,res)=>{

  try{

    await Guest.findByIdAndDelete(req.params.id);

    res.json({message:"Guest removed"});

  }catch(error){

    res.status(500).json({error:error.message});

  }

};