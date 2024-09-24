import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();
  const handelLogOutClick = () => {
    if (window.confirm("Are you sure you want to Log Out?")){
      navigate('/LogIn');
    }
  };

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
          <li className='nav_item' onClick={handelLogOutClick}>Log Out 🔒
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;