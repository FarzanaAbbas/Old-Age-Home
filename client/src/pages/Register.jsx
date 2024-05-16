import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './style.css';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/', {
        username: username,
        email: email,
        password: password
      });
      console.log(response);
      navigate('/login'); // Redirect to login after successful registration

    } catch (error) {
      console.error('Error registering user:', error);
      alert('Error registering user. Please try again.');
    }
  };

  return (
    <div className="login-container"> {/* Consider renaming class to auth-container */}
      <div className="image-container">
        <img src="/doctor-4.avif" alt="Healthcare Registration" />
      </div>
      <div className="form-container">
        <h2>Register Now</h2>
        <form onSubmit={registerUser}>
          <div className="input-group">
            <label>Username:</label>
            <input type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Email:</label>
            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit">REGISTER</button>
          <p className="register-link">Already have an account? <Link to="/login">Login</Link></p>
        </form>
      </div>
    </div>
  );
}
