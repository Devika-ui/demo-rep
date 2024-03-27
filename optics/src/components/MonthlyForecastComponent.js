import React, { useState } from 'react';
import '../css/MonthlyForecastComponent.scss';
import iIcon from '../images/Iicon.png';
import upArrow from '../images/Up Arrow.png';

const MonthlyForecastComponent = () => {
  // State for editable values
  const [actualSpend, setActualSpend] = useState("$489.02");
  const [percentage, setPercentage] = useState(3);

  return (
    <div className="monthly-forecast-container">
      {/* Top Part */}
      <div className="top-part">
        <div className="left">
          <strong style={{fontFamily:'sans-serif'}}>Monthly Forecast</strong>
        </div>
        <div className="right">
          <span role="img" aria-label="info-icon"><img style={{height:'19px', width:'21px'}} src={iIcon} alt="I-icon" /></span>
        </div>
      </div>

      {/* Bottom Part */}
      <div className="bottom-part">
        <div className="left">
          <strong>{actualSpend}</strong>
        </div>
        <div className="right">
          <div>
          <span className="icon"><img src={upArrow} alt="AzureLogo" /></span>
            <strong>{percentage}%</strong>
          </div>
          <div>Over last month</div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyForecastComponent;
