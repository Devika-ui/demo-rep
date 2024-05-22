import React from 'react';
import AzureBox from '../images/Azure box.png';
import AWSBox from '../images/AWS box.png';
import FilterIcon from '../images/filter.png'; // Check the path to ensure it's correct
import LIcon from '../images/Iicon.png'; // Check the path to ensure it's correct
import '../css/Subheader.scss';
import Filter from './Filter.js';

const SubHeader = ({ title }) => {
  return (
    <div className='Subheader-Container'>
      <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white' }}>
        {/* Overview with LIcon */}
        <div style={{ display: 'flex', alignItems: 'center', paddingRight: '20px', marginTop: '5px' }}>
          <div style={{ paddingLeft: '20px', fontSize: '20px', color: '#63666A', fontWeight: 'bold' }}>
          { title }
          </div>
          <img src={LIcon} alt="LIcon" style={{ width: '20px', height: '20px', marginLeft: '5px' }} />
        </div>
     
        {/* AWS Box */}
        <div className='AWSBox' style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
          <img src={AWSBox} alt="AWS" style={{ width: '30px', height: '34px', marginRight: '5px' }} />
          <div style={{ fontWeight: 'bold', fontSize: '18px', paddingRight: '5px', marginTop: '5px' }}>AWS</div>
          <img src={FilterIcon} alt="Filter" style={{ width: '20px', height: '20px', marginRight: '5px', marginTop: '5px' }} />
          <Filter />
        </div>
     
        {/* Azure Box */}
        <div className='AzureBox' style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
          <img src={AzureBox} alt="Azure" style={{ width: '30px', height: '34px', marginRight: '5px' }} />
          <div style={{ fontWeight: 'bold', fontSize: '18px', paddingRight: '5px', marginTop: '5px' }}>Azure</div>
          <img src={FilterIcon} alt="Filter" style={{ width: '20px', height: '20px', marginRight: '5px', marginTop: '5px' }} />
          <Filter />
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
