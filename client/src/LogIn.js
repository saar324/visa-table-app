import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './LogIn.css';

const LogIn = () => {

    const navigate = useNavigate();
    const goToFlights = () => {
        navigate('/FlightsLogTable')
    };

    return (
        <div className='form'>
            <h1>Log In 🔑</h1>
            <div className='inputs'>
                <input type='text' placeholder='Username' className='loginUserName' />
                <input type='password' placeholder='Password' className='logInPassword' />
                <button className='logInSubmit' type='Submit' onClick={goToFlights}>Log In</button>
                <span><Link to="/Register">Register</Link></span>
            </div>
        </div>
    );
};

export default LogIn;