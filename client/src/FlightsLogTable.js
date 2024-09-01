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

  const handleAddRow = async () => {
    try {
      await axios.post('http://localhost:5001/flights_log', {
        country_visa_id: countryVisaId,
        start_date: startDate,
        end_date: endDate,
      });
      fetchFlightsLog(); // Refresh data after adding a row
    } catch (error) {
      console.error('Error adding row:', error);
    }
  };

  const handleDeleteRow = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/flights_log/${id}`);
      fetchFlightsLog(); // Refresh data after deletion
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <div className='FlightsLogTableBar'>
        <select 
          className='FlightsLogTableSelectInput'
          value={countryVisaId} 
          onChange={(e) => setCountryVisaId(e.target.value)}
        >
          <option className='addRowInputs' value="">Select Country</option>
          {countriesVisas.map(item => (
            <option key={item.id} value={item.id}>
              {item.country_name} ({item.visa_name})
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