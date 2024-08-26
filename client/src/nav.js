import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

const Navigation = () => {
    return (
        <nav className='navbar'>
            <ul className='nav_items'>
                <li className='nav_item'>
                    <Router to ="/">Flights ✈️</Router>
                </li>
                <li className='nav_item'>
                    <Router to ="/">Prediction 🧮</Router>
                </li>
                <li className='nav_item'>
                    <Router to ="/">Log Out 🔑</Router>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;