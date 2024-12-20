import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FlightsLogTable.css';

const FlightsLogTable = () => {
  const [visas, setVisas] = useState([]);
  const [countriesVisas, setCountriesVisas] = useState([]);
  const [countryVisaId, setCountryVisaId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');


  const fetchFlightsLog = async () => {
    try {
      // Send the value in the request as a query parameter
      const result = await axios.get('http://localhost:5001/api/flights/flights_log', {
        params: {
          username: localStorage.getItem('username'),  // Use the correct query parameter key
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

  // Countries Combobox
  const fetchCountriesVisas = async () => {
    try {
      const result = await axios.get('http://localhost:5001/api/flights/countries_visas');
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

  const handleAddRow = async () => {
    try {
      await axios.post('http://localhost:5001/api/flights/flights_log', {
        country_visa_id: countryVisaId,
        start_date: startDate,
        end_date: endDate,
        username: localStorage.getItem('username')
      });
      setStartDate('');
      setEndDate('');
      fetchFlightsLog(); // Refresh data after adding a row
    } catch (error) {
      console.error('Error adding row:', error);
    }
  };

  const handleDeleteRow = async (id) => {
    if (window.confirm("Are you sure you want to delete this row?")) {
      try {
        await axios.delete(`http://localhost:5001/api/flights/flights_log/${id}`);
        fetchFlightsLog(); // Refresh data after deletion
      } catch (error) {
        console.error('Error deleting row:', error);
      }
    };
  }
  
  // Date format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = 
    String(date.getDate()).padStart(2, '0') + "/" +
    String(date.getMonth() + 1).padStart(2, '0') + "/" +
    date.getFullYear()

    return formattedDate;
  };

  return (
    <div className='FlightsLogTablePage'>
      <h1>Flights ✈️</h1>
      <div className='FlightsLogTableBar'>
        <select 
          className='FlightsLogTableSelectInput'
          value={countryVisaId}
          onChange={(e) => setCountryVisaId(e.target.value)}
        >
          <option className='addRowInputs' value="">Select Country</option>
          {countriesVisas.map(item => (
            <option key={item.id} value={item.id}>
              {item.country_name}
            </option>
          ))}
        </select>
        <input
          className='addRowInputs'
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          className='addRowInputs'
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button className='tableButtons' onClick={handleAddRow}>Add Row</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Row</th>
            <th>Country</th>
            <th>Visa</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Duration</th>
            <th>Actions</th>
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
              <td><button className='FlightsLogTableDeleteButton' onClick={() => handleDeleteRow(visa.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlightsLogTable;