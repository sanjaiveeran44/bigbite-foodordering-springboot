import React, { useState } from 'react';
import './LoginHero.css';
import axios from 'axios';

const LoginHero = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [token, setToken] = useState('');
  
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);
      console.log('Login successful:', response.data);
      setToken(response.data.token);
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
    }
  };

  return (
    <section className="login-hero">
      <div className="login-container">
        <div className="form-header">
          <div className="medical-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM18 14H13V19H11V14H6V12H11V7H13V12H18V14Z" fill="#2563eb"/>
            </svg>
          </div>
          <h2 className="form-title">Login to TriageX</h2>
        </div>
        
        <div className="login-form">
          <div className="input-group">
            <label htmlFor="username">Username or Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <button onClick={handleSubmit} className="login-btn">
            Login
          </button>
          
          <p className="register-link">
            Don't have an account? <a href="/register">Register</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginHero;