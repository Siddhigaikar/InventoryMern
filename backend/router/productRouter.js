
const express = require('express');
const { addProduct, displayData, displayProduct, editProduct, deleteProduct } = require('../controller/productController');

const p_router = express.Router();

p_router.post("/add",addProduct);

p_router.get("/products",displayData);

p_router.get("/products/:id",displayProduct);

p_router.put("/edit/:id",editProduct);

p_router.delete("/delete/:id",deleteProduct);

module.exports=p_router;
