import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Medicine.css'
import Navbar from '../../Navbar/Navbar';

const MedicineDashboard = () => {
  const [medicines, setMedicines] = useState([]);
  const [currentMedicine, setCurrentMedicine] = useState({ name: '', type: '', dosage: '', frequency: '', administrationTimes: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/medicines/all');
      setMedicines(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch medicines');
      setLoading(false);
      console.error('Error fetching medicines:', err);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentMedicine({ ...currentMedicine, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = currentMedicine._id
        ? await axios.put(`http://localhost:3000/api/v1/medicines/update/${currentMedicine._id}`, currentMedicine)
        : await axios.post('http://localhost:3000/api/v1/medicines/create', currentMedicine);

      if (!currentMedicine._id) {
        setMedicines([...medicines, response.data]);
      } else {
        setMedicines(medicines.map(med => med._id === response.data._id ? response.data : med));
      }
      setCurrentMedicine({ name: '', type: '', dosage: '', frequency: '', administrationTimes: [] }); // Reset form
    } catch (err) {
      console.error('Error submitting medicine:', err);
      setError('Failed to submit medicine. ' + (err.response ? err.response.data.message : 'No server response'));
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/medicines/delete/${id}`);
      setMedicines(medicines.filter(medicine => medicine._id !== id));
    } catch (err) {
      console.error('Error deleting medicine:', err);
      setError('Failed to delete medicine. ' + (err.response ? err.response.data.message : 'No server response'));
    }
  };

  const handleEdit = (medicine) => {
    setCurrentMedicine(medicine);
  };

  if (loading) return <p>Loading medicines...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
    <Navbar/>
    {/*  <div> */}
      <h1 style={{color:"#007bff",textAlign:"center",margin:"20px"}}><strong>Medicine Dashboard</strong></h1>

      <form className='form' onSubmit={handleFormSubmit}>
        <input type="text" name="name" value={currentMedicine.name} onChange={handleInputChange} placeholder="Name" required />

        <input type="text" name="type" value={currentMedicine.type} onChange={handleInputChange} placeholder="Type" required />

        <input type="text" name="dosage" value={currentMedicine.dosage} onChange={handleInputChange} placeholder="Dosage" required />

        <input type="text" name="frequency" value={currentMedicine.frequency} onChange={handleInputChange} placeholder="Frequency" required />

        <input type="text" name="administrationTimes" value={currentMedicine.administrationTimes} onChange={handleInputChange} placeholder="Administration Times" required />

        <button type="submit">{currentMedicine._id ? 'Update Medicine' : 'Add Medicine'}</button>
      </form>
      
      {medicines.length > 0 ? (
        <ul className='medicines-list'>
          {medicines.map(medicine => (
            <li key={medicine._id}>
              {medicine.name} - {medicine.type} - {medicine.dosage} - {medicine.frequency}- {medicine.administrationTimes.join(', ')}
              <button className='edit-button' onClick={() => handleEdit(medicine)}>Edit</button>
              <button className='delete-button'onClick={() => handleDelete(medicine._id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No medicines found.</p>
      )}

    </>
  );
};

export default MedicineDashboard;
