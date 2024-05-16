const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const visitorSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  visitTime: {
    type: Date,
    required: true
  },
  patientName: {
    type: String,
    required: false  
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Visitor', visitorSchema);
