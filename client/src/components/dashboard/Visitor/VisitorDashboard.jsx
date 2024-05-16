import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../Navbar/Navbar';
import './Visitor.css'

function VisitorDashboard() {
  const [visitors, setVisitors] = useState([]);
  const [visitor, setVisitor] = useState({
    name: '',
    visitTime: '',
    patientName: ''
  });

  // Converts date to the correct format for datetime-local input
  const formatDate = (dateString) => {
    if (!dateString) return ''; // Return empty if no date provided

    const date = new Date(dateString);
    if (isNaN(date)) return ''; // Check if the date is invalid and return empty

    let month = `${date.getMonth() + 1}`.padStart(2, '0'); // Months are 0-based
    let day = `${date.getDate()}`.padStart(2, '0');
    let year = date.getFullYear();
    let hour = `${date.getHours()}`.padStart(2, '0');
    let minute = `${date.getMinutes()}`.padStart(2, '0');

    return `${year}-${month}-${day}T${hour}:${minute}`;
  };


  const handleChange = (e) => {
    console.log("New Value:", e.target.value); // Log new values to see what you're getting
    setVisitor({ ...visitor, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/v1/visitors/create', visitor);
      setVisitor({ name: '', visitTime: '', patientName: '' });
      fetchVisitors();
    } catch (error) {
      console.error('Error adding visitor:', error);
    }
  };

  const fetchVisitors = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/visitors/all');
      console.log('API Response:', response.data); // Check what the API returned
      if (response.data && response.data.visitors) {
        setVisitors(response.data.visitors);
      } else {
        console.error('Unexpected API response structure:', response.data);
        setVisitors([]); // Set to empty to avoid rendering errors
      }
    } catch (error) {
      console.error('Error fetching visitors:', error);
      setVisitors([]); // Set to empty to handle errors gracefully
    }
  };
  


  useEffect(() => {
    fetchVisitors();
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <h1>Visitor Dashboard</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={visitor.name} onChange={handleChange} required />
          </label><br />
          <label>
            Visit Time:
            <input
              type="datetime-local"
              name="visitTime"
              value={formatDate(visitor.visitTime)}
              onChange={handleChange}
              required
            />

          </label><br />
          <label>
            Patient Name:
            <input type="text" name="patientName" value={visitor.patientName} onChange={handleChange} required />
          </label><br />
          <button type="submit">Add Visitor</button>
        </form>
        <h2>Visitors List</h2>
        {visitors.map((visitor, index) => (
          <p key={index}>Name: {visitor.name}, Visit Time: {new Date(visitor.visitTime).toLocaleString()}, Patient: {visitor.patientName}</p>
        ))}
      </div>
    </>
  );
}

export default VisitorDashboard;
