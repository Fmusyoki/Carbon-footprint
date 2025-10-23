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

  // Fetch emission factors from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/emissionfactors")
      .then((res) => setFactors(res.data))
      .catch((err) => console.error("Error fetching emission factors:", err));
  }, []);

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

  const calculateFootprint = () => {
    if (factors.length === 0) {
      alert("Emission factors not loaded yet!");
      return;
    }

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

    setResults({
      totalEmissions: Math.round(totalEmissions * 100) / 100,
      breakdown: {
        transportation: Math.round(transportEmissions * 100) / 100,
        energy: Math.round(energyEmissions * 100) / 100,
        water: Math.round(waterEmissions * 100) / 100,
        food: Math.round(foodEmissions * 100) / 100,
      },
      recommendations,
    });
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
        });
      } else if (data.transportType === "flight") {
        recs.push({
          category: "Travel",
          message: "Try to minimize air travel or choose direct flights",
          impact: "Very High",
          icon: "✈️",
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
      });
    }

    // Energy recommendations
    if (data.energyEmissions > 25) {
      recs.push({
        category: "Energy",
        message: "Use energy-efficient appliances and consider renewable energy sources",
        impact: "High",
        icon: "💡",
      });
    }

    // Water recommendations
    if (data.waterEmissions > 10) {
      recs.push({
        category: "Water",
        message: "Reduce shower time and fix any water leaks",
        impact: "Medium",
        icon: "💧",
      });
    }

    if (data.totalEmissions < 30) {
      recs.push({
        category: "Overall",
        message: "Excellent! Your carbon footprint is below average.",
        impact: "Excellent",
        icon: "🌱",
      });
    }

    return recs;
  };

  return (
    <Base>
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold text-success mb-3">
            🌍 Carbon Footprint Tracker
          </h1>
          <p className="lead text-muted">
            Track your environmental impact using real emission data from our database
          </p>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          calculateFootprint();
        }}>
          {/* Transportation Section */}
          <div className="card p-4 mb-4 shadow-sm">
            <h5 className="text-success mb-3">🚗 Transportation</h5>
            
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Transport Type</label>
                <select
                  className="form-select"
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
              <div className="col-md-6">
                <label className="form-label">Distance (km)</label>
                <input
                  type="number"
                  className="form-control"
                  name="transportDistance"
                  value={formData.transportDistance}
                  onChange={handleChange}
                  placeholder="Enter distance traveled"
                />
              </div>
            </div>

            {/* Conditional fields based on transport type */}
            {formData.transportType === "car" && (
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Car Type</label>
                  <select
                    className="form-select"
                    name="carType"
                    value={formData.carType}
                    onChange={handleChange}
                  >
                    <option value="petrol">Petrol</option>
                    <option value="diesel">Diesel</option>
                    <option value="electric">Electric</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
              </div>
            )}

            {formData.transportType === "bus" && (
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Bus Type</label>
                  <select
                    className="form-select"
                    name="busType"
                    value={formData.busType}
                    onChange={handleChange}
                  >
                    <option value="diesel">Diesel</option>
                    <option value="electric">Electric</option>
                    <option value="cng">CNG</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Energy Section */}
          <div className="card p-4 mb-4 shadow-sm">
            <h5 className="text-success mb-3">⚡ Energy</h5>
            
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Energy Source</label>
                <select
                  className="form-select"
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
              <div className="col-md-6">
                <label className="form-label">Energy Usage (kWh/month)</label>
                <input
                  type="number"
                  className="form-control"
                  name="energyUsage"
                  value={formData.energyUsage}
                  onChange={handleChange}
                  placeholder="Enter monthly energy consumption"
                />
              </div>
            </div>
          </div>

          {/* Water Section */}
          <div className="card p-4 mb-4 shadow-sm">
            <h5 className="text-success mb-3">💧 Water</h5>
            
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Water Usage (liters/day)</label>
                <input
                  type="number"
                  className="form-control"
                  name="waterUsage"
                  value={formData.waterUsage}
                  onChange={handleChange}
                  placeholder="Enter daily water consumption"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Shower Minutes per Day</label>
                <input
                  type="number"
                  className="form-control"
                  name="showerMinutes"
                  value={formData.showerMinutes}
                  onChange={handleChange}
                  placeholder="Enter daily shower time"
                />
              </div>
            </div>
          </div>

          {/* Food Consumption Section */}
          <div className="card p-4 mb-4 shadow-sm">
            <h5 className="text-success mb-3">🍽️ Food Consumption</h5>
            
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Diet Type</label>
                <select
                  className="form-select"
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
              <div className="col-md-6">
                <label className="form-label">Meat Consumption Level</label>
                <select
                  className="form-select"
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

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Local Food Consumption (%)</label>
                <input
                  type="number"
                  className="form-control"
                  name="localFoodPercentage"
                  value={formData.localFoodPercentage}
                  onChange={handleChange}
                  placeholder="Percentage of locally sourced food"
                  min="0"
                  max="100"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
            <button
              type="button"
              className="btn btn-outline-secondary me-md-2"
              onClick={() => setFormData(initialForm)}
            >
              Reset
            </button>
            <button type="submit" className="btn btn-success px-4">
              Calculate Footprint
            </button>
          </div>
        </form>

        {/* Results Section */}
        {results && results.totalEmissions > 0 && (
          <div className="mt-5 p-4 bg-light rounded">
            <h3 className="text-success mb-4">
              Total Carbon Footprint: {results.totalEmissions} kg CO₂
            </h3>
            
            <div className="row">
              <div className="col-md-6">
                <h5>Breakdown by Category:</h5>
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Transportation
                    <span className="badge bg-primary rounded-pill">
                      {results.breakdown.transportation} kg
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Energy
                    <span className="badge bg-primary rounded-pill">
                      {results.breakdown.energy} kg
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Water
                    <span className="badge bg-primary rounded-pill">
                      {results.breakdown.water} kg
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Food
                    <span className="badge bg-primary rounded-pill">
                      {results.breakdown.food} kg
                    </span>
                  </li>
                </ul>
              </div>
              
              <div className="col-md-6">
                <h5>Recommendations:</h5>
                {results.recommendations.map((rec, index) => (
                  <div key={index} className="card mb-2">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <span className="me-2">{rec.icon}</span>
                        <div>
                          <h6 className="card-title mb-1">{rec.category}</h6>
                          <p className="card-text mb-1">{rec.message}</p>
                          <small className={`badge ${
                            rec.impact === 'Excellent' ? 'bg-success' : 
                            rec.impact === 'High' ? 'bg-danger' : 
                            rec.impact === 'Medium' ? 'bg-warning' : 'bg-info'
                          }`}>
                            {rec.impact} Impact
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Base>
  );
};

export default CarbonFootprintTracker;