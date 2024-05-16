const express = require('express');
const {getAllVisitors, addVisitor} = require('../controllers/visitorCtrl')

const router = express. Router();

// Route to get all visitors
router.get('/all', getAllVisitors);

// Route to get a new visitor
router.post('/create', addVisitor);

module.exports = router;