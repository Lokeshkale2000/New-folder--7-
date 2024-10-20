const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
});

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  cards: [cardSchema],
});

module.exports = mongoose.model("List", listSchema);
