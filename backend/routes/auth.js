const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../Models/user');
// const authMiddleware = require('../authMiddleware');

// User login route
router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find the user in the database
      const user = await User.findOne({ username });
  
      // If the user doesn't exist, return an error
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the provided password matches the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (passwordMatch) {
        // Set the user ID in the session to mark the user as logged in
        req.session.userId = user._id;
        res.json({ message: 'Login successful', user });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  // User logout route
  router.post('/logout', (req, res) => {
    try {
      // Destroy the session to log the user out
      req.session.destroy(() => {
        res.json({ message: 'Logout successful' });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });