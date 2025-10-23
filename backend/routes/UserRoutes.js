const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Create user
router.post('/add', async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all users
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;
