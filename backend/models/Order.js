const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  items:[
    {
      product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product"
      },
      quantity:{
        type:Number
      }
    }
  ],

  total:{
    type:Number
  },

  status:{
    type:String,
    default:"Received"
  }

},{timestamps:true});

module.exports = mongoose.model("Order",orderSchema);