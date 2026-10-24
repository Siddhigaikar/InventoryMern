
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'

const ShowProduct = () => {
  const [product,setProduct]=useState({})
  const {id}=useParams()
  const navigate=useNavigate()

  useEffect(()=>{
    axios.get(`http://localhost:4000/products/${id}`)
    .then((res)=>setProduct(res.data))
    .catch((err)=>console.log(err))
  },[id])

  const handleDelete = () => {
    axios.delete(`http://localhost:4000/delete/${id}`)
      .then((res) => {
        alert(res.data.message)
        navigate('/home')
      })
      .catch((err) => console.log(err))
  }

  return (
    <>
    <div className="container">
      <div className="row justify-content-center align-items-center g-2">
        <div className="col"><div className="card">
          <img className="card-img-top" src={product.image} alt="Product" />
          <div className="card-body">
            <h4 className="card-title">{product.productName}</h4>
            <p className="card-text">{product.description}</p>
            <h5>Category: {product.category}</h5>
            <h5>Price: ₹{product.price}</h5>
            <h5>Quantity: {product.quantity}</h5>
            <h5>Supplier: {product.supplierName}</h5>

            <NavLink
              className="btn btn-secondary me-3"
              to="/home"
              role="button"
              >Back</NavLink>

            <NavLink
              className="btn btn-warning me-3"
              to={`/edit/${id}`}
              role="button"
              >Edit</NavLink>

            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ShowProduct
