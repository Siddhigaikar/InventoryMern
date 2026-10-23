
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, NavLink } from 'react-router-dom'

const Register = () => {
    const [user,setUser]=useState({name:'',email:'',password:''})
    const navigate=useNavigate()

    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:4000/register',user)
        .then((res)=>{
            alert(res.data.message)
            if(res.data.message=="User registered successfully..."){
                navigate('/login')
            }
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
                        <h4 className="card-title">Register</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="name" placeholder="" onChange={(e)=>setUser({...user,name:e.target.value})} required/>
                                <label htmlFor="name">Name</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input type="email" className="form-control" id="email" placeholder="" onChange={(e)=>setUser({...user,email:e.target.value})} required/>
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input type="password" className="form-control" id="password" placeholder="" onChange={(e)=>setUser({...user,password:e.target.value})} required/>
                                <label htmlFor="password">Password</label>
                            </div>

                            <button type="submit" className="btn btn-primary">Register</button>
                            <p className="mt-3">Already have an account? <NavLink to="/login">Login</NavLink></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Register
