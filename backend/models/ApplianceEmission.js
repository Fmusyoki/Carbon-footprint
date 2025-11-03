// models/EnergyEmissionFactor.js
import mongoose from "mongoose";

const EnergyEmissionFactorSchema = new mongoose.Schema({
  // Main category of the energy user (home, industrial, commercial, etc.)
  category: {
    type: String,
    required: true,
    enum: ["home", "industrial", "commercial", "public"],
  },

  // Appliance or equipment name (e.g., "Refrigerator", "Industrial Motor")
  appliance: {
    type: String,
    required: true,
    trim: true,
  },

  // Typical rated power consumption of the appliance in watts (W)
  power_watts: {
    type: Number,
    required: true,
  },

  // Energy source used for operation (grid, solar, wind, hydro, naturalGas)
  energy_source: {
    type: String,
    required: true,
    enum: ["grid", "solar", "wind", "hydro", "naturalGas"],
  },

  // Emission factor in kgCO2e per kWh
  emission_factor: {
    type: Number,
    required: true,
  },

  // Unit for clarity
  unit: {
    type: String,
    default: "kgCO₂e/kWh",
  },

  // Optional notes or assumptions
  notes: {
    type: String,
    default: "",
  },

  // Region — useful for adjusting local emission intensities
  region: {
    type: String,
    default: "Kenya",
  },

  // Data source or reference (helps trace factor origins)
  source: {
    type: String,
    default: "Kenya Grid Emission Report 2024 / IPCC 2023",
  },

  // Date when the record was last updated
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("EnergyEmissionFactor", EnergyEmissionFactorSchema);
