
const cartModel = require('../model/cartModel');
const productModel = require('../model/productModel');

const addToCart = async(req,resp) =>{
    try {
        const {userId,productId,quantity} = req.body;

        const product = await productModel.findById(productId);

        if(!product){
            return resp.json({message:"Product not found"})
        }

        if(quantity <= 0 || quantity > product.quantity){
            return resp.json({message:"Insufficient stock"})
        }

        const cart = await cartModel.findOne({userId,productId});

        if(cart){
            if(cart.quantity + quantity > product.quantity){
                return resp.json({message:"Insufficient stock"})
            }

            cart.quantity = cart.quantity + quantity;
            await cart.save();

            return resp.json({message:"Cart quantity updated"})
        }

        await cartModel.create({
            userId,
            productId,
            quantity
        });

        resp.json({message:"Product added to cart"})
    } catch (error) {
        console.log(error);
        resp.status(500).json({message:"Unable to add product to cart"})
    }
}

const displayCart = async(req,resp) =>{
    try {
        const result = await cartModel.find({userId:req.params.userId})
            .populate("productId");

        resp.json(result);
    } catch (error) {
        console.log(error);
        resp.status(500).json({message:"Unable to display cart"})
    }
}

const updateCart = async(req,resp) =>{
    try {
        const {quantity,userId} = req.body;

        const cart = await cartModel.findOne({
            _id:req.params.id,
            userId
        }).populate("productId");

        if(!cart){
            return resp.json({message:"Cart item not found"})
        }

        if(quantity <= 0){
            return resp.json({message:"Invalid quantity"})
        }

        if(quantity > cart.productId.quantity){
            return resp.json({message:"Insufficient stock"})
        }

        cart.quantity = quantity;
        await cart.save();

        resp.json({message:"Cart updated successfully"})
    } catch (error) {
        console.log(error);
        resp.status(500).json({message:"Unable to update cart"})
    }
}

const deleteCart = async(req,resp) =>{
    try {
        const result = await cartModel.findOneAndDelete({
            _id:req.params.id,
            userId:req.body.userId
        });

        if(!result){
            return resp.json({message:"Cart item not found"})
        }

        resp.json({message:"Product removed from cart"})
    } catch (error) {
        console.log(error);
        resp.status(500).json({message:"Unable to remove product"})
    }
}

module.exports = {addToCart,displayCart,updateCart,deleteCart}
