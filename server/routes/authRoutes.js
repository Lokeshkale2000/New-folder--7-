const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// Routes
router.post('/register', register); // Registration route
router.post('/login', login); // Login route

module.exports = router;
