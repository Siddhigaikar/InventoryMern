
const express = require('express');
const { register, login, displayUsers } = require('../controller/userController');

const u_router = express.Router();

u_router.post("/register",register);
u_router.post("/login",login);
u_router.get("/users",displayUsers);

module.exports=u_router;
