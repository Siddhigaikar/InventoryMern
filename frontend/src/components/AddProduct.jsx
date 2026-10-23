import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {
  const [product,setProduct]=useState({image:'',productName:'',description:'',category:'',price:'',quantity:'',supplierName:''})
  const [categories,setCategories]=useState([])
  const navigate=useNavigate()

  useEffect(()=>{
    axios.get('http://localhost:4000/categories')
    .then((res)=>setCategories(res.data))
    .catch((err)=>console.log(err))
  },[])

  const handleSubmit=(e)=>{
    e.preventDefault()
    axios.post('http://localhost:4000/add',product)
    .then((res)=>{
        console.log(res.data)
        alert("Product added successfully")
        navigate('/')
    })
    .catch((err)=>{
        console.log(err)
        alert(err.response?.data?.message || "Product not added")
    })
}

  return (
    <>
    <div className="container mt-4">
      <div className="row justify-content-center align-items-center g-2">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Add Product</h4>
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="image" placeholder="" onChange={(e)=>setProduct({...product,image:e.target.value})}/>
                  <label htmlFor="image">Image URL</label>
                </div>

                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="productName" placeholder="" onChange={(e)=>setProduct({...product,productName:e.target.value})}/>
                  <label htmlFor="productName">Product Name</label>
                </div>

                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="description" placeholder="" onChange={(e)=>setProduct({...product,description:e.target.value})}/>
                  <label htmlFor="description">Description</label>
                </div>

                <div className="form-floating mb-3">
                  <select className="form-select" id="category" value={product.category} onChange={(e)=>setProduct({...product,category:e.target.value})}>
                    <option value="">Select Category</option>
                    {categories.map((category)=>(<option key={category._id} value={category.categoryName}>{category.categoryName}</option>))}
                  </select>
                  <label htmlFor="category">Category</label>
                </div>

                <div className="form-floating mb-3">
                  <input type="number" className="form-control" id="price" placeholder="" onChange={(e)=>setProduct({...product,price:e.target.value})}/>
                  <label htmlFor="price">Price</label>
                </div>

                <div className="form-floating mb-3">
                  <input type="number" className="form-control" id="quantity" placeholder="" onChange={(e)=>setProduct({...product,quantity:e.target.value})}/>
                  <label htmlFor="quantity">Quantity</label>
                </div>

                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="supplierName" placeholder="" onChange={(e)=>setProduct({...product,supplierName:e.target.value})}/>
                  <label htmlFor="supplierName">Supplier Name</label>
                </div>

                <button type="submit" className="btn btn-primary">Add Product</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default AddProduct
