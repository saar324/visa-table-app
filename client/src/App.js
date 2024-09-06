import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './nav.js';
import FlightsLogTable from './FlightsLogTable.js';
import Prediction from './Prediction.js';
import LogIn from './LogIn.js';
import Register from './Register';

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          {/* Define routes for each page */}
          <Route path="/FlightsLogTable" element={<FlightsLogTable />} />
          <Route path="/Prediction" element={<Prediction />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/Register" element={<Register />} />
          
          <Route path="/" element={<LogIn />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;