
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

const Home = () => {
  const [products,setProducts]=useState([])
  const [search,setSearch]=useState('')

  useEffect(()=>{
    axios.get('http://localhost:4000/products')
    .then((res)=>setProducts(res.data))
    .catch((err)=>console.log(err))
  },[])

  const filteredProducts=products.filter((product)=>
    product.productName.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
    <div className="container">
      <div className="mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search products by name..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
      </div>

      <div className="row g-3 mt-2">
        {
          filteredProducts.map((product)=>(
            <div className="col-md-4" key={product._id}>
              <div className="card h-100">
                <img className="card-img-top" src={product.image} alt="Product" />
                <div className="card-body">
                  <h4 className="card-title">{product.productName}</h4>
                  <p className="card-text">{product.description}</p>
                  <h5>Category: {product.category}</h5>
                  <h5>Price: ₹{product.price}</h5>
                  <h5>Quantity: {product.quantity}</h5>

                  {product.quantity <= 5 && (
                    <p className="text-danger fw-bold">Low Stock Warning!</p>
                  )}

                  <h5>Supplier: {product.supplierName}</h5>

                  <NavLink
                    className="btn btn-primary"
                    to={`/products/${product._id}`}
                    role="button"
                  >Read More</NavLink>
                </div>
              </div>
            </div>
          ))
        }
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center mt-4">No products found.</p>
      )}
    </div>
    </>
  )
}

export default Home
