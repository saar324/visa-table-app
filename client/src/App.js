import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navigation from './nav.js';
import FlightsLogTable from './FlightsLogTable.js';
import Prediction from './Prediction.js';
import LogIn from './LogIn.js';
import Register from './Register';
import WelcomePage from './WelcomePage';

function App() {
  const location = useLocation(); // Ensure this is inside the Router context

  return (
    <div>
      {/* Conditional rendering of Navigation */}
      {location.pathname !== '/WelcomePage' && location.pathname !== '/LogIn' && location.pathname !== '/' && location.pathname !== '/Register' && <Navigation />}
      <Routes>
        <Route path="/FlightsLogTable" element={<FlightsLogTable />} />
        <Route path="/Prediction" element={<Prediction />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/WelcomePage" element={<WelcomePage />} />
        <Route path="/" element={<WelcomePage />} />
      </Routes>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}