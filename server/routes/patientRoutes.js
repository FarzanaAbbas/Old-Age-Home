const express = require('express');
const { getAllPatients, createPatient, getPatient, updatePatient, deletePatient} = require('../controllers/patientCtrl')

const router = express.Router();

// CRUD operations for Patient
router.get('/all', getAllPatients);
router.post('/create', createPatient);
router.get('/getpatient/:patientId', getPatient);
router.put('/update/:patientId', updatePatient);
router.delete('/delete/:patientId', deletePatient);

module.exports = router;
