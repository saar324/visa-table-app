import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Navigation from './nav.js';
import FlightsLogTable from './FlightsLogTable.js';

function App() {
  const [visas, setVisas] = useState([]);
  const [countriesVisas, setCountriesVisas] = useState([]);

  const fetchFlightsLog = async () => {
    try {
      const result = await axios.get('http://localhost:5001/flights_log');
      if (Array.isArray(result.data)) {
        const sortedData = result.data.sort((a, b) => a.id - b.id);
        setVisas(sortedData);
      } else {
        console.error("Error: flights_log data is not an array:", result.data);
      }
    } catch (error) {
      console.error("Error fetching flights_log data:", error);
    }
  };

  const fetchCountriesVisas = async () => {
    try {
      const result = await axios.get('http://localhost:5001/countries_visas');
      if (Array.isArray(result.data)) {
        setCountriesVisas(result.data);
      } else {
        console.error("Error: countries_visas data is not an array:", result.data);
      }
    } catch (error) {
      console.error("Error fetching countries_visas data:", error);
    }
  };

  useEffect(() => {
    fetchFlightsLog();
    fetchCountriesVisas();
  }, []);

  return (
    <div>
      <Navigation />
      <h1>Flights</h1>
      <FlightsLogTable 
        visas={visas} 
        countriesVisas={countriesVisas} 
        onAddSuccess={fetchFlightsLog} 
        onDeleteSuccess={fetchFlightsLog} 
      />
    </div>
  );
}

export default App;