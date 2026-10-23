const categoryModel = require("../model/categoryModel")

const addCategory=async(req,resp)=>{
    try {
        const {categoryName,description}=req.body
        await categoryModel.create({categoryName,description})
        resp.json({message:"Category added succesfully..."})
    } catch (error) {
        console.log(error);
    }
}

const displayCategories=async(req,resp)=>{
    try {
        const data=await categoryModel.find()
        resp.json(data)
    } catch (error) {
        console.log(error);
    }
}

const deleteCategory=async(req,resp)=>{
    try {
        await categoryModel.findByIdAndDelete(req.params.id)
        resp.json({message:"Category deleted succesfully..."})
    } catch (error) {
        console.log(error);
    }
}

module.exports={addCategory,displayCategories,deleteCategory}
