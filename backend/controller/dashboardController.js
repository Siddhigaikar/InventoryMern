
const productModel = require('../model/productModel');
const userModel = require('../model/userModel');
const orderModel = require('../model/orderModel');

const dashboardData = async(req,resp) =>{
    try {

        const totalProducts = await productModel.countDocuments();

        const totalCustomers = await userModel.countDocuments({role:"customer"});

        const totalOrders = await orderModel.countDocuments();

        const sales = await orderModel.aggregate([
            {$match:{orderStatus:{$ne:"Cancelled"}}},
            {$group:{_id:null,total:{$sum:"$totalAmount"}}}
        ]);

        const lowStock = await productModel.find({quantity:{$lte:5}});

        const recentOrders = await orderModel.find()
            .populate("userId","name email")
            .sort({createdAt:-1})
            .limit(5);

        resp.json({
            totalProducts,
            totalCustomers,
            totalOrders,
            totalSales:sales.length > 0 ? sales[0].total : 0,
            lowStock,
            recentOrders
        });

    } catch (error) {
        console.log(error);
        resp.status(500).json({message:"Unable to load dashboard"})
    }
}

module.exports = {dashboardData}
