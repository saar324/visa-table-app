import React from 'react';
import './WelcomePage.css';
import { Navigate, useNavigate } from 'react-router-dom';


const WelcomePage = () => {
    const navigate = useNavigate();

    const goToLogIn = () => {
        navigate('./LogIn');
    };

    return(
    <div>
        <h1>WelcomePage</h1>
        <button className='newLogin' onClick={goToLogIn}>Log In</button>
    </div>
    );
};


export default WelcomePage;