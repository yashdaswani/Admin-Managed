// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Admin = require('../Models/Admin');
const User = require('..//Models/user');
const { authenticateAdmin } = require('../middleware/authMiddleware');


// Admin routes
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Check if both username and password are provided
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

  try {
    // Find the admin by username
    const admin = await Admin.findOne({ username });

    // If admin not found, or password is incorrect

    if(!admin)
    {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    if(admin.password != password)
    {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }


    // Admin authenticated successfully
    res.json({ success: true, message: 'Login successful', admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Assuming you have the necessary imports for User

router.get('/dashboard', async (req, res) => {
  try {
    const users = await User.find({}, '_id username profileImage isApproved');

    res.json({ success: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


// Assuming you have the necessary imports for User and any required modules

router.post('/createUser', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if both username and password are provided
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    // Create a new user instance
    const newUser = new User({ username, password, isApproved: false });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ success: true, message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


// Assuming you have the necessary imports for User and authenticateAdmin

router.get('/viewUser/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.post('/approveUser/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findByIdAndUpdate(userId, { isApproved: true }, { new: true });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, message: 'User approved successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.post('/deleteUser/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Add other admin routes as needed

module.exports = router;
