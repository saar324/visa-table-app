import React, { useState, useEffect } from 'react';
import './Prediction.css';
import axios from 'axios';

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



  //sum days in the last 180 days

  // Calculate today minus 180 days
const today = new Date();
const todayMinus180 = new Date(today);
todayMinus180.setDate(today.getDate() - 180);

// Filter logs where the end date is within the last 180 days
const filteredLogs = visas.filter(log => {
  const endDate = new Date(log.end_date);
  return endDate >= todayMinus180;
});

// Adjust start dates and calculate duration
const adjustedLogs = filteredLogs.map(log => {
  const startDate = new Date(log.start_date);
  const adjustedStart = startDate < todayMinus180 ? todayMinus180 : startDate;

  // Calculate the valid days within the 180-day window
  const endDate = new Date(log.end_date);
  const duration = Math.floor((endDate - adjustedStart) / (1000 * 60 * 60 * 24) + 1);

  return { ...log, validDays: duration > 0 ? duration : 0 };
});

// Sum valid days across all logs
const totalValidDays = adjustedLogs.reduce((sum, log) => sum + log.validDays, 0);

console.log("Total valid days within 180 days:", totalValidDays);



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