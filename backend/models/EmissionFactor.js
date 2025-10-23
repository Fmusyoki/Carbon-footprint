// models/EmissionFactor.js
import mongoose from "mongoose";

const EmissionFactorSchema = new mongoose.Schema({
  // **REFINED CATEGORY FIELD**
  // Grouping the factors into the four main sections used by the calculator.
  category: {
    type: String,
    required: true,
    enum: ["transport", "energy", "water", "food", "waste", "other"],
  },

  // **REFINED ACTIVITY FIELD**
  // This field will hold the specific, composite factor ID (e.g., 'car_petrol', 'energy_grid', 'diet_mixed').
  activity: {
    type: String,
    required: true,
    unique: true, // Activity should be unique to prevent duplicate factors
    trim: true,
  },

  // The unit of the user's input (e.g., 'km', 'kWh', 'liter', 'day').
  unit: {
    type: String,
    required: true,
  },

  // The CO2e factor (e.g., kgCO2e/unit)
  factor: {
    type: Number,
    required: true,
  },

  // Optional: The CO2e unit for clarity (e.g., 'kgCO2e')
  co2eUnit: {
    type: String,
    default: "kgCO2e",
  },

  region: {
    type: String,
    default: "Global",
  },
  
  source: {
    type: String,
    default: "IPCC 2023",
  },

  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("EmissionFactor", EmissionFactorSchema);