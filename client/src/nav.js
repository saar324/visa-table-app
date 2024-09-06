import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

const Navigation = () => {
  return (
    <nav className='navbar'>
      {/* Left section for profile or user info */}
      <div className='nav_left'>
        <img src="/path_to_icon_or_image" alt="Profile" className='profile_icon' />
        <span className='user_name'>Hello Saar</span>
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
            <Link to="/LogIn">Log Out 🔑</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;