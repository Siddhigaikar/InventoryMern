
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Dashboard = () => {

    const [data,setData] = useState({
        totalProducts:0,
        totalCustomers:0,
        totalOrders:0,
        totalSales:0,
        lowStock:[],
        recentOrders:[]
    })

    useEffect(()=>{
        axios.get("http://localhost:4000/dashboard")
        .then((res)=>setData(res.data))
        .catch((err)=>console.log(err))
    },[])

    return (
        <>
        <div className="container mt-4">

            <h2 className="text-center mb-4">Admin Dashboard</h2>

            <div className="row g-3">

                <div className="col-md-3">
                    <div className="card bg-primary text-white text-center p-3">
                        <h5>Total Products</h5>
                        <h2>{data.totalProducts}</h2>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card bg-success text-white text-center p-3">
                        <h5>Total Customers</h5>
                        <h2>{data.totalCustomers}</h2>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card bg-warning text-dark text-center p-3">
                        <h5>Total Orders</h5>
                        <h2>{data.totalOrders}</h2>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card bg-dark text-white text-center p-3">
                        <h5>Total Sales</h5>
                        <h2>₹{data.totalSales}</h2>
                    </div>
                </div>

            </div>

            <div className="card mt-4 shadow-sm">

                <div className="card-header bg-danger text-white">
                    <h5 className="mb-0">Low Stock Products</h5>
                </div>

                <div className="card-body">

                    {data.lowStock.length == 0 ? (
                        <p className="mb-0">No low stock products.</p>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Category</th>
                                        <th>Available Quantity</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {data.lowStock.map((product)=>(
                                        <tr key={product._id}>
                                            <td>{product.productName}</td>
                                            <td>{product.category}</td>
                                            <td className="text-danger fw-bold">{product.quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                </div>
            </div>

            <div className="card mt-4 shadow-sm">

                <div className="card-header bg-dark text-white">
                    <h5 className="mb-0">Recent Orders</h5>
                </div>

                <div className="card-body">

                    {data.recentOrders.length == 0 ? (
                        <p className="mb-0">No recent orders.</p>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Customer</th>
                                        <th>Total Amount</th>
                                        <th>Order Status</th>
                                        <th>Order Date</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {data.recentOrders.map((order)=>(
                                        <tr key={order._id}>
                                            <td>{order.userId?.name}</td>
                                            <td>₹{order.totalAmount}</td>
                                            <td>{order.orderStatus}</td>
                                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                </div>
            </div>

        </div>
        </>
    )
}

export default Dashboard
