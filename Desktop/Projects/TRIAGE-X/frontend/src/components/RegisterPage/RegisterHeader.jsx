import React, { useState } from 'react';
import './RegisterHeader.css';

// RegisterHeader Component
const RegisterHeader = () => {
  return (
    <header className="register-header">
      <div className="header-content">
        <div className="logo-section">
          <div className="tx-logo">Tx</div>
          <h1 className="title">Triage X</h1>
        </div>
        <nav className="nav-section">
          <button className="nav-button">About Us</button>
        </nav>
      </div>
    </header>
  );
};

export default RegisterHeader;
