import React, { useEffect, useState } from 'react';
import AzureBox from '../images/Azure box.png';
import AWSBox from '../images/AWS box.png';
import '../css/TotalSubscriptionsComponent.scss';
import api from '../api.js';

const TotalSubscriptionsComponent = () => {

  const [azureCount, setAzureCount] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Azure subscription count
        const azureSubscriptionData = await api.getTotalSubscription();
        // Assuming the API returns an array with a single object containing the count
        const azureCountFromAPI = azureSubscriptionData[0]?.Subscription;

        // Set Azure count
        setAzureCount(azureCountFromAPI);
      } catch (error) {
        // Handle error
      }
    };
    fetchData();
  }, []);

  // Hardcoded AWS count
  const awsCount = 2;

  return (
    <div className="total-subscriptions-container">
      {/* Top Part */}
      <div className="top-part" style={{paddingBottom:'9px'}}>
        <div>
          <strong>Total Subscriptions/Accounts</strong>
        </div>
      </div>

      {/* Bottom Part */}
      <div className="bottom-part">
        <div className="subscription">
          <div>
            <span className="icon" style={{ marginRight: '5px' }}><img src={AzureBox} alt="AzureLogo" style={{height: '36px'}}/></span>
            <span className="number">{azureCount}</span>
          </div>
          <div className="subscription-text">Azure Subscriptions</div>
        </div>
        {/*<div className="subscription" style={{marginRight:'25px'}}>
          <div>
            <span className="icon" role="img" aria-label="icon" style={{ marginRight: '5px' }}><img src={AWSBox} alt="AWSLogo" /></span>
            <span className="number">{awsCount}</span>
          </div>
          <div className="subscription-text">AWS Accounts</div>
        </div>*/}
      </div>
    </div>
  );
};

export default TotalSubscriptionsComponent;
