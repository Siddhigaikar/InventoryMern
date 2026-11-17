
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const MyOrders = () => {

    const [orders,setOrders] = useState([])
    const user = JSON.parse(localStorage.getItem("user"))

    useEffect(()=>{
        axios.get(`http://localhost:4000/orders/${user.id}`)
        .then((res)=>setOrders(res.data))
        .catch((err)=>console.log(err))
    },[])

    return (
        <>
        <div className="container mt-4">

            <h2 className="text-center mb-4">My Orders</h2>

            {orders.length == 0 ? (
                <h5 className="text-center mt-5">You haven't placed any orders yet.</h5>
            ) : (
                orders.map((order)=>(
                    <div className="card mb-4 shadow-sm" key={order._id}>

                        <div className="card-header d-flex justify-content-between">
                            <strong>Order ID: {order._id}</strong>
                            <span className="badge bg-primary">{order.orderStatus}</span>
                        </div>

                        <div className="card-body">

                            <h6>Ordered Products</h6>

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

                            <p className="text-muted mb-0">
                                Order Date: {new Date(order.createdAt).toLocaleDateString()}
                            </p>

                        </div>
                    </div>
                ))
            )}

        </div>
        </>
    )
}

export default MyOrders
