import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "../context/AuthContext";

const Base = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      {/* Welcome Bar with Logout */}
      {user && (
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-lg">👋</span>
              <span className="font-medium">Welcome back, {user.name}!</span>
            </div>
            <button 
              onClick={logout}
              className="bg-white text-green-700 hover:bg-green-50 px-4 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-md flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
      
      <Navbar />
      <main className="flex-1 p-8 font-sans">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Base;