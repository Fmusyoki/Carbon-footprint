// Auth/LogIn.jsx
import React, { useState } from "react";
import Base from "../components/Base";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LogIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm();
    
    const navigate = useNavigate();
    const { login } = useAuth();
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [userData, setUserData] = useState(null);

    const submitCall = async (data) => {
        console.log("Login data:", data);
        try {
            const response = await axios.post('http://localhost:5000/login', data);
            
            console.log("Login response:", response.data);
            
            if (response.data.success) {
                setUserData(response.data.user);
                setShowSuccessPopup(true);
                login(response.data.user);
                
                // Auto navigate after 3 seconds
                setTimeout(() => {
                    navigate('/home');
                }, 3000);
            } else {
                alert(response.data.message || "Login failed");
            }
            
        } catch (error) {
            console.log("Login error:", error);
            if (error.response?.data?.message) {
                alert(error.response.data.message);
            } else if (error.response?.status === 400) {
                alert("Invalid email or password");
            } else {
                alert("Login failed. Please try again.");
            }
        }
    };

    const handleClosePopup = () => {
        setShowSuccessPopup(false);
        navigate('/home');
    };

    return (
        <>
            {/* Success Popup Modal */}
            {showSuccessPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full transform animate-scale-in">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-t-3xl p-6 text-center">
                            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Welcome Back!</h3>
                            <p className="text-emerald-100">Great to see you again</p>
                        </div>
                        
                        {/* Content */}
                        <div className="p-8 text-center">
                            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                </svg>
                            </div>
                            
                            {userData && (
                                <div className="mb-6">
                                    <p className="text-gray-700 text-lg mb-2 font-semibold">
                                        Hello, <span className="text-emerald-600">{userData.name}</span>!
                                    </p>
                                    <p className="text-gray-600 mb-4">
                                        You've successfully signed in to your CarbonTrack account.
                                    </p>
                                </div>
                            )}
                            
                            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 mb-6 border border-emerald-200">
                                <div className="flex items-center justify-center space-x-2 text-sm text-emerald-700">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                                    </svg>
                                    <span>Continue your eco-journey where you left off</span>
                                </div>
                            </div>
                            
                            <div className="flex space-x-3">
                                <button
                                    onClick={handleClosePopup}
                                    className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-200 shadow-lg"
                                >
                                    Go to Dashboard
                                </button>
                            </div>
                            
                            <p className="text-xs text-gray-500 mt-4">
                                Redirecting automatically in 3 seconds...
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Login Form */}
            <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 font-sans flex items-center justify-center p-6">
                <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {/* Left Side - Branding */}
                    <div className="bg-gradient-to-br from-green-600 to-emerald-700 p-12 text-white hidden lg:flex flex-col justify-center">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl backdrop-blur-sm">
                                    🌍
                                </div>
                                <h1 className="text-4xl font-bold">ZeroTrace</h1>
                            </div>
                            <h2 className="text-5xl font-bold leading-tight">
                                Welcome <br />
                                <span className="text-emerald-200">Back!</span>
                            </h2>
                            <p className="text-lg text-green-100 opacity-90 leading-relaxed">
                                Continue your sustainability journey and track your environmental impact with us.
                            </p>
                            <div className="flex gap-4 mt-8">
                                <div className="text-center">
                                    <div className="text-2xl font-bold">10K+</div>
                                    <div className="text-green-200 text-sm">Active Users</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold">50K+</div>
                                    <div className="text-green-200 text-sm">CO₂ Reduced</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Login Form */}
                    <div className="p-12 flex flex-col justify-center">
                        <div className="text-center lg:text-left mb-8">
                            <h3 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h3>
                            <p className="text-gray-600">Sign in to continue your sustainability journey</p>
                        </div>

                        <form onSubmit={handleSubmit(submitCall)} className="space-y-6">
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

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Password</label>
                                <input 
                                    type="password" 
                                    {...register("password", { 
                                        required: "Password is required",
                                        minLength: {
                                            value: 3,
                                            message: "Password must be at least 3 characters"
                                        }
                                    })}
                                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                    placeholder="Enter your password" 
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm">{errors.password.message}</p>
                                )}
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center text-gray-600 cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        {...register("remember")}
                                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                    />
                                    <span className="ml-2">Remember me</span>
                                </label>
                                <a href="#" className="text-green-600 hover:text-green-700 font-medium text-sm transition-colors">
                                    Forgot password?
                                </a>
                            </div>

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
                                        Signing In...
                                    </div>
                                ) : (
                                    "Sign In"
                                )}
                            </button>

                            <p className="text-center text-gray-600 text-sm">
                                Don't have an account?{" "}
                                <a href="/signup" className="text-green-600 hover:text-green-700 font-semibold transition-colors">
                                    Create account
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
                                    Your session is secure. We use encryption to protect your data.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LogIn;