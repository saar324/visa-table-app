import React from 'react';
import './LogIn.css';


const LogIn = () =>{
return(
<div className='form'>
    <h1>Log In 🔑</h1>
    <div className='inputs'>
        <input type='text' placeholder='User Nmae' className='loginInUserNmae'></input>
        <input type='password' placeholder='password' className='logInPassword'></input>
    </div>
</div>
);
};


export default LogIn;