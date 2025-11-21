// Auth/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle signup form submission
  const handleSignup = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const API = import.meta.env.VITE_API_URL; // Render backend URL
      const response = await axios.post(`${API}/signup`, formData, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.data.success) {
        setSuccessMessage(
          "Registration Successful! Welcome to our eco-friendly community! 🌱"
        );
        setShowSuccessPopup(true);
        login(response.data.user);

        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        alert(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else if (error.response?.status === 400) {
        alert("User already exists or invalid data");
      } else {
        alert("Network or server error. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-6">
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">{successMessage}</h2>
            <p>Redirecting to dashboard...</p>
          </div>
        </div>
      )}

      {/* Signup Form */}
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full p-3 rounded font-semibold text-white transition ${
            isSubmitting ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isSubmitting ? "Creating Account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
