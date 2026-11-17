
import React from 'react'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Home from './components/Home'
import AddProduct from './components/AddProduct'
import EditProduct from './components/EditProduct'
import ShowProduct from './components/ShowProduct'
import Navbar from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import AddCategory from './components/AddCategory'
import ShowCategory from './components/ShowCategory'
import Register from './components/Register'
import Login from './components/Login'
import Cart from './components/Cart'
import PlaceOrder from './components/PlaceOrder'
import MyOrders from './components/MyOrders'
import Orders from './components/Orders'
import Dashboard from './components/Dashboard'

const AdminRoute = ({children}) => {
  if(!localStorage.getItem("login")){
    return <Navigate to="/login"/>
  }

  if(localStorage.getItem("role") != "admin"){
    return <Navigate to="/home"/>
  }

  return children
}

const UserRoute = ({children}) => {
  if(!localStorage.getItem("login")){
    return <Navigate to="/login"/>
  }

  return children
}

const CustomerRoute = ({children}) => {
  if(!localStorage.getItem("login")){
    return <Navigate to="/login"/>
  }

  if(localStorage.getItem("role") != "customer"){
    return <Navigate to="/home"/>
  }

  return children
}

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/register" replace/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>

        <Route path='/home' element={<UserRoute><><Navbar/><Home/></></UserRoute>}/>

        <Route path='/add' element={<AdminRoute><><Navbar/><AddProduct/></></AdminRoute>}/>
        <Route path='/edit/:id' element={<AdminRoute><><Navbar/><EditProduct/></></AdminRoute>}/>
        <Route path='/products/:id' element={<UserRoute><><Navbar/><ShowProduct/></></UserRoute>}/>
        <Route path='/category/add' element={<AdminRoute><><Navbar/><AddCategory/></></AdminRoute>}/>
        <Route path='/categories' element={<AdminRoute><><Navbar/><ShowCategory/></></AdminRoute>}/>

        <Route path='/cart' element={<CustomerRoute><><Navbar/><Cart/></></CustomerRoute>}/>
        <Route path='/place-order' element={<CustomerRoute><><Navbar/><PlaceOrder/></></CustomerRoute>}/>
        <Route path='/my-orders' element={<CustomerRoute><><Navbar/><MyOrders/></></CustomerRoute>}/>
        <Route path='/orders' element={<AdminRoute><><Navbar/><Orders/></></AdminRoute>}/>
        <Route path='/dashboard' element={<AdminRoute><><Navbar/><Dashboard/></></AdminRoute>}/>

      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
