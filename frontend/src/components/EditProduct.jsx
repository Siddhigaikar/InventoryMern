
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditProduct = () => {
  const [product,setProduct]=useState({})
  const {id}=useParams()
  const navigate=useNavigate()

  useEffect(()=>{
    axios.get(`http://localhost:4000/products/${id}`)
    .then((res)=>setProduct(res.data))
    .catch((err)=>console.log(err))
  },[id])

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.put(`http://localhost:4000/edit/${id}`, product)
      .then((res) => {
        alert(res.data.message)
        navigate(`/products/${id}`)
      })
      .catch((err) => console.log(err))
  }

  return (
    <>
    <div className="container">
      <div className="row justify-content-center align-items-center g-2">
        <div className="col"><div className="card">
          <div className="card-body">
            <h4 className="card-title">Edit Product</h4>
            <form onSubmit={handleSubmit}>

              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="image" placeholder="" value={product.image || ''} onChange={(e)=>setProduct({...product,image:e.target.value})}/>
                <label htmlFor="image">Image URL</label>
              </div>

              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="productName" placeholder="" value={product.productName || ''} onChange={(e)=>setProduct({...product,productName:e.target.value})}/>
                <label htmlFor="productName">Product Name</label>
              </div>

              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="description" placeholder="" value={product.description || ''} onChange={(e)=>setProduct({...product,description:e.target.value})}/>
                <label htmlFor="description">Description</label>
              </div>

              <div className="form-floating mb-3">
                <select className="form-select" id="category" value={product.category || ''} onChange={(e)=>setProduct({...product,category:e.target.value})}>
                  <option value="">Select Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Grocery">Grocery</option>
                  <option value="Clothing">Clothing</option>
                </select>
                <label htmlFor="category">Category</label>
              </div>

              <div className="form-floating mb-3">
                <input type="number" className="form-control" id="price" placeholder="" value={product.price || ''} onChange={(e)=>setProduct({...product,price:e.target.value})}/>
                <label htmlFor="price">Price</label>
              </div>

              <div className="form-floating mb-3">
                <input type="number" className="form-control" id="quantity" placeholder="" value={product.quantity || ''} onChange={(e)=>setProduct({...product,quantity:e.target.value})}/>
                <label htmlFor="quantity">Quantity</label>
              </div>

              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="supplierName" placeholder="" value={product.supplierName || ''} onChange={(e)=>setProduct({...product,supplierName:e.target.value})}/>
                <label htmlFor="supplierName">Supplier Name</label>
              </div>

              <button type="submit" className="btn btn-warning">Edit Product</button>
            </form>
          </div>
        </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default EditProduct
