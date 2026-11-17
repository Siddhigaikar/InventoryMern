
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
    const [cart,setCart]=useState([])
    const user=JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()

    const loadCart = () => {
        axios.get(`http://localhost:4000/cart/${user.id}`)
        .then((res)=>setCart(res.data))
        .catch((err)=>console.log(err))
    }

    useEffect(()=>{
        loadCart()
    },[])

    const updateQuantity = async(id,quantity) => {
        try {
            const result = await axios.put(`http://localhost:4000/cart/update/${id}`,{
                userId:user.id,
                quantity:quantity
            })
            alert(result.data.message)
            loadCart()
        } catch (error) {
            console.log(error)
        }
    }

    const deleteProduct = async(id) => {
        try {
            const result = await axios.delete(`http://localhost:4000/cart/delete/${id}`,{
                data:{userId:user.id}
            })
            alert(result.data.message)
            loadCart()
        } catch (error) {
            console.log(error)
        }
    }

    const total = cart.reduce((sum,item)=>{
        return sum + (item.productId.price * item.quantity)
    },0)

    return (
        <>
        <div className="container mt-4">
            <h2 className="text-center mb-4">My Shopping Cart</h2>

            {cart.length == 0 ? (
                <h5 className="text-center mt-5">Your cart is empty.</h5>
            ) : (
                <>
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>Image</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {cart.map((item)=>(
                                <tr key={item._id}>
                                    <td>
                                        <img src={item.productId.image} width="70" height="70" alt="Product"/>
                                    </td>
                                    <td>{item.productId.productName}</td>
                                    <td>₹{item.productId.price}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-secondary me-2"
                                            disabled={item.quantity <= 1}
                                            onClick={()=>updateQuantity(item._id,item.quantity-1)}
                                        >-</button>

                                        {item.quantity}

                                        <button
                                            className="btn btn-sm btn-secondary ms-2"
                                            onClick={()=>updateQuantity(item._id,item.quantity+1)}
                                        >+</button>
                                    </td>
                                    <td>₹{item.productId.price * item.quantity}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={()=>deleteProduct(item._id)}
                                        >Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="text-end">
                    <h4>Total Amount: ₹{total}</h4>

                    <button
                        className="btn btn-success mt-2"
                        onClick={()=>navigate("/place-order")}
                    >
                        Proceed to Checkout
                    </button>
                </div>
                </>
            )}
        </div>
        </>
    )
}

export default Cart
