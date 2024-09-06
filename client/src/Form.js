import React, { useState } from 'react';
import './form.css';

const Form = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [emailFolded, setEmailFolded] = useState(false);
  const [passwordFolded, setPasswordFolded] = useState(true);
  const [repeatPasswordFolded, setRepeatPasswordFolded] = useState(true);
  const [accountCreated, setAccountCreated] = useState(false);

  const handleEmailSubmit = () => {
    setEmailFolded(true);
    setPasswordFolded(false);
  };

  const handlePasswordSubmit = () => {
    setPasswordFolded(true);
    setRepeatPasswordFolded(false);
  };

  const handleRepeatPasswordSubmit = () => {
    setRepeatPasswordFolded(true);
    setAccountCreated(true);
  };

  return (
    <div className="back">
      <div className="registration-form">
        <header>
          <h1>Sign Up</h1>
          <p>Fill in all the information</p>
        </header>
        <form>
          <div className={`input-section email-section ${emailFolded ? 'folded' : ''}`}>
            <input
              type="email"
              placeholder="ENTER YOUR E-MAIL HERE"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="email"
              autoComplete="off"
            />
            <div className="animated-button" onClick={handleEmailSubmit}>
              <span className="icon-paper-plane">
                <i className="fa fa-envelope-o" />
              </span>
              <span className="next-button email">
                <i className="fa fa-arrow-up" />
              </span>
            </div>
          </div>

          <div className={`input-section password-section ${passwordFolded ? 'folded' : ''}`}>
            <input
              type="password"
              placeholder="ENTER YOUR PASSWORD HERE"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="password"
            />
            <div className="animated-button" onClick={handlePasswordSubmit}>
              <span className="icon-lock">
                <i className="fa fa-lock" />
              </span>
              <span className="next-button password">
                <i className="fa fa-arrow-up" />
              </span>
            </div>
          </div>

          <div className={`input-section repeat-password-section ${repeatPasswordFolded ? 'folded' : ''}`}>
            <input
              type="password"
              placeholder="REPEAT YOUR PASSWORD HERE"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className="repeat-password"
            />
            <div className="animated-button" onClick={handleRepeatPasswordSubmit}>
              <span className="icon-repeat-lock">
                <i className="fa fa-lock" />
              </span>
              <span className="next-button repeat-password">
                <i className="fa fa-paper-plane" />
              </span>
            </div>
          </div>

          {accountCreated && (
            <div className="success">
              <p>ACCOUNT CREATED</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Form;