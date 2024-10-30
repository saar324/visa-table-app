import React, { useState, useEffect } from 'react';
import './Prediction.css';
import axios from 'axios';
import sumInDays from './sumInDays.js';

const Prediction = () => {
  const [visas, setVisas] = useState([]);

  useEffect(() => {
    const fetchFlightsLog = async () => {
      try {
        // Send the value in the request as a query parameter
        const result = await axios.get('http://localhost:5001/api/flights/flights_log', {
          params: {
            username: localStorage.getItem('username'),
          }
        });
    
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

    // Call the function once on component mount
    fetchFlightsLog();

  }, []);  // The empty dependency array means it will only run once when the component mounts

  // Date format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = 
    String(date.getDate()).padStart(2, '0') + "/" +
    String(date.getMonth() + 1).padStart(2, '0') + "/" +
    date.getFullYear()

    return formattedDate;
  };


sumInDays(visas);


  return (
    <div className='FlightsLogTablePage'>
      <h1>Prediction 🧮</h1>

      <table>
        <thead>
          <tr>
            <th>Row</th>
            <th>Country</th>
            <th>Visa</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {visas.map((visa, index) => (
            <tr key={visa.id}>
              <td>{index + 1}</td>
              <td>{visa.country_name}</td>
              <td>{visa.visa_name}</td>
              <td>{formatDate(visa.start_date)}</td>
              <td>{formatDate(visa.end_date)}</td>
              <td>{visa.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Prediction;