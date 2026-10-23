
const productModel = require("../model/productModel")

const addProduct=async(req,resp)=>{
    try {
        const {image,productName,description,category,price,quantity,supplierName}=req.body
        await productModel.create({image,productName,description,category,price,quantity,supplierName})
        resp.json({message:"Product added succesfully..."})
    } catch (error) {
        console.log(error);
    }
}

const displayData=async(req,resp)=>{
    try {
        const data=await productModel.find()
        resp.json(data)
    } catch (error) {
        console.log(error);
    }
}

const displayProduct=async(req,resp)=>{
    try {
        const data=await productModel.findById(req.params.id)
        resp.json(data)
    } catch (error) {
        console.log(error);
    }
}

const editProduct=async(req,resp)=>{
    try {
        const {image,productName,description,category,price,quantity,supplierName}=req.body
        await productModel.findByIdAndUpdate(req.params.id,{image,productName,description,category,price,quantity,supplierName})
        resp.json({message:"Product edited succesfully.."})
    } catch (error) {
        console.log(error);
    }
}

const deleteProduct=async(req,resp)=>{
    try {
        await productModel.findByIdAndDelete(req.params.id)
        resp.json({message:"Product deleted succesfully..."})
    } catch (error) {
        console.log(error);
    }
}

module.exports={addProduct,displayData,displayProduct,editProduct,deleteProduct}
