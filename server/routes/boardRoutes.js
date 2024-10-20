const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');

// Get a specific board
router.get('/:id', boardController.getBoard);

// Create a new board
router.post('/', boardController.createBoard);

// Add a new list to a board
router.post('/:id/lists', boardController.addList);

// Update a board (e.g., after drag-and-drop)
router.put('/:id', boardController.updateBoard);

module.exports = router;
