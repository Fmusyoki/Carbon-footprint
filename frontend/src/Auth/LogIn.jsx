import React from "react";
import Base from "../components/Base";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Add this import

const LogIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    
    const navigate = useNavigate(); // Add this hook

    const submitCall = async (data) => {
        console.log("Login data:", data);
        try {
            // Fix: use 'data' instead of 'loginData'
            const response = await axios.post('http://localhost:5000/login', data);
            
            console.log("Login response:", response.data);
            
            // Fix: Check response.data.success instead of response.data.data.token
            if (response.data.success) {
                alert("Login Successful!!");
                
                // Store token if available
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                }
                
                // Redirect to homepage/dashboard
                navigate('/home'); // or navigate('/dashboard');
                
            } else {
                alert(response.data.message || "Login failed");
            }
            
        } catch (error) {
            console.log("Login error:", error);
            // Improved error handling
            if (error.response?.data?.message) {
                alert(error.response.data.message);
            } else if (error.response?.status === 400) {
                alert("Invalid email or password");
            } else {
                alert("Login failed. Please try again.");
            }
        }
    };

    return (
        <Base>
            <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 font-sans flex items-center justify-center p-6">
                <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {/* Left Side - Branding */}
                    <div className="bg-gradient-to-br from-green-600 to-emerald-700 p-12 text-white hidden lg:flex flex-col justify-center">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl backdrop-blur-sm">
                                    🌍
                                </div>
                                <h1 className="text-4xl font-bold">CarbonTrack</h1>
                            </div>
                            <h2 className="text-5xl font-bold leading-tight">
                                Track Your <br />
                                <span className="text-emerald-200">Carbon Footprint</span>
                            </h2>
                            <p className="text-lg text-green-100 opacity-90 leading-relaxed">
                                Join thousands of eco-conscious users making sustainable choices and reducing their environmental impact.
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
                                            value: /^\S+@\S+$/i,
                                            message: "Invalid email address"
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
                                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
                            >
                                Sign In
                            </button>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button 
                                    type="button"
                                    className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
                                >
                                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    </svg>
                                    Google
                                </button>
                                <button 
                                    type="button"
                                    className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                    </svg>
                                    Twitter
                                </button>
                            </div>

                            <p className="text-center text-gray-600 text-sm">
                                Don't have an account?{" "}
                                <a href="/signup" className="text-green-600 hover:text-green-700 font-semibold transition-colors">
                                    Create account
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </Base>
    );
};

export default LogIn;