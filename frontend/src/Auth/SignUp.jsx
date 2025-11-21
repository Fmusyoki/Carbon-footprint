// Auth/SignUp.jsx
import React, { useState } from "react";
import Base from "../components/Base";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch
    } = useForm();
    
    const navigate = useNavigate();
    const { login } = useAuth();
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    // Corrected: Use environment variable for backend URL
    const submitCall = async (data) => {
        try {
            const API_URL = import.meta.env.VITE_API_URL; // <-- set in Render frontend env
            const response = await axios.post(`${API_URL}/signup`, data);
            
            if (response.data.success) {
                setSuccessMessage("Registration Successful! Welcome to our eco-friendly community! 🌱");
                setShowSuccessPopup(true);
                login(response.data.user);
                
                // Auto navigate after 3 seconds
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            } else {
                alert(response.data.message || "Registration failed");
            }
        } catch (error) {
            console.log("Registration error:", error);
            if (error.response?.data?.message) {
                alert(error.response.data.message);
            } else if (error.response?.status === 400) {
                alert("User already exists or invalid data");
            } else {
                alert("Network or server error. Please try again.");
            }
        }
    };

    const password = watch("password");

    const handleClosePopup = () => {
        setShowSuccessPopup(false);
        navigate('/');
    };

    return (
        <>
            {/* Success Popup Modal */}
            {showSuccessPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full transform animate-scale-in">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-t-3xl p-6 text-center">
                            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Welcome Aboard!</h3>
                        </div>
                        
                        {/* Content */}
                        <div className="p-8 text-center">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                </svg>
                            </div>
                            
                            <p className="text-gray-700 text-lg mb-2 font-semibold">
                                Account Created Successfully!
                            </p>
                            <p className="text-gray-600 mb-6">
                                {successMessage}
                            </p>
                            
                            <div className="flex space-x-3 mb-6 justify-center">
                                <div className="flex items-center text-sm text-green-600">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Secure Account
                                </div>
                                <div className="flex items-center text-sm text-green-600">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Ready to Use
                                </div>
                            </div>
                            
                            <div className="bg-green-50 rounded-xl p-4 mb-6">
                                <p className="text-sm text-green-700">
                                    <span className="font-semibold">Pro Tip:</span> Complete your profile to get personalized eco-friendly recommendations!
                                </p>
                            </div>
                            
                            <div className="flex space-x-3">
                                <button
                                    onClick={handleClosePopup}
                                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg"
                                >
                                    Get Started Now
                                </button>
                            </div>
                            
                            <p className="text-xs text-gray-500 mt-4">
                                Redirecting to dashboard in 3 seconds...
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Signup Form */}
            <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 font-sans flex items-center justify-center p-6">
                <div className="w-full max-w-4xl">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-5xl font-bold text-white mb-4">
                            Start Your <span className="text-emerald-200">Eco Journey</span>
                        </h2>
                        <p className="text-xl text-green-100 max-w-2xl mx-auto">
                            Join our community and start tracking your carbon footprint today
                        </p>
                    </div>

                    {/* Registration Card */}
                    <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl mx-auto">
                        <div className="text-center mb-8">
                            <h3 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h3>
                            <p className="text-gray-600">Join us in making the planet greener</p>
                        </div>

                        <form onSubmit={handleSubmit(submitCall)} className="space-y-6">
                            {/* Keep all original form fields and validation logic */}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
