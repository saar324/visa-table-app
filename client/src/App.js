import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navigation from './nav.js';
import FlightsLogTable from './FlightsLogTable.js';
import Prediction from './Prediction.js';
import LogIn from './LogIn.js';
import Register from './Register.js';
import WelcomePage from './WelcomePage.js';
import Footer from './Footer.js';

function App() {
  const location = useLocation();

  return (
    <div id="wrapper">
      {/* Navigation should appear on all pages except: */}
      {location.pathname !== '/WelcomePage' && location.pathname !== '/LogIn' && location.pathname !== '/' && location.pathname !== '/Register' && <Navigation />}
      <main>
        <Routes>
          <Route path="/FlightsLogTable" element={<FlightsLogTable />} />
          <Route path="/Prediction" element={<Prediction />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/WelcomePage" element={<WelcomePage />} />
          <Route path="/" element={<WelcomePage />} />
        </Routes>
      </main>
      <Footer />  {/* Footer appears on all pages */}
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