
const express = require('express');
const router = express.Router();

const {register,login,displayUsers} = require('../controller/userController');

router.post('/register',register);
router.post('/login',login);
router.get('/users',displayUsers);

module.exports = router;
