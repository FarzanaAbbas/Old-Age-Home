const Patient = require('../models/Patient');

const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (err) {
        res.status(500).send({ message: "Error retrieving patients", error: err.message });
    }
};

const createPatient = async (req, res) => {
    try {
        const newPatient = new Patient(req.body);
        const patient = await newPatient.save();
        res.status(201).json(patient);
    } catch (err) {
        res.status(400).send({ message: "Error creating patient", error: err.message });
    }
};

const getPatient = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.patientId);
        if (!patient) {
            return res.status(404).send({ message: "Patient not found with ID: " + req.params.patientId });
        }
        res.json(patient);
    } catch (err) {
        res.status(404).send({ message: "Error finding patient with ID: " + req.params.patientId, error: err.message });
    }
};

const updatePatient = async (req, res) => {
    try {
        const updatedPatient = await 
        if (!updatedPatient) {
            return res.status(404).send({ message: "No patient found with ID: " + req.params.patientId });
        }
        res.json(updatedPatient);
    } catch (err) {
        res.status(400).send({ message: "Error updating patient", error: err.message });
    }
};

const deletePatient = async (req, res) => {
    try {
        const result = await Patient.findByIdAndDelete(req.params.patientId);
        if (!result) {
            return res.status(404).send({ message: "No patient found with ID: " + req.params.patientId });
        }
        res.status(204).send();
    } catch (err) {
        res.status(404).send({ message: "Error deleting patient", error: err.message });
    }
};

module.exports = {
    getAllPatients,
    createPatient,
    getPatient,
    updatePatient,
    deletePatient
};
