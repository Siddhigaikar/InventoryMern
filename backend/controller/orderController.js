
const orderModel = require('../model/orderModel');
const cartModel = require('../model/cartModel');
const productModel = require('../model/productModel');

const placeOrder = async(req,resp) =>{
    try {
        const {userId,address,paymentMethod} = req.body;

        const cart = await cartModel.find({userId})
            .populate("productId");

        if(cart.length == 0){
            return resp.json({message:"Your cart is empty"})
        }

        if(!address){
            return resp.json({message:"Please enter delivery address"})
        }

        for(let item of cart){
            if(!item.productId || item.quantity > item.productId.quantity){
                return resp.json({
                    message:"Insufficient stock for " + (item.productId ? item.productId.productName : "a product")
                })
            }
        }

        let products = [];
        let totalAmount = 0;

        for(let item of cart){
            products.push({
                productId:item.productId._id,
                productName:item.productId.productName,
                image:item.productId.image,
                price:item.productId.price,
                quantity:item.quantity
            });

            totalAmount = totalAmount + (item.productId.price * item.quantity);
        }

        const order = await orderModel.create({
            userId,
            products,
            totalAmount,
            address,
            paymentMethod:paymentMethod || "Cash on Delivery"
        });

        for(let item of cart){
            await productModel.findByIdAndUpdate(
                item.productId._id,
                {$inc:{quantity:-item.quantity}}
            );
        }

        await cartModel.deleteMany({userId});

        resp.json({
            message:"Order placed successfully",
            order
        });

    } catch (error) {
        console.log(error);
        resp.status(500).json({message:"Unable to place order"})
    }
}

const displayMyOrders = async(req,resp) =>{
    try {
        const result = await orderModel.find({userId:req.params.userId})
            .sort({createdAt:-1});

        resp.json(result);
    } catch (error) {
        console.log(error);
        resp.status(500).json({message:"Unable to display orders"})
    }
}

const displayAllOrders = async(req,resp) =>{
    try {
        const result = await orderModel.find()
            .populate("userId","name email")
            .sort({createdAt:-1});

        resp.json(result);
    } catch (error) {
        console.log(error);
        resp.status(500).json({message:"Unable to display all orders"})
    }
}

const updateOrderStatus = async(req,resp) =>{
    try {
        const {orderStatus} = req.body;

        const result = await orderModel.findByIdAndUpdate(
            req.params.id,
            {orderStatus},
            {new:true}
        );

        if(!result){
            return resp.json({message:"Order not found"})
        }

        resp.json({message:"Order status updated successfully"})
    } catch (error) {
        console.log(error);
        resp.status(500).json({message:"Unable to update order status"})
    }
}

module.exports = {
    placeOrder,
    displayMyOrders,
    displayAllOrders,
    updateOrderStatus
}
