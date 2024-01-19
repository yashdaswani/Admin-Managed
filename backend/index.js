const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://yash:yash@cluster0.ulq8vzc.mongodb.net/?retryWrites=true&w=majorityy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  writeConcern: {
    w: 'majority',
    j: true,
    wtimeout: 1000,
  },
});

app.use(cors())
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'Yash', resave: true, saveUninitialized: true }));

const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
