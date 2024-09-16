import React, { useState } from 'react';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './LogIn.css';

const LogIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
  
    const navigate = useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault();
  
      try {
        // Sending a POST request to the server with username and password
        const res = await axios.post('http://localhost:5001/api/auth/login', {
          username,
          password,
        });
        
        setSuccessMessage('Logged in successfully!');
        navigate('/FlightsLogTable');
        
        // Store the token in localStorage or cookies for future requests
        localStorage.setItem('auth-token', res.data.token);
        
      } catch (error) {
        // Handle error when login fails
        setErrorMessage('Login failed. Invalid credentials.');
      }
    };

    return (
        <div className='form'>
            <h1>Log In 🔑</h1>
            <form onSubmit={handleLogin} className='inputs'>
                <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} className='loginUserName' required />
                <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='logInPassword' required />
                <button className='logInSubmit' type='Submit'>Log In</button>
                <span><Link to="/Register">Register</Link></span>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    );
};

export default LogIn;