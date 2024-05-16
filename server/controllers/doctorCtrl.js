const Doctor = require('../models/Doctor');

const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find().populate('patientsToVisit');
        res.json(doctors);
    } catch (err) {
        res.status(500).send('Server Error: ' + err.message);
    }
};

const addDoctor = async (req, res) => {
    try {
        const { name, phoneNumber, specialization } = req.body;
        const newDoctor = new Doctor({
            personalInfo: {
                name,
                phoneNumber,
                specialization
            }
        });
        const doctor = await newDoctor.save();
        res.json(doctor);
    } catch (err) {
        res.status(500).send('Server Error: ' + err.message);
    }
};

const updateDoctor = async (req, res) => {
    console.log('Updating doctor with data:', req.body);
    try {
        const doctor = await Doctor.findByIdAndUpdate(
            req.params.id,
            { $set: { "personalInfo": req.body.personalInfo }},
            { new: true }
        );
        console.log('Updated doctor:', doctor);
        if (!doctor) {
            return res.status(404).send('Doctor not found');
        }
        res.json(doctor);
    } catch (err) {
        res.status(500).send('Server Error: ' + err.message);
    }
};



const deleteDoctor = async (req, res) => {
    try {
        const result = await Doctor.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).send('Doctor not found');
        }
        res.status(200).send({ message: 'Doctor deleted successfully' });
    } catch (err) {
        console.error('Failed to delete doctor:', err);
        res.status(500).send('Internal Server Error');
    }
};


module.exports = {
    getAllDoctors,
    addDoctor,
    updateDoctor,
    deleteDoctor,
};
