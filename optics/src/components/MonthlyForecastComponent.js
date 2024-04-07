import React, { useEffect, useState } from 'react';
import { Tooltip } from '@material-ui/core';
import '../css/MonthlyForecastComponent.scss';
import iIcon from '../images/Iicon.png';
import upArrow from '../images/Up Arrow.png';
import api from '../api.js';

const MonthlyForecastComponent = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [monthlyForecast, setMonthlyForecast] = useState(null);
  const [previousMonthlyForecast, setPreviousMonthlyForecast] = useState(null);
  const [percentChange, setPercentChange] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subscriptionsData = await api.getMonthlyActualSpend();
        setSubscriptions(subscriptionsData);
        if (subscriptionsData.length > 0) {
          setMonthlyForecast(subscriptionsData[0].Monthly_Actual_Spend);
          setPreviousMonthlyForecast(subscriptionsData[0].Previous_Month_Forecast_Spend);
          if (subscriptionsData[0].Previous_Month_Forecast_Spend !== 0) {
            setPercentChange(((subscriptionsData[0].Monthly_Forecast_Spend - subscriptionsData[0].Previous_Month_Forecast_Spend) / subscriptionsData[0].Previous_Month_Forecast_Spend) * 100);
          } else {
            setPercentChange(null);
          }
        }
      } catch (error) {
        // Handle error
      }
    };
    fetchData();
  }, []);

  return (
    <div className="monthly-forecast-container">
      {/* Top Part */}
      <div className="top-part">
        <div className="left">
          <strong style={{ fontFamily: 'sans-serif' }}>Monthly Forecast</strong>
        </div>
        <div className="right">
          <Tooltip title="Monthly Forecast">
            <img style={{ height: '16px', width: '16px' }} src={iIcon} alt="I-icon" />
          </Tooltip>
        </div>
      </div>

      {/* Bottom Part */}
      <div className="bottom-part">
        <div className="left">
          {monthlyForecast !== null ? (
            <strong>${monthlyForecast}</strong>
          ) : (
            <strong>Loading...</strong>
          )}
        </div>
        <div className="right">
          <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <span className="icon"><img src={upArrow} alt="AzureLogo" /></span>
            {percentChange !== null ? (
              <strong>{percentChange.toFixed(2)}%</strong>
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

export default MonthlyForecastComponent;