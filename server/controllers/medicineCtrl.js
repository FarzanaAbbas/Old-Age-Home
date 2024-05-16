const Medicine = require('../models/Medicine');

const getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

const createMedicine = async (req, res) => {
  const { name, type, dosage, frequency, administrationTimes} = req.body;
  try {
    let medicine = new Medicine({
      name,
      type,
      dosage,
      frequency,
      administrationTimes
    });

    await medicine.save();
    res.json(medicine);
  } catch (err) {
    console.error("Failed to create medicine:", err);  // Ensure this log appears in your console
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const updateMedicine = async (req, res) => {
  const { name, type, dosage, frequency, administrationTimes } = req.body;
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    const updatedMedicine = await Medicine.findByIdAndUpdate(req.params.id, 
      { name, type, dosage, frequency, administrationTimes },
      { new: true, runValidators: true }
    );

    if (!updatedMedicine) {
      return res.status(404).json({ message: 'No update occurred' });
    }

    res.json(updatedMedicine);
  } catch (err) {
    console.error("Error updating medicine:", err);
    res.status(500).json({ message: "Error updating medicine", error: err.message });
  }
};

const deleteMedicine = async (req, res) => {
  try {
    let medicine = await Medicine.findById(req.params.id);
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    await Medicine.findByIdAndDelete(req.params.id);
    res.json({ message: 'Medicine removed' });
  } catch (err) {
    console.error("Error deleting medicine:", err);
    res.status(500).json({ message: "Error deleting medicine", error: err.message });
}
};

module.exports = {
  getAllMedicines,
  createMedicine,
  updateMedicine,
  deleteMedicine
};
