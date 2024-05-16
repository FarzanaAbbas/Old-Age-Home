const mongoose = require('mongoose');
const Schema = mongoose.Schema

const doctorSchema = new Schema({
  personalInfo: {
    name:String,
    phoneNumber:Number,
    specialization:String

  },
  patientsToVisit: [{ type: Schema.Types.ObjectId, ref: 'Patient' }],

  treatments: [{
    treatmentName: String,
    description: String,
  }],

  timing: [{
    day: String,
    startTime: Date,
    endTime: Date,
  }],
}, { timestamps: true });

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor
