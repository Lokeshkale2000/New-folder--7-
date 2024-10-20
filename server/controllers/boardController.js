const Board = require('../models/Board');

// Get a board by ID
exports.getBoard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) return res.status(404).send('Board not found');
    res.json(board);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Create a new board
exports.createBoard = async (req, res) => {
  const { title } = req.body;
  const newBoard = new Board({ title, lists: [] });
  await newBoard.save();
  res.status(201).json(newBoard);
};

// Add a list to a board
exports.addList = async (req, res) => {
  const { title } = req.body;
  try {
    const board = await Board.findById(req.params.id);
    if (!board) return res.status(404).send('Board not found');

    board.lists.push({ title, cards: [] });
    await board.save();
    res.json(board);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Update the board (e.g., for drag-and-drop updates)
exports.updateBoard = async (req, res) => {
  try {
    const board = await Board.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!board) return res.status(404).send('Board not found');
    res.json(board);
  } catch (error) {
    res.status(500).send('Server error');
  }
};
