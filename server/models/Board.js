const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  content: { type: String, required: true },
});

const listSchema = new mongoose.Schema({
  title: { type: String, required: true },
  cards: [cardSchema],
});

const boardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  lists: [listSchema],
});

const Board = mongoose.model('Board', boardSchema);
module.exports = Board;
