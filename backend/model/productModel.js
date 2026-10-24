
const mongoose = require('mongoose');

const productSchema=mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    productName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    supplierName:{
        type:String,
        required:true
    },
    quantity:{
    type:Number,
    required:true,
    default:0
    }
},{
    timestamps:true
})

const productModel=mongoose.model("product",productSchema)
module.exports=productModel
