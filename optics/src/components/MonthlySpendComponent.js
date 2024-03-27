import React, { useState } from 'react';
import '../css/MonthlySpendComponent.scss';
import iIcon from '../images/Iicon.png';
import upArrow from '../images/Up Arrow.png';

const MonthlySpendComponent = () => {
  // State for editable values
  const [actualSpend, setActualSpend] = useState("$560.02");
  const [percentage, setPercentage] = useState(5);

  return (
    <div className="monthly-spend-container">
      {/* Top Part */}
      <div className="top-part">
        <div className="left">
          <strong style={{fontFamily:'sans-serif'}}>Monthly Actual Spend</strong>
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

export default MonthlySpendComponent;
