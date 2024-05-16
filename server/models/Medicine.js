const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,  //e.g., tablet, injection
    required: true,
    trim: true
  },
  dosage: {
    type: String,
    required: true,
    trim: true
  },
  frequency: {  //Defines how often the medicine should be taken
    type: String,
    required: true,
    trim: true //it will remove white space.
  },
  administrationTimes: [{
    type: String,   // It will add timings of the medicine,which the medicine should be taken by the patient.
    required: true
  }],

}, {
  timestamps: true // Includes createdAt and updatedAt fields
});

module.exports = mongoose.model('Medicine', medicineSchema);
