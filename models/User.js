const pool = require('../config/db'); // Correct relative path to the db.js file

// User Model
class User {
    static async findByUsername(username) {
      const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
      return result.rows[0]; // Return the user if found
    }
  
    static async createUser(username, hashedPassword) {
      const result = await pool.query(
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
        [username, hashedPassword]
      );
      return result.rows[0]; // Return the created user
    }
  }
  
  module.exports = User;