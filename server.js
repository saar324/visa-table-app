const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const flightsRoutes = require('./routes/flights');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json

// Routes
app.use('/api/auth', authRoutes); // Auth routes (register, login)
app.use('/api/flights', flightsRoutes); // Flights routes

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});