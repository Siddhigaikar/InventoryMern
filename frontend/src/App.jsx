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

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/register" replace/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<><Navbar/><Home/></>}/>
        <Route path='/add' element={<><Navbar/><AddProduct/></>}/>
        <Route path='/edit/:id' element={<><Navbar/><EditProduct/></>}/>
        <Route path='/products/:id' element={<><Navbar/><ShowProduct/></>}/>
        <Route path='/category/add' element={<><Navbar/><AddCategory/></>}/>
        <Route path='/categories' element={<><Navbar/><ShowCategory/></>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App