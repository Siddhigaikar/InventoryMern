
const express = require('express');
const router = express.Router();

const {dashboardData} = require('../controller/dashboardController');

router.get('/dashboard',dashboardData);

module.exports = router;
