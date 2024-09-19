import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './nav.css';


const Navigation = () => {

  const [username, setUsername] = useState('');

  useEffect(() => {
    // Fetch the username from localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);  // Set the username from localStorage
    }
  }, []);

  return (
    <nav className='navbar'>
      {/* Left section for profile or user info */}
      <div className='nav_left'>
        <span>🙎‍♂️</span>
        <span className='user_name'>{`Hello ${username}`}</span>
      </div>

      {/* Centered navigation items */}
      <div className='nav_center'>
        <ul className='nav_items'>
          <li className='nav_item'>
            <Link to="/FlightsLogTable">Flights ✈️</Link>
          </li>
          <li className='nav_item'>
            <Link to="/Prediction">Prediction 🧮</Link>
          </li>
          <li className='nav_item'>
            <Link to="/LogIn">Log Out 🔒</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;