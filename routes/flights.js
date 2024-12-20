const express = require('express');
const pool = require('../config/db'); // Import PostgreSQL pool connection
const router = express.Router();


// Fetch all flight logs with dynamic username
router.get('/flights_log', async (req, res) => {
  try {
    // Extract the username from the query parameters
    const { username } = req.query;

    // Ensure username is provided
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    // Adjusted query with parameterized username
    const query = `
      SELECT flights_log.id, countries_visas.country_name, stay_limits.visa_name, 
             flights_log.start_date, flights_log.end_date, flights_log.duration
      FROM flights_log
      JOIN countries_visas ON flights_log.country_visa_id = countries_visas.id
      JOIN stay_limits ON countries_visas.stay_limit_id = stay_limits.id
      JOIN users ON users.id = flights_log.user_id
      WHERE users.username = $1
      ORDER BY flights_log.id ASC;
    `;

    // Execute the query and pass the username as a parameter
    const result = await pool.query(query, [username]);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Fetch countries_visas
router.get('/countries_visas', async (req, res) => {
  try {
    const query = 'SELECT * FROM countries_visas ORDER BY id ASC';
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add a new flight log
router.post('/flights_log', async (req, res) => {
  const { country_visa_id, start_date, end_date, username } = req.body;
  try {
    // First, retrieve the user_id based on the username from the users table
    const userQuery = `SELECT id FROM users WHERE username = $1`;
    const userResult = await pool.query(userQuery, [username]);
    
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const user_id = userResult.rows[0].id;

    // Now insert the flight log using the retrieved user_id
    const query = `
      INSERT INTO flights_log (country_visa_id, start_date, end_date, user_id) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *;
    `;
    const result = await pool.query(query, [country_visa_id, start_date, end_date, user_id]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting row:', err);
    res.status(500).send('Server Error');
  }
});

// Delete a flight log by ID
router.delete('/flights_log/:id', async (req, res) => {
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

module.exports = router;