import React from 'react';
import './Register.css';
import { Navigate, useNavigate } from 'react-router-dom';

const Register = () =>{
    const navigate = useNavigate();
    
    const navRegister = () => {
        navigate('/Login')
    }

    return(
        <div className='registerPage'>
            <h1>Register 📝</h1>
            <div className='registerInputs'>
                <input type='text' className='registerUserName' placeholder='User Name'></input>
                <input type='text' className='registerName' placeholder='Name'></input>
                <input type='password' className='registerPassword' placeholder='Password'></input>
                <input type='password' className='registerPasswordConfirmation' placeholder='Password Confirmation'></input>
                <button className='SubmitRegister' onClick={navRegister}>Register</button>
            </div>
        </div>
)
}


export default Register;
