
const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },

    products:[{
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"product"
        },
        productName:{
            type:String,
            required:true
        },
        image:{
            type:String
        },
        price:{
            type:Number,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        }
    }],

    totalAmount:{
        type:Number,
        required:true
    },

    address:{
        type:String,
        required:true
    },

    paymentMethod:{
        type:String,
        default:"Cash on Delivery"
    },

    paymentStatus:{
        type:String,
        default:"Pending"
    },

    orderStatus:{
        type:String,
        default:"Placed"
    }

},{
    timestamps:true
})

const orderModel = mongoose.model("order",orderSchema)
module.exports = orderModel
