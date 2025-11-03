import React, { useState, useEffect } from "react";
import axios from "axios";
import Base from "../components/Base";

const CarbonFootprintTracker = () => {
  const initialForm = {
    // Transportation
    transportType: "car",
    carType: "petrol",
    busType: "diesel",
    transportDistance: "",
    
    // Energy
    energySource: "grid",
    energyUsage: "",
    
    // Water
    waterUsage: "",
    showerMinutes: "",
    
    // Food Consumption
    dietType: "mixed",
    meatConsumption: "medium",
    localFoodPercentage: "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [factors, setFactors] = useState([]);
  const [results, setResults] = useState(null);
  const [activeSection, setActiveSection] = useState("transport");
  const [isCalculating, setIsCalculating] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [history, setHistory] = useState([]);

  // Fetch emission factors from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/emissionfactors/getemission")
      .then((res) => setFactors(res.data))
      .catch((err) => console.error("Error fetching emission factors:", err));
  }, []);

  // Load saved results on component mount
  useEffect(() => {
    const savedHistory = loadResults();
    setHistory(savedHistory);
  }, []);

  // Save results to localStorage
  const saveResults = (resultsData) => {
    const timestamp = new Date().toISOString();
    const savedResults = {
      id: Date.now(),
      timestamp,
      formData: { ...formData },
      results: resultsData
    };

    // Get existing results or initialize empty array
    const existingResults = JSON.parse(localStorage.getItem('carbonFootprintHistory') || '[]');
    
    // Add new result and keep only last 10 entries
    const updatedResults = [savedResults, ...existingResults].slice(0, 10);
    
    localStorage.setItem('carbonFootprintHistory', JSON.stringify(updatedResults));
    setHistory(updatedResults);
    return savedResults;
  };

  // Load results from localStorage
  const loadResults = () => {
    try {
      return JSON.parse(localStorage.getItem('carbonFootprintHistory') || '[]');
    } catch (error) {
      console.error('Error loading saved results:', error);
      return [];
    }
  };

  // Clear history
  const clearHistory = () => {
    localStorage.removeItem('carbonFootprintHistory');
    setHistory([]);
  };

  // Helper function to get emission factor by activity and type
  const getFactor = (activity, subtype = null) => {
    if (!factors || factors.length === 0) return 0;
    if (subtype) {
      const match = factors.find(
        (f) => f.activity === `${activity}_${subtype}` || f.activity === subtype
      );
      return match ? match.factor : 0;
    }
    const match = factors.find((f) => f.activity === activity);
    return match ? match.factor : 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const calculateFootprint = async () => {
    if (factors.length === 0) {
      alert("Emission factors not loaded yet!");
      return;
    }

    setIsCalculating(true);

    // Simulate calculation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Convert all numeric fields safely
    const num = (val) => parseFloat(val) || 0;

    // Transportation calculations
    let transportEmissions = 0;
    const distance = num(formData.transportDistance);
    
    switch (formData.transportType) {
      case "car":
        transportEmissions = distance * getFactor("car", formData.carType);
        break;
      case "bus":
        transportEmissions = distance * getFactor("bus", formData.busType);
        break;
      case "motorcycle":
        transportEmissions = distance * getFactor("motorcycle");
        break;
      case "train":
        transportEmissions = distance * getFactor("train");
        break;
      case "flight":
        transportEmissions = distance * getFactor("flight");
        break;
      case "bicycle":
      case "walking":
        transportEmissions = 0; // Zero emissions
        break;
      default:
        transportEmissions = 0;
    }

    // Energy calculations
    const energyEmissions = num(formData.energyUsage) * getFactor("energy", formData.energySource);

    // Water calculations
    const waterEmissions = num(formData.waterUsage) * getFactor("water") + 
                          num(formData.showerMinutes) * getFactor("shower");

    // Food calculations
    let foodEmissions = 0;
    const dietFactors = {
      vegan: getFactor("diet", "vegan"),
      vegetarian: getFactor("diet", "vegetarian"),
      "low-meat": getFactor("diet", "low-meat"),
      mixed: getFactor("diet", "mixed"),
      "high-meat": getFactor("diet", "high-meat")
    };
    
    foodEmissions = dietFactors[formData.dietType] || 0;
    
    // Adjust for meat consumption intensity
    const meatFactors = {
      low: 0.8,
      medium: 1.0,
      high: 1.3
    };
    foodEmissions *= (meatFactors[formData.meatConsumption] || 1);
    
    // Adjust for local food percentage
    const foodReduction = (num(formData.localFoodPercentage) / 100) * 0.1;
    foodEmissions *= (1 - foodReduction);

    const totalEmissions = transportEmissions + energyEmissions + waterEmissions + foodEmissions;

    const recommendations = generateRecommendations({
      transportEmissions,
      energyEmissions,
      waterEmissions,
      foodEmissions,
      totalEmissions,
      transportType: formData.transportType,
      dietType: formData.dietType
    });

    const finalResults = {
      totalEmissions: Math.round(totalEmissions * 100) / 100,
      breakdown: {
        transportation: Math.round(transportEmissions * 100) / 100,
        energy: Math.round(energyEmissions * 100) / 100,
        water: Math.round(waterEmissions * 100) / 100,
        food: Math.round(foodEmissions * 100) / 100,
      },
      recommendations,
    };

    setResults(finalResults);
    saveResults(finalResults); // Save to localStorage
    setIsCalculating(false);
  };

  const generateRecommendations = (data) => {
    const recs = [];
    
    // Transportation recommendations
    if (data.transportEmissions > 20) {
      if (data.transportType === "car") {
        recs.push({
          category: "Transportation",
          message: "Consider switching to public transport or carpooling",
          impact: "High",
          icon: "🚗",
          co2Reduction: "Up to 50%",
        });
      } else if (data.transportType === "flight") {
        recs.push({
          category: "Travel",
          message: "Try to minimize air travel or choose direct flights",
          impact: "Very High",
          icon: "✈️",
          co2Reduction: "Up to 80%",
        });
      }
    }

    // Food recommendations
    if (data.foodEmissions > 15 && data.dietType !== "vegan") {
      recs.push({
        category: "Food",
        message: "Consider reducing meat consumption or switching to plant-based options",
        impact: "Medium",
        icon: "🍖",
        co2Reduction: "Up to 40%",
      });
    }

    // Energy recommendations
    if (data.energyEmissions > 25) {
      recs.push({
        category: "Energy",
        message: "Use energy-efficient appliances and consider renewable energy sources",
        impact: "High",
        icon: "💡",
        co2Reduction: "Up to 60%",
      });
    }

    // Water recommendations
    if (data.waterEmissions > 10) {
      recs.push({
        category: "Water",
        message: "Reduce shower time and fix any water leaks",
        impact: "Medium",
        icon: "💧",
        co2Reduction: "Up to 20%",
      });
    }

    if (data.totalEmissions < 30) {
      recs.push({
        category: "Overall",
        message: "Excellent! Your carbon footprint is below average.",
        impact: "Excellent",
        icon: "🌱",
        co2Reduction: "Keep it up!",
      });
    }

    return recs;
  };

  const getEmissionColor = (emissions) => {
    if (emissions < 20) return "text-green-600";
    if (emissions < 50) return "text-amber-600";
    return "text-red-600";
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case "Excellent": return "bg-green-100 text-green-800";
      case "High": return "bg-red-100 text-red-800";
      case "Very High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-amber-100 text-amber-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  // History Display Component
  const HistoryDisplay = () => (
    <div className="mt-6 bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Recent Calculations</h3>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
          >
            Clear History
          </button>
        )}
      </div>
      {history.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-4">No previous calculations found</p>
      ) : (
        <div className="space-y-3">
          {history.map((entry) => (
            <div 
              key={entry.id} 
              className="flex justify-between items-center p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => setResults(entry.results)}
            >
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-medium text-gray-700 text-sm sm:text-base">
                    {new Date(entry.timestamp).toLocaleDateString()}
                  </span>
                  <span className="text-xs text-gray-500 mt-1 sm:mt-0">
                    {new Date(entry.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div className="mt-1 text-xs text-gray-600">
                  Transport: {entry.formData.transportType} • Energy: {entry.formData.energySource}
                </div>
              </div>
              <span className={`font-bold text-lg ${getEmissionColor(entry.results.totalEmissions)} ml-4`}>
                {entry.results.totalEmissions} kg
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const navigationSections = [
    { id: "transport", label: "Transport", icon: "🚗" },
    { id: "energy", label: "Energy", icon: "⚡" },
    { id: "water", label: "Water", icon: "💧" },
    { id: "food", label: "Food", icon: "🍽️" },
  ];

  // Mobile Navigation Component
  const MobileNavigation = () => (
    <div className="lg:hidden mb-6">
      <div className="bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800">Navigation</h3>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <span className="text-lg">{isMobileMenuOpen ? "▲" : "▼"}</span>
          </button>
        </div>
        
        <div className={`grid grid-cols-2 gap-2 transition-all duration-300 ${
          isMobileMenuOpen ? 'grid-rows-4 opacity-100' : 'grid-rows-0 opacity-0 h-0'
        }`}>
          {navigationSections.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                setActiveSection(section.id);
                setIsMobileMenuOpen(false);
              }}
              className={`p-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 text-sm ${
                activeSection === section.id
                  ? "bg-green-500 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <span className="text-base">{section.icon}</span>
              <span className="font-medium">{section.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Base>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 py-4 sm:py-8">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4 px-2">
              Carbon Footprint Calculator
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Calculate your environmental impact and discover ways to reduce your carbon footprint.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
            {/* Desktop Navigation Sidebar */}
            <div className="hidden lg:block lg:w-1/4">
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 sticky top-4">
                <h3 className="font-bold text-gray-800 mb-4 text-lg">Calculate Your Impact</h3>
                <nav className="space-y-2">
                  {navigationSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center space-x-3 ${
                        activeSection === section.id
                          ? "bg-green-500 text-white shadow-md"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <span className="text-xl">{section.icon}</span>
                      <span className="font-medium">{section.label}</span>
                    </button>
                  ))}
                </nav>
                
                {/* History in Sidebar */}
                {history.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-800 mb-3 text-sm">Recent Calculations</h4>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {history.slice(0, 3).map((entry) => (
                        <div 
                          key={entry.id}
                          onClick={() => setResults(entry.results)}
                          className="p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer text-xs"
                        >
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              {new Date(entry.timestamp).toLocaleDateString()}
                            </span>
                            <span className={`font-bold ${getEmissionColor(entry.results.totalEmissions)}`}>
                              {entry.results.totalEmissions} kg
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mt-6 p-3 sm:p-4 bg-green-50 rounded-xl border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2 text-sm sm:text-base">Why Calculate?</h4>
                  <p className="text-xs sm:text-sm text-green-700">
                    Understanding your carbon footprint is the first step towards making sustainable choices.
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4">
              {/* Mobile Navigation */}
              <MobileNavigation />

              {/* History Section for Mobile */}
              {history.length > 0 && (
                <div className="lg:hidden mb-6">
                  <HistoryDisplay />
                </div>
              )}

              <form onSubmit={(e) => {
                e.preventDefault();
                calculateFootprint();
              }} className="space-y-4 sm:space-y-6">
                {/* Transportation Section */}
                <div className={`bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 transition-all duration-300 ${
                  activeSection === "transport" ? "border-2 border-green-500" : "border border-gray-200"
                }`}>
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                    <span className="text-2xl sm:text-3xl">🚗</span>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Transportation</h3>
                      <p className="text-gray-600 text-sm sm:text-base">How do you get around?</p>
                    </div>
                  </div>

                  <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-1 md:grid-cols-2 sm:gap-4 lg:gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Transport Type
                      </label>
                      <select
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                        name="transportType"
                        value={formData.transportType}
                        onChange={handleChange}
                      >
                        <option value="car">Car</option>
                        <option value="bus">Bus</option>
                        <option value="motorcycle">Motorcycle</option>
                        <option value="train">Train</option>
                        <option value="flight">Flight</option>
                        <option value="bicycle">Bicycle</option>
                        <option value="walking">Walking</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Distance (km)
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                        name="transportDistance"
                        value={formData.transportDistance}
                        onChange={handleChange}
                        placeholder="Enter distance traveled"
                      />
                    </div>
                  </div>

                  {/* Conditional fields */}
                  {(formData.transportType === "car" || formData.transportType === "bus") && (
                    <div className="mt-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {formData.transportType === "car" ? "Car Type" : "Bus Type"}
                      </label>
                      <select
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                        name={formData.transportType === "car" ? "carType" : "busType"}
                        value={formData.transportType === "car" ? formData.carType : formData.busType}
                        onChange={handleChange}
                      >
                        {formData.transportType === "car" ? (
                          <>
                            <option value="petrol">Petrol</option>
                            <option value="diesel">Diesel</option>
                            <option value="electric">Electric</option>
                            <option value="hybrid">Hybrid</option>
                          </>
                        ) : (
                          <>
                            <option value="diesel">Diesel</option>
                            <option value="electric">Electric</option>
                            <option value="cng">CNG</option>
                          </>
                        )}
                      </select>
                    </div>
                  )}
                </div>

                {/* Energy Section */}
                <div className={`bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 transition-all duration-300 ${
                  activeSection === "energy" ? "border-2 border-green-500" : "border border-gray-200"
                }`}>
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                    <span className="text-2xl sm:text-3xl">⚡</span>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Energy Usage</h3>
                      <p className="text-gray-600 text-sm sm:text-base">How much energy do you consume?</p>
                    </div>
                  </div>

                  <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-1 md:grid-cols-2 sm:gap-4 lg:gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Energy Source
                      </label>
                      <select
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                        name="energySource"
                        value={formData.energySource}
                        onChange={handleChange}
                      >
                        <option value="grid">Grid Electricity</option>
                        <option value="solar">Solar</option>
                        <option value="wind">Wind</option>
                        <option value="hydro">Hydro</option>
                        <option value="natural-gas">Natural Gas</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Energy Usage (kWh/month)
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                        name="energyUsage"
                        value={formData.energyUsage}
                        onChange={handleChange}
                        placeholder="Enter monthly energy consumption"
                      />
                    </div>
                  </div>
                </div>

                {/* Water Section */}
                <div className={`bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 transition-all duration-300 ${
                  activeSection === "water" ? "border-2 border-green-500" : "border border-gray-200"
                }`}>
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                    <span className="text-2xl sm:text-3xl">💧</span>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Water Usage</h3>
                      <p className="text-gray-600 text-sm sm:text-base">How much water do you use daily?</p>
                    </div>
                  </div>

                  <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-1 md:grid-cols-2 sm:gap-4 lg:gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Water Usage (liters/day)
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                        name="waterUsage"
                        value={formData.waterUsage}
                        onChange={handleChange}
                        placeholder="Enter daily water consumption"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Shower Minutes per Day
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                        name="showerMinutes"
                        value={formData.showerMinutes}
                        onChange={handleChange}
                        placeholder="Enter daily shower time"
                      />
                    </div>
                  </div>
                </div>

                {/* Food Section */}
                <div className={`bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 transition-all duration-300 ${
                  activeSection === "food" ? "border-2 border-green-500" : "border border-gray-200"
                }`}>
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                    <span className="text-2xl sm:text-3xl">🍽️</span>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Food Consumption</h3>
                      <p className="text-gray-600 text-sm sm:text-base">What's your dietary footprint?</p>
                    </div>
                  </div>

                  <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-1 md:grid-cols-2 sm:gap-4 lg:gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Diet Type
                      </label>
                      <select
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                        name="dietType"
                        value={formData.dietType}
                        onChange={handleChange}
                      >
                        <option value="vegan">Vegan</option>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="low-meat">Low Meat</option>
                        <option value="mixed">Mixed</option>
                        <option value="high-meat">High Meat</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Meat Consumption Level
                      </label>
                      <select
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                        name="meatConsumption"
                        value={formData.meatConsumption}
                        onChange={handleChange}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Local Food Consumption (%)
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                      name="localFoodPercentage"
                      value={formData.localFoodPercentage}
                      onChange={handleChange}
                      placeholder="Percentage of locally sourced food"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end pt-4">
                  <button
                    type="button"
                    className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-300 text-gray-700 rounded-lg sm:rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 text-sm sm:text-base order-2 sm:order-1"
                    onClick={() => setFormData(initialForm)}
                  >
                    Reset All
                  </button>
                  <button 
                    type="submit" 
                    className="px-6 sm:px-8 py-3 sm:py-4 bg-green-600 text-white rounded-lg sm:rounded-xl font-semibold hover:bg-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base order-1 sm:order-2"
                    disabled={isCalculating}
                  >
                    {isCalculating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                        Calculating...
                      </>
                    ) : (
                      "Calculate My Footprint"
                    )}
                  </button>
                </div>
              </form>

              {/* History Section for Desktop */}
              {history.length > 0 && (
                <div className="hidden lg:block">
                  <HistoryDisplay />
                </div>
              )}

              {/* Results Section */}
              {results && (
                <div className="mt-8 sm:mt-12 animate-fade-in-up">
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-green-200">
                    <div className="text-center mb-6 sm:mb-8">
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
                        Your Carbon Footprint Results
                      </h2>
                      <div className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${getEmissionColor(results.totalEmissions)} mb-2`}>
                        {results.totalEmissions} kg CO₂
                      </div>
                      <p className="text-gray-600 text-sm sm:text-base">Total Carbon Emissions</p>
                    </div>

                    {/* Breakdown */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">Breakdown by Category</h3>
                        <div className="space-y-3 sm:space-y-4">
                          {Object.entries(results.breakdown).map(([category, emissions]) => (
                            <div key={category} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                              <span className="font-medium text-gray-700 capitalize text-sm sm:text-base">
                                {category}
                              </span>
                              <span className={`font-bold ${getEmissionColor(emissions)} text-sm sm:text-base`}>
                                {emissions} kg
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">Personalized Recommendations</h3>
                        <div className="space-y-3 sm:space-y-4">
                          {results.recommendations.map((rec, index) => (
                            <div key={index} className="p-3 sm:p-4 border border-gray-200 rounded-lg sm:rounded-xl hover:shadow-md transition-shadow duration-200">
                              <div className="flex items-start space-x-2 sm:space-x-3">
                                <span className="text-xl sm:text-2xl">{rec.icon}</span>
                                <div className="flex-1 min-w-0">
                                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-1">
                                    <h4 className="font-semibold text-gray-800 text-sm sm:text-base">{rec.category}</h4>
                                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getImpactColor(rec.impact)} self-start sm:self-auto`}>
                                      {rec.impact}
                                    </span>
                                  </div>
                                  <p className="text-gray-600 mb-2 text-sm sm:text-base">{rec.message}</p>
                                  <div className="flex items-center text-xs sm:text-sm text-green-600 font-medium">
                                    <span>Potential reduction: {rec.co2Reduction}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Call to Action */}
                    <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-green-50 rounded-xl border border-green-200">
                      <div className="text-center">
                        <h3 className="text-lg sm:text-xl font-semibold text-green-800 mb-2">
                          Ready to Make a Difference?
                        </h3>
                        <p className="text-green-700 mb-3 sm:mb-4 text-sm sm:text-base">
                          Start implementing these recommendations today and track your progress over time.
                        </p>
                        <a href="/actionplan">View AP</a><button className="bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold hover:bg-green-700 transition-colors duration-200 text-sm sm:text-base">
                          View Your Action Plan
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
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
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        /* Mobile menu animation */
        .grid-rows-0 {
          grid-template-rows: 0fr;
        }
        
        .grid-rows-4 {
          grid-template-rows: 1fr;
        }
      `}</style>
    </Base>
  );
};

export default CarbonFootprintTracker;