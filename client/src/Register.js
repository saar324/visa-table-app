import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
const [formData, setFormData] = useState({
    name:'',
    userName:'',
    email:'',
    password:''
});

const navigate = useNavigate();

const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        // Handle successful registration (e.g., redirect to login)
        console.log('User registered successfully');
        navigate('/LogIn');
      } else {
        // Handle registration failure
        console.log(data.message);
      }
    } catch (error) {
      console.error('Error during registration', error);
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
      </div>
    </div>
  );
}


export default Register;
