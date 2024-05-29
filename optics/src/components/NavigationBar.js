import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api.js'; // Update the path as needed
 
const NavigationBar = () => {
  const [isNavOpen, setNavOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState(null); // Track the index of the open submenu
 
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const items = await api.getMenuItemsByCustomerId();
        const menuData = Object.entries(items).map(([label, icon]) => ({ label, icon }));
        setMenuItems(menuData);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };
 
    fetchMenuItems();
  }, []);
 
  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };
 
  const defineSubItems = (label) => {
    switch (label) {
      // case 'Favourites':
      //   return [
      //     { label: 'Favourite Reports', path: '/favourites/subitem1' },
      //     // { label: 'SubItem2', path: '/favourites/subitem2' },
      //   ];
      case 'Cost and Usage':
        return [
          { label: 'Bill Overview', path: '/billOverview' },
          { label: 'Business Cost Split View', path: '/businessCostSplit' },
          { label: 'Inventory Cost Split View', path: '/cost-and-usage/subitem3' },
          { label: 'Infra Consumption Cost Study', path: '/cost-and-usage/subitem4' },
          { label: 'Infra Changes Audit', path: '/cost-and-usage/subitem1' },
          { label: 'Favourite Reports', path: '/cost-and-usage/subitem1' }

        ];
      case 'Committments':
        return [
          { label: 'Coverage Analysis', path: '/committments/subitem1' },
          { label: 'Usage Analysis', path: '/committments/subitem2' },
          { label: 'Favourite Reports', path: '/committments/subitem3' }
        ];
      case 'Recommendations':
        return [
          { label: 'Unattached Managed disks', path: '/recommendations/subitem1' },
          { label: 'Orphaned Screenshots', path: '/recommendations/subitem2' },
          { label: 'Orphaned disks', path: '/recommendations/subitem3' },
          { label: 'Hyper Scalar Advisor', path: '/recommendations/subitem4' },
          { label: 'VM & SQL Licenses', path: '/recommendations/subitem5' },
          { label: 'Orphaned RSV Backups', path: '/recommendations/subitem6' },
          { label: 'Favourite Reports', path: '/recommendations/subitem7' }
        ];
      case 'Monitoring':
        return [
          { label: 'Action Tracker Follow Up', path: '/monitoring/subitem1' },
          { label: 'Anamoly Detection Alerts', path: '/monitoring/subitem2' },
          { label: 'Favourite Reports', path: '/monitoring/subitem3' }
        ];
      default:
        return []; // No submenu items for other menu items
    }
  };
 
  const handleToggleSubmenu = (index) => {
    setOpenSubmenuIndex((prevIndex) => (prevIndex === index ? null : index)); // Toggle the submenu only if it's not already open
  };
 
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
        alignItems: isNavOpen ? 'flex-start' : 'start',
        width: isNavOpen ? '200px' : '35px',
        transition: 'width 0.3s ease-in-out, background-color 0.3s ease',
        zIndex: 9999
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
          <div key={index}>
            <div
              onClick={() => handleToggleSubmenu(index)}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <Link
                to={`/${item.label.toLowerCase().replace(/\s+/g, '-')}`} // Generate path based on label
                style={{ color: '#fff', textDecoration: 'none', margin: '10px 0', display: 'flex', alignItems: 'center' }}
              >
                <img src={`data:image/png;base64,${item.icon}`} alt={item.label} style={{ width: '20px', marginRight: '10px' }} />
                {isNavOpen && item.label}
              </Link>
              {!['Overview', 'Favourites','FAQs', 'Contact Us', 'Settings', 'Logout'].includes(item.label) && (
                <span style={{ marginLeft: 'auto' }}>{openSubmenuIndex === index ? '▼' : '  ▶'}</span>
              )}
            </div>
            {isNavOpen && openSubmenuIndex === index && (
              <div style={{ marginLeft: '20px' }}>
                {defineSubItems(item.label).map((subItem, subIndex) => (
                  <Link
                    key={subIndex}
                    to={subItem.path}
                    style={{ color: '#fff', textDecoration: 'none', margin: '10px 0', display: 'flex', alignItems: 'center' }}
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px', visibility: isNavOpen ? 'hidden' : 'visible' }}>
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={`/${item.label.toLowerCase().replace(/\s+/g, '-')}`} // Generate path based on label
            style={{ color: '#fff', textDecoration: 'none', margin: '10px 0', display: 'flex', alignItems: 'center' }}
          >
            <img src={`data:image/png;base64,${item.icon}`} alt={item.label} style={{ width: '20px', marginRight: '10px' }} />
          </Link>
        ))}
      </div>
    </nav>
  );
};
 
export default NavigationBar;