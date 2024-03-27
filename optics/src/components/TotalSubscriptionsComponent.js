import React from 'react';
import AzureBox from '../images/Azure box.png';
import AWSBox from '../images/AWS box.png';
import '../css/TotalSubscriptionsComponent.scss';

const TotalSubscriptionsComponent = () => {
  return (
    <div className="total-subscriptions-container">
      {/* Top Part */}
      <div className="top-part">
        <div>
          <strong >Total Subscriptions/Accounts</strong>
        </div>
      </div>

      {/* Bottom Part */}
      <div className="bottom-part">
        <div className="subscription">
          <div>
            <span className="icon" style={{ marginRight: '5px' }}><img src={AzureBox} alt="AzureLogo" style={{height: '36px'}}/></span>
            <span className="number">10</span>
          </div>
          <div className="subscription-text">Azure Subscriptions</div>
        </div>
        <div className="subscription" style={{marginRight:'25px'}}>
          <div>
            <span className="icon" role="img" aria-label="icon" style={{ marginRight: '5px' }}><img src={AWSBox} alt="AWSLogo" /></span>
            <span className="number">5</span>
          </div>
          <div className="subscription-text">AWS Accounts</div>
        </div>
      </div>
    </div>
  );
};

export default TotalSubscriptionsComponent;
