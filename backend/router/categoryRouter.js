const express = require('express');
const { addCategory, displayCategories, deleteCategory } = require('../controller/categoryController');

const cat_router = express.Router();

cat_router.post("/category/add",addCategory);

cat_router.get("/categories",displayCategories);

cat_router.delete("/category/delete/:id",deleteCategory);

module.exports=cat_router;
