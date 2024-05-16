import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Doctor.css';
import Navbar from '../../Navbar/Navbar';

const DoctorDashboard = () => {
    const [doctors, setDoctors] = useState([]);
    const [form, setForm] = useState({
        name: '',
        phoneNumber: '',
        specialization: ''
    });

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        const response = await axios.get('http://localhost:3000/api/v1/doctors/all');
        console.log('Doctors:', response.data);  // Log to check the structure
        if (response.data) {
            setDoctors(response.data);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const method = form.id ? updateDoctor : addDoctor;
        await method(form);
        resetForm();
    };

    const resetForm = () => {
        setForm({ name: '', phoneNumber: '', specialization: '' });
    };

    const addDoctor = async (doctorData) => {
        const response = await axios.post('http://localhost:3000/api/v1/doctors/create', doctorData);
        setDoctors([...doctors, response.data]);
    };

    const updateDoctor = async (doctorData) => {
        const response = await axios.put(`http://localhost:3000/api/v1/doctors/update/${doctorData.id}`, doctorData);
        setDoctors(doctors.map(doc => doc._id === doctorData.id ? response.data : doc));
    };

    const deleteDoctor = async (id) => {
        await axios.delete(`http://localhost:3000/api/v1/doctors/delete/${id}`);
        setDoctors(doctors.filter(doc => doc._id !== id));
    };

    return (
        <>
            <Navbar />
            <div className="doctor-dashboard">
                <h1>Doctor Dashboard</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleInputChange} />
                    <input type="number" name="phoneNumber" placeholder="Phone Number" value={form.phoneNumber} onChange={handleInputChange} />
                    <input type="text" name="specialization" placeholder="Specialization" value={form.specialization} onChange={handleInputChange} />
                    <button type="submit">Submit</button>
                </form>
                <ul className="doctor-list">
                    {doctors.map((doctor) => (
                        <li key={doctor._id}>
                            {doctor.personalInfo ? `${doctor.personalInfo.name} - ${doctor.personalInfo.phoneNumber} - ${doctor.personalInfo.specialization}` :
                            "Information not available"}
                            <div>
                                <button onClick={() => deleteDoctor(doctor._id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default DoctorDashboard;
