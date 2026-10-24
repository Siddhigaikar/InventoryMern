
import axios from 'axios'
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Login = () => {
    const [user,setUser]=useState({
        email:"",
        password:""
    })

    const navigate=useNavigate()

    const handleChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:4000/login',user)
        .then((res)=>{
        alert(res.data.message)
        if(res.data.message==="Login successful"){
            localStorage.setItem("login",true)
            navigate('/home')
        }
    })
        .catch((err)=>{
            console.log(err)
            alert(err.response?.data?.message || "Login failed")
        })
    }

    return (
        <>
        <h3 className="text-center mt-5">Login With Us</h3>
        <div className="container border shadow rounded col-5 p-3">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={user.email} onChange={handleChange} required/>
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={user.password} onChange={handleChange} required/>
                </div>

                <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>

            <p className="text-center mt-3">Don't have an account? <NavLink to="/register">Register</NavLink></p>
        </div>
        </>
    )
}

export default Login
