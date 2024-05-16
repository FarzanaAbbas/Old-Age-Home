const Visitor = require('../models/visitor');

// Get all visitors
const getAllVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find();
    // Ensure you send data in an expected format
    res.json({ visitors }); // This will wrap visitors in an object
  } catch (err) {
    console.error("Error fetching visitors:", err.message);
    res.status(500).send("Error fetching visitors");
  }
};

// Add a new visitor
const addVisitor = async (req, res) => {
  try {
    const { name, visitTime, patientName } = req.body;

    // Ensure all required fields are provided
    if (!name || !visitTime) {
      return res.status(400).json({ message: "Name and visit time are required." });
    }

    const newVisitor = new Visitor({
      name,
      visitTime,
      patientName  // this field is optional, so it's okay if it's not included
    });

    const savedVisitor = await newVisitor.save();
    res.status(201).json(savedVisitor);
  } catch (err) {
    console.error("Error adding visitor:", err.message);
    res.status(500).send("Error adding visitor");
  }
};

module.exports ={
  addVisitor,
  getAllVisitors
}