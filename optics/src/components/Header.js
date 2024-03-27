import React, { useState } from 'react';
import '../css/styles.scss';
import DXCLogo from '../images/DXCLogo.jpg';
import OpticLogo from '../images/OpticsFinopslogo.png';
import KraftLogo from '../images/ClientlogoKraft.png';
import ToggleSwitch from './ToggleSwitch';
import HeaderButtons from './HeaderButtons';
import CustomDatePicker from './CustomDatePicker';
import DateRangeDropdown from './DateRangeDropdown'; 

const Header = () => {
  const [isNavOpen, setNavOpen] = useState(false);

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
          
          <ul className="nav" style={{ display: 'flex', alignItems: 'center' }}>
            <li>
              <div className="site-identity" style={siteIdentityStyle}>
                <a href="#"><img src={KraftLogo} alt="Site Name" style={clientLogoStyle} /></a>
              </div>
            </li>
            <li style={lineStyle}></li>
            <li style={headerButtonsStyle}><HeaderButtons /></li>
            <li style={DateRangeDropdownStyle}><DateRangeDropdown /></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
