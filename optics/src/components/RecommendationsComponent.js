import React, { useState } from 'react';
import '../css/RecommendationsComponent.scss';
import { Select, MenuItem, FormControl, Typography } from '@mui/material';

const RecommendationsComponent = () => {
  const [topRecommendations, setTopRecommendations] = useState([
    'Recommendation 1',
    'Recommendation 2',
    'Recommendation 3',
  ]);

  const [selectedOption, setSelectedOption] = useState("Select an option");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="recommendations-container">
      <div className="top-part">
        <h2 style={{ color: '#5f249f' }}>Top 3 Recommendations</h2>
      </div>
      <div className="divider"></div>
      <div className="subheading">
        Show Recommendations by :
        <br />
        {/* <select id="recommendationType">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select> */}
        <FormControl>
          <Select 
            value={selectedOption} 
            onChange={handleOptionChange}
            style={{ height:'25px', minWidth: '150px', backgroundColor: 'rgb(95, 36, 159,0.9)' }} 
          >
            <MenuItem value="Select an option">Select an option</MenuItem>
            <MenuItem value="AWS">AWS</MenuItem>
            <MenuItem value="Azure">Azure</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="tile">
        <div>
          <div>Unattached</div>
          <div>Managed disks</div>
        </div>
        <div className="content">
          <div className="price">$500.25</div>
          <div className="savings">Savings Potential</div>
        </div>
      </div>
      <div className="tile">
        <div>
          <div>Unattached</div>
          <div>Managed disks</div>
        </div>
        <div className="content">
          <div className="price">$500.25</div>
          <div className="savings">Savings Potential</div>
        </div>
      </div>
      <div className="tile">
        <div>
          <div>Unattached</div>
          <div>Managed disks</div>
        </div>
        <div className="content">
          <div className="price">$500.25</div>
          <div className="savings">Savings Potential</div>
        </div>
      </div>
      <div>
        <div style={{ display: 'inline-block', color: '#5f249f' }}>Total Savings Potential</div>
        <div style={{ display: 'inline-block', float: 'right' }} className="price">$1380.35</div>
      </div>
    </div>
  );
};

export default RecommendationsComponent;
