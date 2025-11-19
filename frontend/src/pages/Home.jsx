import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Base from "../components/Base";

const HomePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Base>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-green-600 to-emerald-700 text-white py-20 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className={`absolute -top-10 -left-10 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 transition-all duration-1000 ${
              isLoaded ? 'animate-pulse' : 'scale-0 opacity-0'
            }`}></div>
            <div className={`absolute -bottom-10 -right-10 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 transition-all duration-1000 delay-700 ${
              isLoaded ? 'animate-pulse' : 'scale-0 opacity-0'
            }`}></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              {/* Left Content */}
              <div className="lg:w-1/2 mb-12 lg:mb-0">
                <div className={`transition-all duration-700 delay-300 ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                  <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                    <span className={`inline-block transition-all duration-700 delay-400 ${
                      isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                    }`}>Track Your Carbon</span>
                    <span className={`block text-emerald-200 transition-all duration-700 delay-500 ${
                      isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                    }`}>Footprint</span>
                    <span className={`inline-block transition-all duration-700 delay-600 ${
                      isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}>in Real-Time</span>
                  </h1>
                  <p className={`text-xl text-emerald-100 mb-8 leading-relaxed transition-all duration-700 delay-700 ${
                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}>
                    Take control of your environmental impact with our intuitive dashboard 
                    and personalized insights. Make sustainable living effortless.
                  </p>
                  <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-800 ${
                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}>
                    <Link 
                      to="/calculator" 
                      className="bg-white text-green-700 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center group"
                    >
                      Start Tracking
                      <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </Link>
                    <button className="border-2 border-white text-white hover:bg-white hover:text-green-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                      View Shop
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Content - Dashboard Card */}
              <div className="lg:w-1/2 flex justify-center">
                <div className={`bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full transform transition-all duration-1000 delay-500 hover:scale-105 ${
                  isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'
                }`}>
                  <div className="text-green-700 mb-6">
                    <h5 className="font-bold text-xl mb-1">Carbon Dashboard</h5>
                    <small className="text-gray-500">Today</small>
                  </div>
                  
                  {/* Main Footprint Display */}
                  <div className="text-center mb-8">
                    <div className={`font-bold text-6xl text-green-600 mb-2 transition-all duration-1000 delay-700 ${
                      isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}>8.2</div>
                    <small className="text-gray-500 text-lg">kg CO₂</small>
                  </div>

                  {/* Breakdown Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Transport", value: "3.6 kg CO₂", delay: 800 },
                      { label: "Energy", value: "2.8 kg CO₂", delay: 900 },
                      { label: "Food", value: "1.5 kg CO₂", delay: 1000 },
                      { label: "Other", value: "0.3 kg CO₂", delay: 1100 }
                    ].map((item, index) => (
                      <div 
                        key={index}
                        className={`bg-green-50 rounded-xl p-4 transform transition-all duration-500 hover:scale-105 ${
                          isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'
                        }`}
                        style={{ transitionDelay: `${item.delay}ms` }}
                      >
                        <small className="text-gray-600 block text-sm">{item.label}</small>
                        <div className="font-bold text-green-700 text-lg">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { value: "8.2", label: "Your Footprint", sublabel: "kg CO₂ today", color: "green", delay: 200 },
                { value: "12.5", label: "Average", sublabel: "kg CO₂ daily", color: "blue", delay: 400 },
                { value: "-34%", label: "Reduction", sublabel: "vs last month", color: "amber", delay: 600 },
                { value: "127", label: "Trees Saved", sublabel: "this year", color: "purple", delay: 800 }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className={`text-center p-6 transition-all duration-700 ${
                    isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'
                  }`}
                  style={{ transitionDelay: `${stat.delay}ms` }}
                >
                  <div className={`font-bold text-${stat.color}-500 text-4xl mb-2`}>{stat.value}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                  <div className={`text-${stat.color}-500 text-sm font-semibold`}>{stat.sublabel}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gradient-to-br from-white to-green-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className={`text-4xl font-bold text-gray-800 mb-4 transition-all duration-700 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>Why Choose ZeroTrace?</h2>
              <p className={`text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                Powerful tools and insights to help you make sustainable choices every day
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: "🧮", title: "Easy Calculator", delay: 300 },
                { icon: "📊", title: "Track Progress", delay: 500 },
                { icon: "💡", title: "Smart Tips", delay: 700 }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className={`text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                    isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'
                  }`}
                  style={{ transitionDelay: `${feature.delay}ms` }}
                >
                  <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">{feature.icon}</span>
                  </div>
                  <h5 className="font-bold text-xl text-gray-800 mb-4">{feature.title}</h5>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.title === "Easy Calculator" && "Quickly calculate your carbon footprint across different categories with our intuitive interface."}
                    {feature.title === "Track Progress" && "Monitor your improvements over time with detailed analytics and visual progress tracking."}
                    {feature.title === "Smart Tips" && "Get personalized recommendations and actionable tips to reduce your environmental impact."}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className={`max-w-3xl mx-auto transition-all duration-700 delay-300 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <h3 className="text-4xl font-bold mb-6">Start Your Sustainability Journey Today</h3>
              <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
                Join thousands of environmentally conscious users making a positive impact on our planet. 
                Every small change counts towards a greener future.
              </p>
              <Link 
                to="/calculator" 
                className="bg-white text-green-700 hover:bg-gray-100 px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl inline-block"
              >
                Calculate Your Footprint Now
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Custom Styles for Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes countUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-count-up {
          animation: countUp 1s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        
        .animation-delay-800 {
          animation-delay: 0.8s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </Base>
  );
};

export default HomePage;