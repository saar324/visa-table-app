import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

const Navigation = () => {
  return (
    <nav className='navbar'>
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
    </nav>
  );
};

export default Navigation;