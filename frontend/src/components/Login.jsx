
import React, { useState } from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'

function Login() {

    const [data,setData] = useState({
        email:"",
        password:""
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setData({...data,[e.target.name]:e.target.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        try {
            const result = await axios.post("http://localhost:4000/login",data)

            alert(result.data.message)

            if(result.data.message == "Login successful"){

                localStorage.setItem("login",true)
                localStorage.setItem("token",result.data.token)
                localStorage.setItem("user",JSON.stringify(result.data.user))
                localStorage.setItem("role",result.data.user.role)

                navigate("/home")
            }

        } catch (error) {
            console.log(error)
            alert("Login failed")
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <h2 className="text-center mb-4">Login</h2>

                    <form onSubmit={handleSubmit}>

                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="Email"
                                value={data.email}
                                onChange={handleChange}
                                required
                            />
                            <label>Email</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="Password"
                                value={data.password}
                                onChange={handleChange}
                                required
                            />
                            <label>Password</label>
                        </div>

                        <button type="submit" className="btn btn-primary w-100">
                            Login
                        </button>

                    </form>

                    <p className="text-center mt-3">
                        Don't have an account?
                        <NavLink to="/register"> Register</NavLink>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
