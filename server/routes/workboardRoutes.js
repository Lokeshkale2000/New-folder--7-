const express = require('express');
const router = express.Router();
const workboardController = require('../controllers/workboardController');

// Route to create a new workboard
router.post('/', workboardController.createWorkboard);

// Route to get all workboards (optional for testing)
router.get('/', workboardController.getWorkboards);
router.get('/:id',  workboardController.getWorkboardById);

module.exports = router; 
