// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const cropper = require('cropper');
const User = require('../Models/user');

const { authenticateUser } = require('../middleware/authMiddleware');

// Image upload middleware
const upload = multer({ dest: 'uploads/' });

// User routes
router.post('/login', async(req, res) => {
  const { username, password } = req.body;

  // Check if both username and password are provided
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

  try {
    // Find the admin by username
    const user = await User.findOne({ username });

    // If admin not found, or password is incorrect

    if(!user)
    {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    if(user.password != password)
    {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }


    // Admin authenticated successfully
    res.json({ success: true, message: 'Login successful', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


router.post('/upload', upload.single('profileImage'), (req, res) => {
  // Implement image processing logic (resize, convert to .webp, etc.)
  // Save image details in the database
  const { filename } = req.file;
  const userId = req.body.userId; // Assuming userId is sent in the request body
  User.findByIdAndUpdate(
    userId,
    { profileImage: filename, isApproved: false },
    { new: true },
    (err, user) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
      res.json({ success: true, message: 'Image uploaded successfully', user });
    }
  );
});

// Assuming you have the necessary imports for User and authenticateUser

router.post('/update/:userId', authenticateUser, async (req, res) => {
  try {
    const { userId, updatedData } = req.body;

    // Implement user profile update logic
    const user = await User.findByIdAndUpdate(userId, { ...updatedData, isApproved: false }, { new: true });

    res.json({ success: true, message: 'Profile updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.get('/status/:userId',  async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, isApproved: user.isApproved });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


router.get('/getUserID/:username', async (req, res) => {
  const username = req.params.username;

  try {
    // Find the user by username and retrieve the user ID
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// // Add other user routes as needed

module.exports = router;
