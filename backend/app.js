const express = require('express');
const cors = require('cors');

const { connectDB } = require('./db');
const p_router = require('./router/productRouter');
const u_router = require('./router/userRouter');
const cat_router = require('./router/categoryRouter');

const app=express();

connectDB()

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.use("/",p_router)
app.use("/",u_router)
app.use("/",cat_router)

app.listen(4000,()=>{
    console.log("running.....");
})
