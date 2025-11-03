import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Check if current path matches the link
  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-green-950 h-18 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-xl font-bold text-white !no-underline hover:text-green-300 hover:scale-105 active:scale-95 transition-all duration-200 transform"
          >
            ZeroTrace
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-lg !no-underline transition-all duration-200 transform ${
                isActiveLink("/") 
                  ? "bg-green-700 text-white shadow-lg scale-105" 
                  : "text-white hover:bg-green-800 hover:text-green-200 hover:scale-105 active:scale-95"
              }`}
            >
              Home
            </Link>
            <Link 
              to="/calculator" 
              className={`px-4 py-2 rounded-lg !no-underline transition-all duration-200 transform ${
                isActiveLink("/calculator") 
                  ? "bg-green-700 text-white shadow-lg scale-105" 
                  : "text-white hover:bg-green-800 hover:text-green-200 hover:scale-105 active:scale-95"
              }`}
            >
              Calculator
            </Link>
            <Link 
              to="/actionplan" 
              className={`px-4 py-2 rounded-lg !no-underline transition-all duration-200 transform ${
                isActiveLink("/actionplan") 
                  ? "bg-green-700 text-white shadow-lg scale-105" 
                  : "text-white hover:bg-green-800 hover:text-green-200 hover:scale-105 active:scale-95"
              }`}
            >
              Action Plan
            </Link>
            <Link 
              to="/ecocenter" 
              className={`px-4 py-2 rounded-lg !no-underline transition-all duration-200 transform ${
                isActiveLink("/ecocenter") 
                  ? "bg-green-700 text-white shadow-lg scale-105" 
                  : "text-white hover:bg-green-800 hover:text-green-200 hover:scale-105 active:scale-95"
              }`}
            >
              EcoCenter
            </Link>
            <Link 
              to="/community" 
              className={`px-4 py-2 rounded-lg !no-underline transition-all duration-200 transform ${
                isActiveLink("/community") 
                  ? "bg-green-700 text-white shadow-lg scale-105" 
                  : "text-white hover:bg-green-800 hover:text-green-200 hover:scale-105 active:scale-95"
              }`}
            >
              Community
            </Link>
            <Link 
              to="/login" 
              className={`px-4 py-2 rounded-lg !no-underline transition-all duration-200 transform ${
                isActiveLink("/login") 
                  ? "bg-green-700 text-white shadow-lg scale-105" 
                  : "text-white hover:bg-green-800 hover:text-green-200 hover:scale-105 active:scale-95"
              }`}
            >
              LogIn
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-green-800 hover:text-green-300 active:bg-green-700 active:scale-95 transition-all duration-200 transform"
          >
            {isOpen ? (
              <span className="text-xl">✕</span>
            ) : (
              <span className="text-xl">☰</span>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-green-900 border-t border-green-700 py-3 space-y-2 animate-slideDown">
            <Link 
              to="/" 
              className={`block px-4 py-3 rounded-lg !no-underline transition-all duration-200 transform ${
                isActiveLink("/") 
                  ? "bg-green-700 text-white shadow-inner scale-[1.02]" 
                  : "text-white hover:bg-green-800 hover:text-green-200 active:bg-green-700 active:scale-[0.98]"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/calculator" 
              className={`block px-4 py-3 rounded-lg !no-underline transition-all duration-200 transform ${
                isActiveLink("/calculator") 
                  ? "bg-green-700 text-white shadow-inner scale-[1.02]" 
                  : "text-white hover:bg-green-800 hover:text-green-200 active:bg-green-700 active:scale-[0.98]"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Calculator
            </Link>
            <Link 
              to="/actionplan" 
              className={`block px-4 py-3 rounded-lg !no-underline transition-all duration-200 transform ${
                isActiveLink("/actionplan") 
                  ? "bg-green-700 text-white shadow-inner scale-[1.02]" 
                  : "text-white hover:bg-green-800 hover:text-green-200 active:bg-green-700 active:scale-[0.98]"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Action Plan
            </Link>
            <Link 
              to="/ecocenter" 
              className={`block px-4 py-3 rounded-lg !no-underline transition-all duration-200 transform ${
                isActiveLink("/ecocenter") 
                  ? "bg-green-700 text-white shadow-inner scale-[1.02]" 
                  : "text-white hover:bg-green-800 hover:text-green-200 active:bg-green-700 active:scale-[0.98]"
              }`}
              onClick={() => setIsOpen(false)}
            >
              EcoCenter
            </Link>
            <Link 
              to="/community" 
              className={`block px-4 py-3 rounded-lg !no-underline transition-all duration-200 transform ${
                isActiveLink("/community") 
                  ? "bg-green-700 text-white shadow-inner scale-[1.02]" 
                  : "text-white hover:bg-green-800 hover:text-green-200 active:bg-green-700 active:scale-[0.98]"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Community
            </Link>
            <Link 
              to="/login" 
              className={`block px-4 py-3 rounded-lg !no-underline transition-all duration-200 transform ${
                isActiveLink("/login") 
                  ? "bg-green-700 text-white shadow-inner scale-[1.02]" 
                  : "text-white hover:bg-green-800 hover:text-green-200 active:bg-green-700 active:scale-[0.98]"
              }`}
              onClick={() => setIsOpen(false)}
            >
              LogIn
            </Link>
          </div>
        )}
      </div>

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;