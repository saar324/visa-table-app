const express = require('express');
const pool = require('../config/db'); // Import PostgreSQL pool connection
const router = express.Router();

// Fetch all flight logs
router.get('/flights_log', async (req, res) => {
  try {
    const query = `
      SELECT flights_log.id, countries_visas.country_name, stay_limits.visa_name, 
             flights_log.start_date, flights_log.end_date, flights_log.duration
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