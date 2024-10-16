import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name:'',
    userName:'',
    email:'',
    password:''
  });

  const [errorMessage, setErrorMessage] = useState('');


  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      // Parse the response data
      const data = await response.json();
  
      // Check if response was successful
      if (response.ok) {  // 'response.ok' checks if status is in the 200-299 range
        console.log('User registered successfully');
        navigate('/LogIn');  // Navigate to the login page
      } else {
        console.log(data.message);  // Handle registration failure
        setErrorMessage(`Error to register - ${data.message}`)
      }
    } catch (error) {
      console.error('Error during registration', error);
      setErrorMessage('Email or username already taken. Please choose another')
    }
  };

  return (
    <div className='registerPage'>
      <h1>Register 📝</h1>
      <div className='registerInputs'>
        <input 
          type='text' 
          className='inputField' 
          placeholder='User Name' 
          name="userName"
          value={formData.userName} 
          onChange={handleChange} 
        />
        <input 
          type='text' 
          className='inputField' 
          placeholder='Name' 
          name="name"
          value={formData.name} 
          onChange={handleChange} 
        />
        <input 
          type='email' 
          className='inputField' 
          placeholder='Email' 
          name="email"
          value={formData.email} 
          onChange={handleChange} 
        />
        <input 
          type='password' 
          className='inputField' 
          placeholder='Password' 
          name="password"
          value={formData.password} 
          onChange={handleChange} 
        />
        <button className='SubmitRegister' onClick={handleSubmit}>
          Register
        </button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    </div>
  );
}

export default Register;