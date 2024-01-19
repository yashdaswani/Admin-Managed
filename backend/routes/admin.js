const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Admin = require('../Models/Admin');
const User = require('..//Models/user');
const { authenticateAdmin } = require('../middleware/authMiddleware');


router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

  try {
    const admin = await Admin.findOne({ username });


    if(!admin)
    {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    if(admin.password != password)
    {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }


    res.json({ success: true, message: 'Login successful', admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


router.get('/dashboard', async (req, res) => {
  try {
    const users = await User.find({}, '_id username profileImage isApproved');

    res.json({ success: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});



router.post('/createUser', async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    const newUser = new User({ username, password, isApproved: false });

    await newUser.save();

    res.status(201).json({ success: true, message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});



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


module.exports = router;
