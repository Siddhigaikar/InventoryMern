import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
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
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/add' element={<AddProduct/>}/>
        <Route path='/edit/:id' element={<EditProduct/>}/>
        <Route path='/products/:id' element={<ShowProduct/>}/>
        <Route path='/category/add' element={<AddCategory/>}/>
        <Route path='/categories' element={<ShowCategory/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
