import React from 'react';
import './Hero.css';
import { useNavigate } from 'react-router-dom';
export default function Hero() {

  const navigate = useNavigate();
  const handleCreateAccount =() =>{
    navigate('/register');
  }
  
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-left">
          <div className="hero-image-placeholder">
            <div className="healthcare-icon">
              <div className="pulse-circle"></div>
              <div className="cross-icon">
                <div className="cross-vertical"></div>
                <div className="cross-horizontal"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-right">
          <h1 className="hero-heading">Welcome to Triage</h1>
          <p className="hero-description">
            Streamline your healthcare management with our advanced triage system. 
            Get the right care at the right time with intelligent prioritization 
            and comprehensive patient monitoring.
          </p>
          <button className="create-account-btn" onClick = {handleCreateAccount}>Create Account</button>
        </div>
      </div>
    </section>
  );
};