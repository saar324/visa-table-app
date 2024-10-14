import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './LogIn.css';

const LogIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    const navigate = useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault();
  
      try {
        // Sending a POST request to the server with username and password
        const res = await axios.post('http://localhost:5001/api/auth/login', {
          username,
          password,
        });

    // Store username in localStorage
    localStorage.setItem('username', username);  // Use username

    console.log('User LogIn successfully') // LogIn successfully
    navigate('/FlightsLogTable'); // navigate

    // Store the token in localStorage
    localStorage.setItem('auth-token', res.data.token);

      } catch (error) {
        // Handle error when login fails
        setErrorMessage('Check your UserName and Password.');
        console.error(error);
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
        </div>
    );
};

export default LogIn;