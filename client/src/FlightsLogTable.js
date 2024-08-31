import React, { useState } from 'react';
import axios from 'axios';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const FlightsLogTable = ({ visas, countriesVisas, onAddSuccess, onDeleteSuccess }) => {
  const [countryVisaId, setCountryVisaId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const handleAddRow = async () => {
    try {
      await axios.post('http://localhost:5001/flights_log', {
        country_visa_id: countryVisaId,
        start_date: startDate,
        end_date: endDate,
      });
      onAddSuccess();  // Fetch data again after adding a row
    } catch (error) {
      console.error('Error adding row:', error);
    }
  };

  const handleDeleteRow = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/flights_log/${id}`);
      onDeleteSuccess();  // Fetch data again after deletion
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  };

  if (!Array.isArray(visas)) {
    return <div>Error: Visas data is not an array.</div>;
  }

  return (
    <div>
      <div className='FlightsLogTableBar'>
        <select 
          className='addRowInputs'
          value={countryVisaId} 
          onChange={(e) => setCountryVisaId(e.target.value)}
        >
          <option value="">Select Country</option>
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