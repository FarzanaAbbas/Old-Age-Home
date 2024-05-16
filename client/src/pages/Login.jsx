import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './style.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/login', {
        email: email,
        password: password
      });
      localStorage.setItem('userLogged', JSON.stringify(response.data.data));
      alert('Login successful!');
      navigate('/home');
    } catch (error) {
      alert('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="login-container">
        <div className="image-container">
        <img src="/doctor-4.avif" alt="Descriptive Alt Text" />
      </div>
      <div className="form-container">
        <h2>Welcome Back!</h2>
        <form onSubmit={loginUser}>
          <div className="input-group">
            <label>Email:</label>
            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit">LOGIN</button>
          <p className="register-link">Don't have an account? <Link to="/">Register</Link></p>
        </form>
      </div>
    </div>
  );
}
