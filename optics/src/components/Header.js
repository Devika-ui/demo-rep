import React, { useState, useEffect } from 'react';
import '../css/styles.scss';
import OpticLogo from '../images/OpticsFinopslogo.png';
import HeaderButtons from './HeaderButtons';
import DateRangeDropdown from './DateRangeDropdown';
import api from '../api.js'; // Import the API function
 
const Header = () => {
  const [isNavOpen, setNavOpen] = useState(false);
  const [clientData1200, setClientData1200] = useState(null); // State to store client data for customerId 1200
  const [clientData1700, setClientData1700] = useState(null); // State to store client data for customerId 1700
 
  const siteIdentityStyle = {
    float: 'right',
  };
 
  const clientLogoStyle = {
    width: '80px',
    height: '22px',
    marginTop:'18px',
  };
 
  const lineStyle = {
    height: '24px',
    borderRight: '1px solid lightgray',
    marginRight: '10px',
    marginTop:'20px',
  };
 
  const headerButtonsStyle = {
    marginTop: '8.2px',
  };
 
  const DateRangeDropdownStyle = {
    marginTop: '8.2px',
    marginLeft:'6px',
  };
 
  useEffect(() => {
    // Fetch client data for customerId 1200 when component mounts
    async function fetchClient1200() {
      try {
        const data = await api.getClientData(1200); // Fetch client data for customerId 1200
        setClientData1200(data);
      } catch (error) {
        console.error('Error fetching client data for customerId 1200:', error);
      }
    }
 
    // Fetch client data for customerId 1700 when component mounts
    async function fetchClient1700() {
      try {
        const data = await api.getClientData(1700); // Fetch client data for customerId 1700
        setClientData1700(data);
      } catch (error) {
        console.error('Error fetching client data for customerId 1700:', error);
      }
    }
 
    fetchClient1200();
    fetchClient1700();
 
    // Clean-up function
    return () => {
      // Any clean-up code if necessary
    };
  }, []); // Empty dependency array to run effect only once
 
  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };
 
  return (
    <header className="site-header">
      <div className="site-identity">
        <a href="#"><img src={OpticLogo} alt="Site Name" /></a>
        <h1><a href="#">Overview</a></h1>
      </div>
 
      <div>
        <nav className={`site-navigation ${isNavOpen ? 'open' : ''}`}>
          {(clientData1200 && clientData1700) && ( // Render only when both client data are available
            <ul className="nav" style={{ display: 'flex', alignItems: 'center' }}>
              <li>
                <div className="site-identity" style={siteIdentityStyle}>
                  <a href="#"><img src={clientData1200.image} alt={clientData1200.name} style={clientLogoStyle} /></a>
                </div>
              </li>
              <li>
                <div className="site-identity">
                  <a href="#"><img src={clientData1700.image} alt={clientData1700.name} style={clientLogoStyle} /></a>
                </div>
              </li>
              <li style={lineStyle}></li>
            <li style={headerButtonsStyle}><HeaderButtons /></li>
            <li style={DateRangeDropdownStyle}><DateRangeDropdown /></li>
          </ul>
          )}
        </nav>
      </div>
    </header>
  );
};
 
export default Header;