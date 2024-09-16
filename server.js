const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const flightsRoutes = require('./routes/flights');

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Adjust the origin if needed (React app on 3000)
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

app.use(bodyParser.json()); // for parsing application/json

// Routes
app.use('/api/auth', authRoutes); // Auth routes (register, login)
app.use('/api/flights', flightsRoutes); // Flights routes

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});