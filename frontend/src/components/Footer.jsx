import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo41.png"

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row">
          {/* Company Info */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="d-flex align-items-center mb-3">
               <Link to="/" className="navbar-brand fw-bold fs-4 d-flex align-items-center">
               <img
                   src={logo}
                   alt="ZeroTrace Logo"
                   style={{ height: "100px", width: "auto" }} // scales proportionally
                   className="me-2"
               />
               </Link>
            </div>
            <p className="text-light-emphasis">
              Empower individuals and businesses to understand, track, and reduce their carbon footprint.
              Through smart insights and actionable data, we aim to make every step toward zero emissions measurable and meaningful.

            </p>
            <div className="social-links d-flex gap-3">
              <a href="#" className="text-light-emphasis hover-green">
                <i className="bi bi-facebook fs-5"></i>
              </a>
              <a href="#" className="text-light-emphasis hover-green">
                <i className="bi bi-twitter fs-5"></i>
              </a>
              <a href="#" className="text-light-emphasis hover-green">
                <i className="bi bi-linkedin fs-5"></i>
              </a>
              <a href="#" className="text-light-emphasis hover-green">
                <i className="bi bi-instagram fs-5"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="text-uppercase fw-bold text-success mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-light-emphasis footer-link">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/calculator" className="text-light-emphasis footer-link">Carbon Calculator</Link>
              </li>
              <li className="mb-2">
                <Link to="/dashboard" className="text-light-emphasis footer-link">Dashboard</Link>
              </li>
              <li className="mb-2">
                <Link to="/community" className="text-light-emphasis footer-link">Community</Link>
              </li>
              <li className="mb-2">
                <Link to="/events" className="text-light-emphasis footer-link">Events</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="text-uppercase fw-bold text-success mb-3">Resources</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-light-emphasis footer-link">Climate News</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light-emphasis footer-link">Carbon Offset Guide</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light-emphasis footer-link">Sustainability Tips</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light-emphasis footer-link">Research Papers</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light-emphasis footer-link">API Documentation</a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="text-uppercase fw-bold text-success mb-3">Support</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-light-emphasis footer-link">Help Center</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light-emphasis footer-link">Contact Us</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light-emphasis footer-link">Privacy Policy</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light-emphasis footer-link">Terms of Service</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light-emphasis footer-link">Cookie Policy</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="row mt-4 pt-3 border-top border-secondary">
          <div className="col-md-6 text-center text-md-start mb-2 mb-md-0">
            <p className="mb-0 text-light-emphasis small">
              © {new Date().getFullYear()} ZeroTrace. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Add custom styles for hover effects
const customStyles = `
  .footer-link {
    text-decoration: none;
    transition: all 0.3s ease;
    position: relative;
  }
  
  .footer-link:hover {
    color: #198754 !important;
    transform: translateX(5px);
  }
  
  .footer-link::before {
    content: '';
    position: absolute;
    width: 0;
    height: 1px;
    bottom: -2px;
    left: 0;
    background-color: #198754;
    transition: width 0.3s ease;
  }
  
  .footer-link:hover::before {
    width: 100%;
  }
  
  .hover-green {
    transition: all 0.3s ease;
  }
  
  .hover-green:hover {
    color: #198754 !important;
    transform: translateY(-2px);
  }
  
  .form-control:focus {
    background-color: #1a1a1a;
    border-color: #198754;
    box-shadow: 0 0 0 0.2rem rgba(25, 135, 84, 0.25);
    color: #fff;
  }
  
  .btn-success {
    transition: all 0.3s ease;
  }
  
  .btn-success:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(25, 135, 84, 0.3);
  }
`;

// Inject custom styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = customStyles;
  document.head.appendChild(styleSheet);
}

export default Footer;