import React, { useState } from 'react';

const TableEdit = ({ onAddSuccess }) => {
  const [removeByIdValue, setRemoveByIdValue] = useState('');
  const [valueAdd, setValueAdd] = useState({
    country: '',
    visa: '',
    startDate: '',
    endDate: '',
  });

  // Handle input changes for adding a row
  const handleAddInputChange = (event) => {
    const { name, value } = event.target;
    setValueAdd((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle click to add a row
  const handleAddClick = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/visas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(valueAdd)
      });
      if (response.ok) {
        console.log('Visa added successfully');
        onAddSuccess();  // Trigger data refresh
      } else {
        console.error('Failed to add visa');
        alert('Error adding visa');
      }
    } catch (err) {
      console.error(err);
      alert('Error adding visa');
    }
  };

  // Handle input changes for removing a row by ID
  const handleRemoveByIdChange = (event) => {
    setRemoveByIdValue(event.target.value);
  };

  // Handle click to remove a row
  const handleRemoveClick = async () => {
    if (!removeByIdValue) {
      alert('Please enter a valid ID');
      return;
    }
  
    const deleteUrl = `http://localhost:5001/visas/${removeByIdValue}`;
    console.log('Attempting to delete row with URL:', deleteUrl);  // Log the URL
  
    try {
      const response = await fetch(deleteUrl, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log(`Row with ID ${removeByIdValue} has been deleted.`);
        setRemoveByIdValue('');
        onAddSuccess();  // Trigger data refresh after deletion
      } else {
        console.error('Failed to delete row');
        setRemoveByIdValue('');
        alert(`Could not delete row number ${removeByIdValue}, make sure that this row exists`)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button className='tableButtons' onClick={handleAddClick}>Add row</button>
      <span> 🌍</span>
      <input
        className='addRowInputs'
        type='text'
        name='country'
        value={valueAdd.country}
        onChange={handleAddInputChange}
        placeholder='country'
      />
      <span>🛃</span>
      <input
        className='addRowInputs'
        type='text'
        name='visa'
        value={valueAdd.visa}
        onChange={handleAddInputChange}
        placeholder='visa'
      />
      <span>🛫</span>
      <input
        className='addRowInputs'
        type='date'
        name='startDate'
        value={valueAdd.startDate}
        onChange={handleAddInputChange}
        placeholder='start date'
      />
      <span>🛬</span>
      <input
        className='addRowInputs'
        type='date'
        name='endDate'
        value={valueAdd.endDate}
        onChange={handleAddInputChange}
        placeholder='end date'
      />

      <br/><br/>

      <button className='tableButtons' onClick={handleRemoveClick}>Remove row</button>
      <input
        type='number'
        value={removeByIdValue}
        onChange={handleRemoveByIdChange}
        placeholder="Enter id of row"
      />
    </div>
  );
};

export default TableEdit;