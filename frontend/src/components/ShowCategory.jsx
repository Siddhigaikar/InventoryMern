import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ShowCategory = () => {
    const [categories,setCategories]=useState([])
    const navigate=useNavigate()

    const displayCategories=()=>{
        axios.get('http://localhost:4000/categories')
        .then((res)=>setCategories(res.data))
        .catch((err)=>console.log(err))
    }

    useEffect(()=>{
        displayCategories()
    },[])

    const handleDelete=(id)=>{
        axios.delete(`http://localhost:4000/category/delete/${id}`)
        .then((res)=>{
            alert(res.data.message)
            displayCategories()
        })
        .catch((err)=>console.log(err))
    }

    return (
        <>
        <div className="container mt-4">
            <h3 className="mb-4">Product Categories</h3>
            <div className="row g-3">
                {categories.map((category)=>(
                    <div className="col-md-4" key={category._id}>
                        <div className="card h-100 shadow-sm border-0">
                            <div className="card-body">
                                <h4 className="card-title mb-3">{category.categoryName}</h4>
                                <p className="card-text text-secondary">{category.description}</p>
                                <hr/>
                                <button type="button" className="btn btn-danger btn-sm" onClick={()=>handleDelete(category._id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}

export default ShowCategory