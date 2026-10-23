import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddCategory = () => {
  const [category,setCategory]=useState({categoryName:'',description:''})
  const navigate=useNavigate()

  const handleSubmit=(e)=>{
    e.preventDefault()
    axios.post('http://localhost:4000/category/add',category)
    .then((res)=>{
      console.log(res.data)
      navigate('/categories')
    })
    .catch((err)=>console.log(err))
  }

  return (
    <>
    <div className="container mt-4">
      <div className="row justify-content-center align-items-center g-2">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Add Category</h4>
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="categoryName" placeholder="" required onChange={(e)=>setCategory({...category,categoryName:e.target.value})}/>
                  <label htmlFor="categoryName">Category Name</label>
                </div>

                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="description" placeholder="" required onChange={(e)=>setCategory({...category,description:e.target.value})}/>
                  <label htmlFor="description">Description</label>
                </div>

                <button type="submit" className="btn btn-primary">Add Category</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default AddCategory