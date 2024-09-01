import React from 'react';
import './App.css';
import Navigation from './nav.js';
import FlightsLogTable from './FlightsLogTable.js';

function App() {
  return (
    <div>
      <Navigation />
      <h1>Flights</h1>
      <FlightsLogTable />
    </div>
  );
}

export default App;