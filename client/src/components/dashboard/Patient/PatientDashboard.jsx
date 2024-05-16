import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../Navbar/Navbar';
import './Patient.css';

const PatientDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [selectedPatientDetails, setSelectedPatientDetails] = useState(null);
  const [error, setError] = useState('');
  const [patientFormData, setPatientFormData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      gender: '',
      age: '',
      place: ''
    },
    medicineSchedule: [{ medicineName: '', timings: [] }],
    visitors: [{ visitorName: '', visitTime: '' }],
    treatmentHistory: [{ treatment: '', doctorName: '' }]
  });

  useEffect(() => {
    fetchPatients();
  }, []);


  const fetchPatients = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('http://localhost:3000/api/v1/patients/all');
      setPatients(data);
    } catch (err) {
      console.error('Failed to fetch patients', err);
      setError('Failed to fetch patients');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event, category = null, index = null, subCategory = null) => {
    const { name, value } = event.target;
    if (category && index !== null) {
      const updatedList = [...patientFormData[category]];
      if (subCategory) {
        const updatedSubCategory = Array.isArray(updatedList[index][subCategory]) ? updatedList[index][subCategory] : [];
        updatedSubCategory[0] = value;
        updatedList[index][subCategory] = updatedSubCategory;
      } else {
        updatedList[index][name] = value;
      }
      setPatientFormData(prev => ({ ...prev, [category]: updatedList }));
    } else {
      setPatientFormData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [name]: value } }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataWithDates = {
      ...patientFormData,
      medicineSchedule: patientFormData.medicineSchedule.map(med => ({
        ...med,
        timings: med.timings.map(time => new Date(`1970-01-01T${time}:00`).toISOString())
      }))
    };

    try {
      const response = selectedPatientId
        ? await axios.put(`http://localhost:3000/api/v1/patients/update/${selectedPatientId}`, formDataWithDates)
        : await axios.post('http://localhost:3000/api/v1/patients/create', formDataWithDates);

      const updatedPatients = selectedPatientId
        ? patients.map(patient => patient._id === selectedPatientId ? { ...patient, ...response.data } : patient)
        : [...patients, response.data];
      setPatients(updatedPatients);
      resetForm();
      setSelectedPatientId(null);
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error.response) {
        console.error('Response:', error.response.data);
      }
    }
  };

  const resetForm = () => {
    setPatientFormData({
      personalInfo: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        gender: '',
        age: '',
        place: ''
      },
      medicineSchedule: [{ medicineName: '', timings: [] }],
      visitors: [{ visitorName: '', visitTime: '' }],
      treatmentHistory: [{ treatment: '', doctorName: '' }]
    });
  };

  const selectPatient = (patientId) => {
    const patientDetails = patients.find(patient => patient._id === patientId);
    if (patientDetails) {
      setSelectedPatientDetails(patientDetails);
      console.log(patientDetails);  // Debugging to check the structure
      setPatientFormData({
        personalInfo: patientDetails.personalInfo,
        medicineSchedule: patientDetails.medicineSchedule.map(med => ({
          ...med,
          timings: med.timings.map(time => new Date(time).toISOString().substr(11, 5))
        })),
        visitors: patientDetails.visitors,
        treatmentHistory: patientDetails.treatmentHistory
      });
      setSelectedPatientId(patientId);
    } else {
      console.log('No patient found with ID:', patientId);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  return (
    <>
      <Navbar />
      <div className="container">
        <h1 style={{color:"#007bff", textAlign:"center"}}><strong>Patient Dashboard</strong></h1>
        <form onSubmit={handleSubmit}>
          {/* Personal Info Fields */}
          <div className="section">
            <h2>Personal Information</h2>
            {Object.keys(patientFormData.personalInfo).map(key => (
              <input
                key={key}
                type="text"
                name={key}
                value={patientFormData.personalInfo[key]}
                onChange={(e) => handleInputChange(e, 'personalInfo')}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                required
              />
            ))}
          </div>

          {/* Medicine Schedule */}
          <div className="section">
            <h2>Medicine Schedule</h2>
            {patientFormData.medicineSchedule.map((medicine, index) => (
              <div key={index}>
                <input
                  type="text"
                  name="medicineName"
                  value={medicine.medicineName}
                  onChange={(e) => handleInputChange(e, 'medicineSchedule', index)}
                  placeholder="Medicine Name"
                  required
                />
                <input
                  type="time"
                  name="timings"
                  value={medicine.timings}
                  onChange={(e) => handleInputChange(e, 'medicineSchedule', index, 'timings')}
                  required
                />
              </div>
            ))}
          </div>

          {/* Visitor Info */}
          <div className="section">
            <h2>Visitors</h2>
            {patientFormData.visitors.map((visitor, index) => (
              <div key={index}>
                <input
                  type="text"
                  name="visitorName"
                  value={visitor.visitorName}
                  onChange={(e) => handleInputChange(e, 'visitors', index)}
                  placeholder="Visitor Name"
                  required
                />
                <input
                  type="datetime-local"
                  name="visitTime"
                  value={visitor.visitTime.slice(0, 16)}
                  onChange={(e) => handleInputChange(e, 'visitors', index)}
                  required
                />
              </div>
            ))}
          </div>

          {/* Treatment History */}
          <div className="section">
            <h2>Treatment History</h2>
            {patientFormData.treatmentHistory.map((treatment, index) => (
              <div key={index}>
                <input
                  type="text"
                  name="treatment"
                  value={treatment.treatment}
                  onChange={(e) => handleInputChange(e, 'treatmentHistory', index)}
                  placeholder="Treatment Description"
                  required
                />
                <input
                  type="text"
                  name="doctorName"
                  value={treatment.doctorName}
                  onChange={(e) => handleInputChange(e, 'treatmentHistory', index)}
                  placeholder="Doctor Name"
                  required
                />
              </div>
            ))}
          </div>

          <button type="submit">{selectedPatientId ? 'Update Patient' : 'Add Patient'}</button>
        </form>

        <h2>Current Patients</h2>
        {patients.map(patient => (
          <div key={patient._id}>
            {patient.personalInfo.firstName} {patient.personalInfo.lastName}
          </div>
        ))}

        {patients.length > 0 ? (
          <ul>
            {patients.map(patient => (
              <li key={patient._id} onClick={() => selectPatient(patient._id)}>
                {patient.personalInfo.firstName} {patient.personalInfo.lastName}
              </li>
            ))}
          </ul>
        ) : (
          <p>No patients found.</p>
        )}
        {selectedPatientId && selectedPatientDetails && (
          <div className="section patient-details-box">
            <h2>Details for Selected Patient</h2>
            <p><strong>Name:</strong> {selectedPatientDetails.personalInfo.firstName} {selectedPatientDetails.personalInfo.lastName}</p>
            <p><strong>Phone Number:</strong> {selectedPatientDetails.personalInfo.phoneNumber}</p>
            <p><strong>Age:</strong> {selectedPatientDetails.personalInfo.age}</p>
            <p><strong>Gender:</strong> {selectedPatientDetails.personalInfo.gender}</p>
            <p><strong>Place:</strong> {selectedPatientDetails.personalInfo.place}</p>

            {/* If there are medicine schedules */}
            {selectedPatientDetails.medicineSchedule && selectedPatientDetails.medicineSchedule.length > 0 && (
              <div className="section">
                <h3>Medicine Schedule</h3>
                {selectedPatientDetails.medicineSchedule.map((med, index) => (
                  <p key={index}>{med.medicineName} at {med.timings.map(time => new Date(time).toLocaleTimeString()).join(', ')}</p>
                ))}
              </div>
            )}

            {/* If there are visitors */}
            {selectedPatientDetails.visitors && selectedPatientDetails.visitors.length > 0 && (
              <div className="section">
                <h3>Visitors</h3>
                {selectedPatientDetails.visitors.map((visitor, index) => (
                  <p key={index}>{visitor.visitorName} visited on {new Date(visitor.visitTime).toLocaleString()}</p>
                ))}
              </div>
            )}

            {/* If there is treatment history */}
            {selectedPatientDetails.treatmentHistory && selectedPatientDetails.treatmentHistory.length > 0 && (
              <div className="section">
                <h3>Treatment History</h3>
                {selectedPatientDetails.treatmentHistory.map((treatment, index) => (
                  <p key={index}>{treatment.treatment} by Dr. {treatment.name}</p>  // Change doctorName to name
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default PatientDashboard;
