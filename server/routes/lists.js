const express = require("express");
const List = require("../models/List");

const router = express.Router();

// API to get all lists
router.get("/", async (req, res) => {
  try {
    const lists = await List.find();
    res.json(lists);
  } catch (error) {
    console.error("Error fetching lists:", error.message);
    res.status(500).send("Server Error");
  }
});

// API to create a new list
router.post("/", async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "List title is required." });
  }

  try {
    const newList = new List({ title, cards: [] });
    await newList.save();
    res.status(201).json(newList);
  } catch (error) {
    console.error("Error creating list:", error.message);
    res.status(500).send("Error creating list");
  }
});

// API to add a card to a specific list
router.post("/:id/cards", async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: "Card content is required." });
  }

  try {
    const list = await List.findById(id);
    if (!list) {
      return res.status(404).json({ message: "List not found." });
    }

    list.cards.push({ content });
    await list.save();
    res.status(201).json(list);
  } catch (error) {
    console.error("Error adding card:", error.message);
    res.status(500).send("Error adding card");
  }
});

// API to delete a specific list
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const list = await List.findByIdAndDelete(id);
    if (!list) {
      return res.status(404).json({ message: "List not found." });
    }

    res.json({ message: "List deleted successfully." });
  } catch (error) {
    console.error("Error deleting list:", error.message);
    res.status(500).send("Error deleting list");
  }
});

// API to update the order of cards in a specific list
router.put("/:id/update", async (req, res) => {
  const { id } = req.params;
  const { cards } = req.body; // Expecting the updated cards array in the request body

  if (!Array.isArray(cards)) {
    return res.status(400).json({ message: "Cards should be an array." });
  }

  try {
    const list = await List.findByIdAndUpdate(id, { cards }, { new: true }); // Return updated list

    if (!list) {
      return res.status(404).json({ message: "List not found." });
    }

    res.status(200).json(list); // Return the updated list
  } catch (error) {
    console.error("Error updating list:", error.message);
    res.status(500).send("Error updating list");
  }
});

// API to delete a specific card from a list
router.delete("/:listId/cards/:cardId", async (req, res) => {
  const { listId, cardId } = req.params;

  try {
    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ message: "List not found." });
    }

    list.cards = list.cards.filter((card) => card._id.toString() !== cardId); // Ensure comparison is correct
    await list.save();

    res.json({ message: "Card deleted successfully." });
  } catch (error) {
    console.error("Error deleting card:", error.message);
    res.status(500).send("Error deleting card");
  }
});

module.exports = router;
