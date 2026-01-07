import React, { useState } from 'react';
import axios from 'axios';
import './RegisterHero.css';
import { useNavigate } from 'react-router-dom';
const RegisterHero = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });

    
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/register', formData);
            if (response.status === 200) {
                console.log(response.data);
                navigate('/login');

            }
        } catch (error) {
            console.error('Registration error:', error.response?.data || error.message);
        }
    };
  
    return (
      <section className="register-hero">
        <div className="hero-content">
          <div className="register-container">
            <div className="form-header">
              <div className="medical-icon">⚕</div>
              <h2 className="form-title">Create Your Account</h2>
            </div>
            <div className="register-form">
              <div className="input-group">
                <input
                  type="text"
                  name="username"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              <button onClick={handleSubmit} className="signup-button">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  };

export default RegisterHero;