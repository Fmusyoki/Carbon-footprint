import React, { useState } from "react";
import Base from "../components/Base";
import {useForm} from "react-hook-form";
import axios from "axios"

const Register = () => {
    const {
        register,
        handleSubmit,
        //formstate:{errors},
    }=useForm();

    const submitCall= async (data)=>{
        console.log(data);
        try{
            const response = await axios.post('http://localhost:5000/signup', data)
            if(response.status==201){
                alert("Registration Successfull!!")
            }

        }catch (error) {
            console.log(error);
        }
    }
    
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
                                Start Your <br />
                                <span className="text-emerald-200">Eco Journey</span>
                            </h2>
                            <p className="text-lg text-green-100 opacity-90 leading-relaxed">
                                Join our community of environmentally conscious individuals and start tracking your carbon footprint today.
                            </p>
                            <div className="flex gap-4 mt-8">
                                <div className="text-center">
                                    <div className="text-2xl font-bold">10K+</div>
                                    <div className="text-green-200 text-sm">Eco Warriors</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold">50K+</div>
                                    <div className="text-green-200 text-sm">CO₂ Reduced</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold">1M+</div>
                                    <div className="text-green-200 text-sm">Actions Taken</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Registration Form */}
                    <div className="p-12 flex flex-col justify-center">
                        <div className="text-center lg:text-left mb-8">
                            <h3 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h3>
                            <p className="text-gray-600">Join us in making the planet greener</p>
                        </div>

                        <form onSubmit={handleSubmit(submitCall)} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Full Name</label>
                                <input 
                                    type="text" 
                                    id ="name"
                                    {...register("name")} 
                                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                    placeholder="Enter your full name" 
                                    required 
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Email Address</label>
                                <input 
                                    type="email" 
                                    id="email"
                                    {...register("email")}  
                                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                    placeholder="Enter your email" 
                                    required 
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Password</label>
                                    <input 
                                        type="password" 
                                        id="password" 
                                        {...register("password")} 
                                        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                        placeholder="Create password" 
                                        required 
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                                    <input 
                                        type="password" 
                                        id="confirmPassword" 
                                        {...register("confirmPassword")} 
                                        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                        placeholder="Confirm password" 
                                        required 
                                    />
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <input 
                                    type="checkbox" 
                                    name="agreeTerms" 
                                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-1"
                                    required
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

                            <button 
                                type="submit" 
                                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
                            >
                                Create Account
                            </button>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or sign up with</span>
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
                                Already have an account?{" "}
                                <a href="/login" className="text-green-600 hover:text-green-700 font-semibold transition-colors">
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
        </Base>
    );
};

export default Register;