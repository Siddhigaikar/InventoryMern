import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

const Home = () => {
  const [products,setProducts]=useState([])

  useEffect(()=>{
    axios.get('http://localhost:4000/products')
    .then((res)=>setProducts(res.data))
    .catch((err)=>console.log(err))
  },[])

  return (
    <>
    <div className="container">
      <div className="row g-3 mt-2">
        {
          products.map((product)=>(
            <div className="col-md-4" key={product._id}>
              <div className="card h-100">
                <img className="card-img-top" src={product.image} alt="Product" />
                <div className="card-body">
                  <h4 className="card-title">{product.productName}</h4>
                  <p className="card-text">{product.description}</p>
                  <h5>Category: {product.category}</h5>
                  <h5>Price: ₹{product.price}</h5>
                  <h5>Quantity: {product.quantity}</h5>
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
    </div>
    </>
  )
}

export default Home