import React from 'react';
import axios from 'axios';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const FlightsLogTable = ({ visas, onAddSuccess }) => {
  if (!Array.isArray(visas)) {
    return <div>Error: Visas data is not an array.</div>;
  }

  const handleDeleteRow = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/flights_log/${id}`);
      onAddSuccess();  // Refresh data after deletion
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Row</th>
          <th>ID</th>
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
            <td>{visa.id}</td>
            <td>{visa.country_name}</td>
            <td>{visa.visa_name}</td>
            <td>{formatDate(visa.start_date)}</td>
            <td>{formatDate(visa.end_date)}</td>
            <td>{visa.duration}</td>
            <td>
              <button onClick={() => handleDeleteRow(visa.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FlightsLogTable;