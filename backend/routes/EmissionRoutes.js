// routes/emissionRoutes.js
import EmissionFactor from "../models/EmissionFactor.js";
import express from "express";



const router = express.Router();

// POST /api/emission-factors (Add one)
router.post("/addemission", async (req, res) => {
  try {
    const factor = new EmissionFactor(req.body);
    await factor.save();
    res.status(201).json(factor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /api/emission-factors (List all)
router.get("/getemission", async (req, res) => {
  const factors = await EmissionFactor.find();
  res.json(factors);
});

export default router;
