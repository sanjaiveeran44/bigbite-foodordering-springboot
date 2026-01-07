import React from 'react';
import './LoginHeader.css';
const LoginHeader = () => {
  return (
    <header className="login-header">
      <div className="header-container">
        <div className="logo-section">
          <div className="logo">
            <span className="logo-tx">Tx</span>
          </div>
          <h1 className="brand-name">Triage X</h1>
        </div>
        <button className="about-btn">About Us</button>
      </div>
    </header>
  );
};
  export default LoginHeader;