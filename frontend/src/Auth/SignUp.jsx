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

    const submitCall = async (data) => {
        try {
            const response = await axios.post('http://localhost:5000/signup', data);
            
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
                alert("Registration failed. Please try again.");
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
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Full Name</label>
                                <input 
                                    type="text" 
                                    {...register("name", { 
                                        required: "Full name is required",
                                        minLength: {
                                            value: 2,
                                            message: "Name must be at least 2 characters"
                                        }
                                    })}
                                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                    placeholder="Enter your full name" 
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Email Address</label>
                                <input 
                                    type="email" 
                                    {...register("email", { 
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/,
                                            message: "Please enter a valid .com email address"
                                        }
                                    })}
                                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                    placeholder="Enter your email" 
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Password</label>
                                    <input 
                                        type="password" 
                                        {...register("password", { 
                                            required: "Password is required",
                                            pattern: {
                                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                                message: "Password must be 8+ chars with uppercase, lowercase, number & special character"
                                            }
                                        })}
                                        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                        placeholder="Create password" 
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                                    <input 
                                        type="password" 
                                        {...register("confirmPassword", { 
                                            required: "Please confirm your password",
                                            validate: value => 
                                                value === password || "Passwords do not match"
                                        })}
                                        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                        placeholder="Confirm password" 
                                    />
                                    {errors.confirmPassword && (
                                        <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <input 
                                    type="checkbox" 
                                    {...register("agreeTerms", { 
                                        required: "You must agree to the terms and conditions"
                                    })}
                                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-1"
                                />
                                <label className="text-sm text-gray-600">
                                    I agree to the{" "}
                                    <a href="#" className="text-green-600 hover:text-green-700 font-medium">
                                        Terms of Service
                                    </a>{" "}
                                    and{" "}
                                    <a href="#" className="text-green-600 hover:text-green-700 font-medium">
                                        Privacy Policy
                                    </a>
                                </label>
                            </div>
                            {errors.agreeTerms && (
                                <p className="text-red-500 text-sm">{errors.agreeTerms.message}</p>
                            )}

                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating Account...
                                    </div>
                                ) : (
                                    "Create Account"
                                )}
                            </button>

                            <p className="text-center text-gray-600 text-sm">
                                Already have an account?{" "}
                                <a href="/" className="text-green-600 hover:text-green-700 font-semibold transition-colors">
                                    Sign in
                                </a>
                            </p>
                        </form>

                        {/* Security Note */}
                        <div className="mt-8 p-4 bg-green-50 rounded-xl border border-green-200">
                            <div className="flex items-start space-x-3">
                                <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                                <p className="text-sm text-green-700">
                                    Your data is securely encrypted. We never share your personal information with third parties.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;