import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo41.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success py-0">
      <div className="container-fluid px-3">
        {/* Brand/Logo with larger size */}
        <Link to="/" className="navbar-brand d-flex align-items-center py-2">
          <img
            src={logo}
            alt="ZeroTrace Logo"
            className="brand-logo me-2"
          />
        </Link>

        {/* Hamburger Toggle Button */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={toggleMenu}
          aria-controls="navbarNav"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div 
          className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} 
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link 
                to="/" 
                className="nav-link px-3" 
                onClick={closeMenu}
              >
                <i className="bi bi-house me-1"></i>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/calculator" 
                className="nav-link px-3" 
                onClick={closeMenu}
              >
                <i className="bi bi-calculator me-1"></i>
                Calculator
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/community" 
                className="nav-link px-3" 
                onClick={closeMenu}
              >
                <i className="bi bi-people me-1"></i>
                Community
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/dashboard" 
                className="nav-link px-3" 
                onClick={closeMenu}
              >
                <i className="bi bi-speedometer2 me-1"></i>
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/events" 
                className="nav-link px-3" 
                onClick={closeMenu}
              >
                <i className="bi bi-calendar-event me-1"></i>
                Events
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

// Custom CSS for larger logo and styling
const customStyles = `
  .brand-logo {
    height: 80px;
    width: auto;
    transition: transform 0.3s ease;
  }
  
  .brand-text {
    font-size: 1.8rem;
    font-weight: 700;
    color: white;
    transition: color 0.3s ease;
  }
  
  .navbar-brand {
    padding-top: 0;
    padding-bottom: 0;
    margin-right: 2rem;
  }
  
  .navbar {
    min-height: 90px;
  }
  
  .nav-link {
    font-weight: 500;
    padding: 1rem 1.5rem !important;
    transition: all 0.3s ease;
    border-radius: 0.375rem;
    margin: 0 0.125rem;
    position: relative;
  }
  
  .nav-link:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-1px);
  }
  
  .nav-link::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0.5rem;
    left: 50%;
    background-color: white;
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }
  
  .nav-link:hover::after {
    width: 70%;
  }
  
  .navbar-toggler {
    padding: 0.5rem;
    transition: all 0.3s ease;
  }
  
  .navbar-toggler:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .navbar-toggler:focus {
    box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.25);
  }
  
  /* Responsive adjustments */
  @media (max-width: 991.98px) {
    .brand-logo {
      height: 60px;
    }
    
    .brand-text {
      font-size: 1.5rem;
    }
    
    .navbar {
      min-height: 80px;
    }
    
    .navbar-collapse {
      background-color: #198754;
      margin-top: 0.5rem;
      border-radius: 0.375rem;
      padding: 1rem;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    
    .nav-link {
      text-align: center;
      margin: 0.25rem 0;
      padding: 0.75rem 1rem !important;
    }
    
    .nav-link::after {
      display: none;
    }
  }
  
  @media (max-width: 576px) {
    .brand-logo {
      height: 50px;
    }
    
    .brand-text {
      font-size: 1.3rem;
    }
    
    .navbar {
      min-height: 70px;
    }
    
    .container-fluid {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }
  
  @media (min-width: 992px) {
    .nav-link {
      font-size: 1.1rem;
    }
  }
  
  /* Hover effects for brand */
  .navbar-brand:hover .brand-logo {
    transform: scale(1.05);
  }
  
  .navbar-brand:hover .brand-text {
    color: #e8f5e8 !important;
  }
`;

// Inject custom styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = customStyles;
  document.head.appendChild(styleSheet);
}

export default Navbar;