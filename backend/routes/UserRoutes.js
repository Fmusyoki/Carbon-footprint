import express from 'express';
import User from "../models/User.js"

const router = express.Router();

// Create user
router.post('/signup', async (req, res) => {
  try {
    const { name,email,password,confirmPassword } = req.body;
    const newUser = new User({ name,email,password,confirmPassword });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // 4. Successful login
        res.status(200).json({ 
            message: 'Login successful', 
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error during login' });
    }
});
export default router;