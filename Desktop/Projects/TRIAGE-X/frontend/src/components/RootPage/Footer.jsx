import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-links">
            <a href="#privacy" className="footer-link">Privacy Policy</a>
            <a href="#terms" className="footer-link">Terms of Service</a>
            <a href="#support" className="footer-link">Support</a>
          </div>
          <div className="footer-copyright">
            <p>&copy; 2025 Triage X. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};