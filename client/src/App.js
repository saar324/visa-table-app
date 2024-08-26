import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import TableEdit from './table edit.js';
import Navigation from './nav.js';
import FlightsLogTable from './FlightsLogTable.js';

function App() {
  const [visas, setVisas] = useState([]);


  // Function to fetch the data from the server
  const fetchData = async () => {
    const result = await axios('http://localhost:5001/visas');
    const sortedData = result.data.sort((a, b) => a.id - b.id);  // Sort by id
    setVisas(sortedData);
  };

  useEffect(() => {
    fetchData();  // Fetch data when the component mounts
  }, []);

  return (
    <div>
      <Navigation/>
      <h1>Flights</h1>
      <TableEdit onAddSuccess={fetchData} />
      <FlightsLogTable visas={visas} />
    </div>
  );
}

export default App;