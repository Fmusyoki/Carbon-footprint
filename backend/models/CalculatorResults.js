
import mongoose from "mongoose";

const footprintSchema = new mongoose.Schema({
  userId: String, // optional if you have login
  date: { type: Date, default: Date.now },
  carbonValue: Number,
  category: String
});

export default mongoose.model("Footprint", footprintSchema);
