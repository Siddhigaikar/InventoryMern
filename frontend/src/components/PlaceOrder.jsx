
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {

    const [address,setAddress] = useState("")
    const [paymentMethod,setPaymentMethod] = useState("Cash on Delivery")

    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"))

    const handleSubmit = async(e) => {
        e.preventDefault()

        try {
            const result = await axios.post("http://localhost:4000/order/place",{
                userId:user.id,
                address:address,
                paymentMethod:paymentMethod
            })

            alert(result.data.message)

            if(result.data.message == "Order placed successfully"){
                navigate("/home")
            }

        } catch (error) {
            console.log(error)
            alert("Unable to place order")
        }
    }

    return (
        <>
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-7">

                    <h2 className="text-center mb-4">Checkout</h2>

                    <div className="card shadow">
                        <div className="card-body">

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label className="form-label">Delivery Address</label>
                                    <textarea
                                        className="form-control"
                                        rows="4"
                                        placeholder="Enter your complete delivery address"
                                        value={address}
                                        onChange={(e)=>setAddress(e.target.value)}
                                        required
                                    ></textarea>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Payment Method</label>
                                    <select
                                        className="form-select"
                                        value={paymentMethod}
                                        onChange={(e)=>setPaymentMethod(e.target.value)}
                                    >
                                        <option value="Cash on Delivery">Cash on Delivery</option>
                                    </select>
                                </div>

                                <button type="submit" className="btn btn-success w-100">
                                    Place Order
                                </button>

                            </form>

                        </div>
                    </div>

                </div>
            </div>
        </div>
        </>
    )
}

export default PlaceOrder
