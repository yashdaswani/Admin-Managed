const bcrypt = require('bcrypt');
const Admin = require('../Models/Admin');
const User = require('../Models/user');

const authenticateAdmin = async(req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

  const admin = await Admin.findOne({ username });


  if(!admin)
  {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  if(admin.password != password)
  {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
      req.admin = admin;
      next();
};


const authenticateUser = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = { authenticateUser };


module.exports = { authenticateAdmin, authenticateUser };
