const express = require('express');
const router = express.Router();

const {addToCart,displayCart,updateCart,deleteCart} = require('../controller/cartController');

router.post('/cart/add',addToCart);
router.get('/cart/:userId',displayCart);
router.put('/cart/update/:id',updateCart);
router.delete('/cart/delete/:id',deleteCart);

module.exports = router;
