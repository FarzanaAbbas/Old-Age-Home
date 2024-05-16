const express = require('express');
const {createMedicine, getAllMedicines, updateMedicine, deleteMedicine} = require('../controllers/medicineCtrl')

const router = express.Router();

router.get('/all', getAllMedicines);
router.post('/create', createMedicine);
router.put('/update/:id', updateMedicine);
router.delete('/delete/:id', deleteMedicine);

module.exports = router; 
