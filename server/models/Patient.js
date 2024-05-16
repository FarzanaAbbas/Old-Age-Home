const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const patientSchema = new Schema({
  personalInfo: {
    firstName: String,
    lastName: String,
    phoneNumber:Number,
    gender:String,
    age:Number,
    place:String
  },


  medicineSchedule: [{
    medicineName: String,
    timings: [Date]
  }],

  visitors: [{
    visitorName: String,
    visitTime: Date,
  }],

  treatmentHistory: [{
    treatment: String,
    doctorName: String, 
  }],

  currentCondition: String,
}, { timestamps: true });

const Patient = mongoose.model('Patient',patientSchema)
module.exports = Patient
