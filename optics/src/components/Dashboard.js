import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userpool from '../userpool';
import { logout } from '../services/authenticate';
import api from '../api.js';
import Header from './Header.js';
import Subheader from './SubHeader.js'
import StackBars from './StackBars';
import MonthlySpendComponent from './MonthlySpendComponent.js';
import MonthlyForecastComponent from './MonthlyForecastComponent.js';
import TotalSubscriptionsComponent from './TotalSubscriptionsComponent.js';
import RecommendationsComponent from './RecommendationsComponent.js';
import NavigationBar from './NavigationBar.js';
import MapContainer from './MapContainer.js';
import OverallTotalRealizedSavings from './OverallTotalRealizedSavings.js';
import KPISection from './KPISection.js';
import ConsumptionHighlights from './ConsumptionHighlights.js';

const Dashboard = () => {
  const location = {
    latitude: 37.7749, // Example latitude
    longitude: -122.4194, // Example longitude
  };

  const mapContainerStyle = {
    width: '25%',
    height: '400px', // Adjust the height as needed
  };

  const additionalDivStyle = {
    width: '744px',
    height: '405px',
    backgroundColor: 'white',
    marginLeft: '35px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const additionalDivStyleKpi = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f9f9f9',
  };

  const Navigate = useNavigate();
  // const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
     const fetchData = async () => {
    //   try {
    //     const subscriptionsData = await api.getSubscriptions();
    //     setSubscriptions(subscriptionsData);
    //   } catch (error) {
    //     // Handle error
    //   }
     };

    fetchData();
    let user = userpool.getCurrentUser();
    console.log(user);
    if (!user) {
      //Navigate('/login');
    }
  }, []);

  const handleLogoout = () => {
    logout();
  };

  return (
    <div>
      <Header />
      <Subheader />
      <NavigationBar />
      <div
        className='Dashboard'
        style={{
          marginLeft: '48px',
          padding: '2px',
          display: 'flex', // Make the container a flex container
          alignItems: 'flex-start', // Align items at the start of the flex container
          flexWrap: 'wrap', // Allow wrapping of elements
        }}
      >
        {/* <OpenStreetMap location={location} containerStyle={mapContainerStyle} />  */}
        <MonthlySpendComponent />
        <MonthlyForecastComponent />
        <TotalSubscriptionsComponent style={{ flex: '1' }} />
        <div style={{ ...additionalDivStyle, marginRight: '15px' }}>
          <StackBars />
        </div>
        <RecommendationsComponent />
        <div
          style={{
            display: 'flex',
            gap: '9px',
            width: '100%',
            justifyContent: 'left',
            alignItems: 'center',
            paddingTop: '10px',
            paddingBottom: '10px',
          }}
        >
          <div
            style={{
              additionalDivStyleKpi,
              marginLeft: '32px',
            }}
          >
            <KPISection />
          </div>
          <ConsumptionHighlights />
        </div>
        <div
          style={{
            marginLeft: '33px',
            marginTop: '-20px',
            display: 'flex',
            gap: '10px',
            width: '100%',
            justifyContent: 'left',
            alignItems: 'center',
            paddingBottom: '10px',
          }}
        >
          <MapContainer />
          <OverallTotalRealizedSavings />
        </div>
        {/* <MapContainer />
          <OverallTotalRealizedSavings /> */}
        {/* <div style={{ display: 'flex', gap: '9px', width: '100%', justifyContent: 'left', alignItems: 'center', paddingTop: '10px', paddingBottom: '10px' }}>
          <div style={{ additionalDivStyleKpi, marginLeft:'32px' }}>
          <KPISection />
        </div>
        <ConsumptionHighlights />
        </div> */}

        {/* <div>
          <h2>Total Subscriptions/Accounts</h2>
          <ul>
            {subscriptions.map((subscription) => (
              <li key={subscription.id}>{subscription.displayName}</li>
            ))}
          </ul>
        </div> */}

        {/* <Button
          style={{ margin: '10px' }}
          variant='contained'
          onClick={handleLogoout}
        >
          Logout
        </Button> */}
      </div>
    </div>
  );
};

export default Dashboard;
