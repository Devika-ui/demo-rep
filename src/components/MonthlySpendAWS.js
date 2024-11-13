import React, { useEffect, useState } from 'react';
import { Tooltip } from '@mui/material';
import '../css/MonthlySpendComponent.scss';
import iIcon from '../images/Iicon.png';
import upArrow from '../images/Up Arrow.png';
import api from '../api.js';

const MonthlySpendAWSComponent = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [monthlyActualChange, setMonthlyActualChange] = useState('1');
  const [previousMonthlyActualChange, setPreviousMonthlyActualChange]  = useState(null);
  const [percentChange, setPercentChange] = useState([1]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const subscriptionsData = await api.getMonthlyActualSpend();
//         setSubscriptions(subscriptionsData);
//         if (subscriptionsData.length > 0) {
//           setMonthlyActualChange(subscriptionsData[0].Monthly_Actual_Spend);
//           setPreviousMonthlyActualChange(subscriptionsData[0].Previous_Month_Actual_Spend);
//           if (subscriptionsData[0].Previous_Month_Actual_Spend !== 0) {
//             setPercentChange(((subscriptionsData[0].Monthly_Actual_Spend - subscriptionsData[0].Previous_Month_Actual_Spend) / subscriptionsData[0].Previous_Month_Actual_Spend) * 100);
//           } else {
//             setPercentChange(null);
//           }
//         }
//       } catch (error) {
//         // Handle error
//       }
//     };
//     fetchData();
//   }, []);

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
          {monthlyActualChange !== null ? (
            <strong>112</strong>
          ) : (
            <strong>Loading...</strong>
          )}
        </div>
        <div className="right">
          <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
            <span className="icon"><img src={upArrow} alt="AzureLogo" /></span>
            {percentChange !== null ? (
              <strong>{13}%</strong>
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

export default MonthlySpendAWSComponent;