import React, { useEffect, useState } from 'react';
import '../css/RecommendationsComponent.scss';
import { Select, MenuItem, FormControl, Typography } from '@mui/material';
import api from '../api.js';

const RecommendationsComponent = () => {
  const [recommendation1, setRecommendation1] = useState([]);
  const [recommendation2, setRecommendation2] = useState([]);
  const [recommendation3, setRecommendation3] = useState([]);
  const [savingsPotential1, setsavingsPotential1] = useState([]);
  const [savingsPotential2, setsavingsPotential2] = useState([]);
  const [savingsPotential3, setsavingsPotential3] = useState([]);


  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Select an option");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subscriptionsData = await api.getRecommendations();
        setSubscriptions(subscriptionsData);
        setRecommendation1(subscriptionsData[0].recommendation);
        setRecommendation2(subscriptionsData[1].recommendation);
        setRecommendation3(subscriptionsData[2].recommendation);
        setsavingsPotential1(subscriptionsData[0].savings_potential);
        setsavingsPotential2(subscriptionsData[1].savings_potential);
        setsavingsPotential3(subscriptionsData[2].savings_potential);
      } catch (error) {
        // Handle error
      }
    };
    fetchData();
  }, []);


  return (
    <div className="recommendations-container">
      <div className="top-part">
        <h2 style={{ color: '#5f249f', fontFamily:'sans-serif', fontSize:'16px'}}>Top 3 Recommendations</h2>
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
        <FormControl style={{paddingTop: '5px'}}>
          <Select 
            value={selectedOption} 
            onChange={handleOptionChange}
            style={{ height:'25px', minWidth: '150px', backgroundColor: 'rgb(95, 36, 159,0.9)', fontSize: '14px', color: 'white' }} 
          >
            <MenuItem value="Select an option">Select an option</MenuItem>
            <MenuItem value="AWS">AWS</MenuItem>
            <MenuItem value="Azure">Azure</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="tile">
        <div>
          <div>{recommendation1}</div>
        </div>
        <div className="content">
          <div className="price">${savingsPotential1}</div>
          <div className="savings">Savings Potential</div>
        </div>
      </div>
      <div className="tile">
        <div>
          <div>{recommendation2}</div>
        </div>
        <div className="content">
          <div className="price">${savingsPotential1}</div>
          <div className="savings">Savings Potential</div>
        </div>
      </div>
      <div className="tile">
        <div>
          <div>{recommendation3}</div>
        </div>
        <div className="content">
          <div className="price">${savingsPotential3}</div>
          <div className="savings">Savings Potential</div>
        </div>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: '8px'}}>
        <div style={{ display: 'inline-block', color: '#5f249f' }}>Total Savings Potential</div>
        <div style={{ display: 'inline-block', float: 'right' }} className="price">${savingsPotential1 + savingsPotential2 + savingsPotential3}</div>
      </div>
    </div>
  );
};

export default RecommendationsComponent;