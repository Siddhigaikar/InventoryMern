
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Orders = () => {

    const [orders,setOrders] = useState([])

    const loadOrders = () => {
        axios.get("http://localhost:4000/orders")
        .then((res)=>setOrders(res.data))
        .catch((err)=>console.log(err))
    }

    useEffect(()=>{
        loadOrders()
    },[])

    const updateStatus = async(id,orderStatus) => {
        try {
            const result = await axios.put(`http://localhost:4000/order/update/${id}`,{
                orderStatus:orderStatus
            })

            alert(result.data.message)
            loadOrders()

        } catch (error) {
            console.log(error)
            alert("Unable to update order status")
        }
    }

    return (
        <>
        <div className="container mt-4">

            <h2 className="text-center mb-4">Manage Customer Orders</h2>

            {orders.length == 0 ? (
                <h5 className="text-center mt-5">No orders available.</h5>
            ) : (
                orders.map((order)=>(
                    <div className="card shadow-sm mb-4" key={order._id}>

                        <div className="card-header d-flex justify-content-between">
                            <strong>Order ID: {order._id}</strong>
                            <span className="badge bg-primary">{order.orderStatus}</span>
                        </div>

                        <div className="card-body">

                            <h5>Customer Details</h5>

                            <p><strong>Name:</strong> {order.userId?.name}</p>
                            <p><strong>Email:</strong> {order.userId?.email}</p>

                            <hr/>

                            <h5>Ordered Products</h5>

                            {order.products.map((product,index)=>(
                                <div className="row align-items-center mb-3" key={index}>

                                    <div className="col-md-2">
                                        <img
                                            src={product.image}
                                            width="80"
                                            height="80"
                                            alt="Product"
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <h6>{product.productName}</h6>
                                        <p className="mb-0">Price: ₹{product.price}</p>
                                        <p className="mb-0">Quantity: {product.quantity}</p>
                                    </div>

                                    <div className="col-md-4 text-md-end">
                                        <strong>₹{product.price * product.quantity}</strong>
                                    </div>

                                </div>
                            ))}

                            <hr/>

                            <p><strong>Delivery Address:</strong> {order.address}</p>
                            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                            <p><strong>Payment Status:</strong> {order.paymentStatus}</p>

                            <h5>Total Amount: ₹{order.totalAmount}</h5>

                            <p className="text-muted">
                                Order Date: {new Date(order.createdAt).toLocaleDateString()}
                            </p>

                            <div className="row mt-3">
                                <div className="col-md-5">
                                    <label className="form-label">Update Order Status</label>

                                    <select
                                        className="form-select"
                                        value={order.orderStatus}
                                        onChange={(e)=>updateStatus(order._id,e.target.value)}
                                    >
                                        <option value="Placed">Placed</option>
                                        <option value="Confirmed">Confirmed</option>
                                        <option value="Packed">Packed</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                    </div>
                ))
            )}

        </div>
        </>
    )
}

export default Orders
