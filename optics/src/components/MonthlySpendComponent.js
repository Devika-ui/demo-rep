import React, { useEffect, useState } from 'react';
import { Tooltip } from '@mui/material';
import '../css/MonthlySpendComponent.scss';
import iIcon from '../images/Iicon.png';
import upArrow from '../images/Up Arrow.png';
import api from '../api.js';
 
const MonthlySpendComponent = () => {
  const [totalCost, setTotalCost] = useState(null);
  const [growthPercentage, setGrowthPercentage] = useState(null);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const subscriptionsData = await api.getMonthlyActualSpend();
        if (subscriptionsData.length > 0) {
          setTotalCost(subscriptionsData[0].totalCost);
          setGrowthPercentage(subscriptionsData[0].growthPercentage);
        }
      } catch (error) {
        // Handle error
      }
    };
    fetchData();
  }, []);
 
  return (
    <div className="monthly-spend-container">
      {/* Top Part */}
      <div className="top-part">
        <div className="left">
          <strong style={{fontFamily:'sans-serif'}}>Monthly Actual Spend</strong>
        </div>
        <div className="right">
          <Tooltip title="Monthly Spend">
            <img style={{height:'16px', width:'16px'}} src={iIcon} alt="I-icon" />
          </Tooltip>
        </div>
      </div>
 
      {/* Bottom Part */}
      <div className="bottom-part">
        <div className="left">
          {totalCost !== null ? (
            <strong>${totalCost.toFixed(2)}</strong>
          ) : (
            <strong>Loading...</strong>
          )}
        </div>
        <div className="right">
          <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
            <span className="icon"><img src={upArrow} alt="AzureLogo" /></span>
            {growthPercentage !== null ? (
              <strong>{growthPercentage.toFixed(2)}%</strong>
            ) : (
              <strong>N/A</strong>
            )}
          </div>
          <div>Over last month</div>
        </div>
      </div>
    </div>
  );
};
 
export default MonthlySpendComponent;