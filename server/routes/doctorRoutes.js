const express = require('express');
const {getAllDoctors, addDoctor, updateDoctor, deleteDoctor} = require('../controllers/doctorCtrl')
const router = express.Router();

// GET request to fetch all doctors
router.get('/all', getAllDoctors);

// POST request to add a new doctor
router.post('/create', addDoctor);

// PUT request to update an existing doctor's details
router.put('/update/:id', updateDoctor);

// DELETE request to remove a doctor
router.delete('/delete/:id',deleteDoctor);

module.exports = router;
