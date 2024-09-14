import React from 'react';
import './WelcomePage.css';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
    const navigate = useNavigate();

    const goToLogIn = () => {navigate('./LogIn');};
    const goToRegister = () =>{navigate('./Register');};

    return (
        <div className='welcome-container'>
            <div className='welcome-content'>
                <h1>Welcome to 🕑 Time Limit Calculator 🧮</h1>
                <p>Predict and manage 📊 your travel days across Schengen and other countries with ease 🌍. Perfect for digital nomads! 🎒</p>
                <button className='login-btn' onClick={goToLogIn}>Log In</button>
            </div>
            
            {/* Additional info sections */}
            <div className='info-section'>
                <h2>📝 What is Time Limit Calculator?</h2>
                <p>
                    Time Limit Calculator is an intuitive tool for travelers who want to predict how many days they can stay in certain regions, like Schengen, following the 180/90 rule. This is essential for planning long-term trips, ensuring you don’t overstay.
                </p>
            </div>

            <div className='benefits-section'>
                <h2>🚀 Why Use Our Tool?</h2>
                <ul>
                    <li>🗓️ Plan your trips ahead with accurate predictions</li>
                    <li>💸 Avoid overstaying fines and penalties</li>
                    <li>🖥️ Easy to use with a simple, modern interface</li>
                    <li>🌍 Get predictions for Schengen and other countries</li>
                </ul>
            </div>

            <div className='cta-section'>
                <h2>✈️ Start Your Journey [FOR FREE 💵] Today!</h2>
                <p>Sign up ✏️ and explore how Time Limit Calculator can make your travel planning 🌍 easier than ever ✨.</p>
                <button className='cta-btn' onClick={goToRegister}>Sign Up for Free</button>
            </div>
        </div>
    );
};

export default WelcomePage;