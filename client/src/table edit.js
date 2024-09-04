import React, { useState } from 'react';
import axios from 'axios';

const TableEdit = ({ countriesVisas, onAddSuccess, onDeleteSuccess }) => {
  const [countryVisaId, setCountryVisaId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [deleteRowId, setDeleteRowId] = useState('');

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

  const handleDeleteRow = async () => {
    try {
      await axios.delete(`http://localhost:5001/flights_log/${deleteRowId}`);
      onDeleteSuccess();  // Fetch data again after deleting a row
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  };

  return (
    <div>
      <select 
        value={countryVisaId} 
        onChange={(e) => setCountryVisaId(e.target.value)}
      >
        <option value="">Select Country</option>
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
  );
};

export default TableEdit;