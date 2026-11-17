
const express = require('express');
const router = express.Router();

const {
    placeOrder,
    displayMyOrders,
    displayAllOrders,
    updateOrderStatus
} = require('../controller/orderController');

router.post('/order/place',placeOrder);
router.get('/orders/:userId',displayMyOrders);
router.get('/orders',displayAllOrders);
router.put('/order/update/:id',updateOrderStatus);

module.exports = router;
