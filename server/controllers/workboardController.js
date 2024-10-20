const Workboard = require('../models/Workboard');

// Create a new workboard
const createWorkboard = async (req, res) => {
    try {
        const { title, visibility } = req.body;
        const newWorkboard = new Workboard({ title, visibility });
        await newWorkboard.save();
        res.status(201).json({ message: 'Workboard created successfully', newWorkboard });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating workboard', error });
    }
};

// Get all workboards
const getWorkboards = async (req, res) => {
    try {
        const workboards = await Workboard.find();
        res.status(200).json(workboards);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching workboards', error });
    }
};
const getWorkboardById = async (req, res) => {
    const { id } = req.params; // Change _id to id
  
    try {
      const workboard = await Workboard.findById(id); // Use id here
      if (!workboard) {
        return res.status(404).json({ message: 'Workboard not found' });
      }
      res.status(200).json(workboard);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching workboard', error });
    }
  };
  

module.exports = { createWorkboard, getWorkboards, getWorkboardById };
