import React from 'react';
import { Link } from 'react-router-dom';
import './LogIn.css';

const LogIn = () => {
    return (
        <div className='form'>
            <h1>Log In 🔑</h1>
            <div className='inputs'>
                <input type='text' placeholder='Username' className='loginUserName' />
                <input type='password' placeholder='Password' className='logInPassword' />
                <button className='logInSubmit' type='Submit'>Log In</button>
                <span><Link to="/Register">Register</Link></span>
            </div>
        </div>
    );
};

export default LogIn;