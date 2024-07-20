import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [visas, setVisas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('/visas');
      setVisas(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Visa Table</h1>
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Visa Type</th>
            <th>Duration</th>
            <th>Requirements</th>
          </tr>
        </thead>
        <tbody>
          {visas.map((visa) => (
            <tr key={visa.id}>
              <td>{visa.country}</td>
              <td>{visa.visa_type}</td>
              <td>{visa.duration}</td>
              <td>{visa.requirements}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;