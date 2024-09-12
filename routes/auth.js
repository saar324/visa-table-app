require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import User model
const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.status(400).send('Username already exists');
    }

    // Hash password and save new user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.createUser(username, hashedPassword);

    res.status(201).json({ message: 'User registered', user: newUser });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findByUsername(username);
    if (!user) return res.status(400).send('Invalid username or password');

    // Compare passwords
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid password');

    // Generate JWT token
    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.header('auth-token', token).json({ message: 'Logged in', token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;