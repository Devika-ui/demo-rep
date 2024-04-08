import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AzureBoxLogo from '../images/AWS box.png'; 
import LogoutLogo from '../images/logout.png';
import SettingsLogo from '../images/settings.png';
import FaqLogo from '../images/quest.jpg';
import ContactLogo from '../images/contact.svg';
import MonitoringLogo from '../images/monitoring.png';
import RecommendationsLogo from '../images/Recommendations.png';
import CommitmentLogo from '../images/commitments.svg';
import CostLogo from '../images/cost.png';
import OverviewLogo from '../images/overview.png';
import FavLogo from '../images/fav.png';

const NavigationBar = () => {
  const [isNavOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };

  const menuItems = [
    { label: 'Overview', path: '/overview', icon: OverviewLogo },
    { label: 'Favourites', path: '/favourites', icon: FavLogo },
    { label: 'Cost & Usage', path: '/cost-usage', icon: CostLogo },
    { label: 'Commitments', path: '/commitments', icon: CommitmentLogo },
    { label: 'Recommendations', path: '/recommendations', icon: RecommendationsLogo },
    { label: 'Monitoring', path: '/monitoring', icon: MonitoringLogo },
    { label: 'FAQs', path: '/faqs', icon: FaqLogo },
    { label: 'Contact Us', path: '/contact-us', icon: ContactLogo },
    { label: 'Settings', path: '/settings', icon: SettingsLogo },
    { label: 'Logout', path: '/logout', icon: LogoutLogo },
  ];

  return (
    <nav
      style={{
        backgroundColor: isNavOpen ? '#5f249f' : '#5f249f',
        color: '#fff',
        padding: '15px',
        position: 'fixed',
        top: '60px', 
        left: '0',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: isNavOpen ? 'flex-start' : 'center',
        width: isNavOpen ? '175px' : '35px',
        transition: 'width 0.3s ease-in-out, background-color 0.3s ease',
        zIndex: 9999,
      }}
    >
      <div
        style={{
          cursor: 'pointer',
          fontSize: '20px',
          marginBottom: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onClick={toggleNav}
      >
        ☰
      </div>
      <div style={{ display: isNavOpen ? 'flex' : 'none', flexDirection: 'column' }}>
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            style={{ color: '#fff', textDecoration: 'none', margin: '10px 0', display: 'flex', alignItems: 'center' }}
          >
            <img src={item.icon} alt={item.label} style={{ width: '20px', marginRight: '10px' }} />
            {isNavOpen && item.label}
          </Link>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px', visibility: isNavOpen ? 'hidden' : 'visible' }}>
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            style={{ color: '#fff', textDecoration: 'none', margin: '10px 0', display: 'flex', alignItems: 'center' }}
          >
            <img src={item.icon} alt={item.label} style={{ width: '20px', marginRight: '10px' }} />
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavigationBar;
