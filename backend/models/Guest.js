const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema({

  name:String,
  email:String,

  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }

});

module.exports = mongoose.model("Guest",guestSchema);