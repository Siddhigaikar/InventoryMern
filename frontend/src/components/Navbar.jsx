
import React from 'react'
import {NavLink, useNavigate} from 'react-router-dom'

const Navbar = () => {

    const navigate=useNavigate()
    const role=localStorage.getItem("role")

    const handleLogout=()=>{
        localStorage.removeItem("login")
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        localStorage.removeItem("role")
        navigate('/login')
    }

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container">

            <NavLink className="navbar-brand" to="/home">Inventory</NavLink>

            <button
                className="navbar-toggler d-lg-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapsibleNavId"
                aria-controls="collapsibleNavId"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="collapsibleNavId">

                <ul className="navbar-nav me-auto mt-2 mt-lg-0">

                    <li className="nav-item">
                        <NavLink className="nav-link" to="/home">Home</NavLink>
                    </li>

                    {role == "admin" && (
                        <>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/add">Add Product</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/categories">Categories</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/category/add">Add Category</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/orders">Manage Orders</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
                            </li>

                        </>
                    )}

                    {role == "customer" && (
                        <>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/cart">My Cart</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/my-orders">My Orders</NavLink>
                            </li>
                        </>
                    )}

                </ul>

                <span className="text-white me-3">
                    {role == "admin" ? "Admin" : "Customer"}
                </span>

                <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                </button>

            </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
