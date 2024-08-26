import React from 'react';


const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

const FlightsLogTable = ({ visas }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>row</th>
          <th>id</th>
          <th>country</th>
          <th>visa</th>
          <th>start date</th>
          <th>end date</th>
          <th>duration</th>
        </tr>
      </thead>
      <tbody>
        {visas.map((visa, index) => (
          <tr key={visa.id}>
            <td>{index + 1}</td>
            <td>{visa.id}</td>
            <td>{visa.country}</td>
            <td>{visa.visa}</td>
            <td>{formatDate(visa["start date"])}</td>
            <td>{formatDate(visa["end date"])}</td>
            <td>{visa.duration}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FlightsLogTable;