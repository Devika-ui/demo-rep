import React, { useState } from 'react';

const CustomFilter = ({ onFilterChange }) => {
  const [filterValue, setFilterValue] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setFilterValue(value);
    onFilterChange(value);
  };

  return (
    <div>
      <h2>Custom Filter</h2>
      <input
        type="text"
        value={filterValue}
        onChange={handleChange}
        placeholder="Enter Filter Value"
      />
    </div>
  );
};

export default CustomFilter;