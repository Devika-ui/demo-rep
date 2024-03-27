import React, { useState, useEffect } from 'react';
import { Select, MenuItem } from '@material-ui/core';

const DateRangeDropdown = () => {
  const [selectedRange, setSelectedRange] = useState('last7days'); // Set initial state to 'last7days'

  const handleRangeChange = (event) => {
    setSelectedRange(event.target.value);
  };

  return (
    <Select
      value={selectedRange}
      onChange={handleRangeChange}
      style={{ borderRadius: '10px', border: '1px solid lightblue', marginRight: '10px', width: '130px' }}
    >
      <MenuItem value="last7days">Last 7 days</MenuItem>
      <MenuItem value="lastMonth">Last Month</MenuItem>
      <MenuItem value="lastYear">Last Year</MenuItem>
      <MenuItem value="customDateRange">Custom Date Range</MenuItem>
    </Select>
  );
};

export default DateRangeDropdown;
