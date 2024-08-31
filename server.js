const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// API route for fetching flight logs
app.get('/flights_log', async (req, res) => {
  try {
    const query = `
      SELECT flights_log.id, 
             countries_visas.country_name, 
             stay_limits.visa_name, 
             flights_log.start_date, 
             flights_log.end_date, 
             flights_log.duration
      FROM flights_log
      JOIN countries_visas ON flights_log.country_visa_id = countries_visas.id
      JOIN stay_limits ON countries_visas.stay_limit_id = stay_limits.id
      ORDER BY flights_log.id ASC;
    `;
    
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// API route for fetching countries and visas
app.get('/countries_visas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM countries_visas ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// API route for adding a new flight log
app.post('/flights_log', async (req, res) => {
  const { country_visa_id, start_date, end_date } = req.body;
  try {
    const query = `
      INSERT INTO flights_log (country_visa_id, start_date, end_date) 
      VALUES ($1, $2, $3) 
      RETURNING *;
    `;
    const result = await pool.query(query, [country_visa_id, start_date, end_date]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting row:', err);
    res.status(500).send('Server Error');
  }
});

// API route for deleting a flight log by ID
app.delete('/flights_log/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM flights_log WHERE id = $1', [id]);
    if (result.rowCount > 0) {
      res.status(200).json({ message: 'Row deleted successfully' });
    } else {
      res.status(404).json({ message: 'Row not found' });
    }
  } catch (error) {
    console.error('Error deleting row:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Serve static files after defining API routes
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});