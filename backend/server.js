import emissionRoutes from "../backend/routes/EmissionRoutes.js"
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import 'dotenv/config';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Simple route for testing
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Community Route
app.post('/createblog', (req, res) => {
  BlogModel.create(req.body)
  .then(users => res.json(users))
  .catch(err => res.json(err))
})
// Emission Factor Routes
app.use('/emissionfactors', emissionRoutes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


