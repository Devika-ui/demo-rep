import React from 'react';
import PropTypes from 'prop-types';
import AzureBox from '../images/Azure box.png';
import AWSBox from '../images/AWS box.png';
import FilterIcon from '../images/filter.png';
import LIcon from '../images/Iicon.png';
import '../css/Subheader.scss';
import Filter from './Filter.js';
import { Tooltip } from '@mui/material';

const SubHeader = ({ title, additionalFilters }) => {
  return (
    <div className='Subheader-Container'>
      <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', paddingRight: '20px', marginTop: '5px' }}>
          <div style={{ paddingLeft: '20px', fontSize: '20px', color: '#63666A', fontWeight: 'bold' }}>
            {title}
          </div>
          <Tooltip title={title}>
            <img src={LIcon} alt="LIcon" style={{ width: '20px', height: '17px', marginLeft: '5px', cursor: 'pointer', marginTop: '2px' }} />
          </Tooltip>
        </div>
        <div className='AzureBox' style={{ display: 'flex', alignItems: 'center', marginLeft: '20px', marginRight: '-150px' }}>
          <img src={AzureBox} alt="Azure" style={{ width: '30px', height: '34px', marginRight: '5px' }} />
          <div style={{ fontWeight: 'bold', fontSize: '18px', paddingRight: '5px', marginTop: '5px' }}>Azure</div>
          <img src={FilterIcon} alt="Filter" style={{ width: '20px', height: '20px', marginRight: '5px', marginTop: '5px' }} />
          <Filter additionalFilters={additionalFilters} />
        </div>
        <div className='AWSBox' style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
          <img src={AWSBox} alt="AWS" style={{ width: '30px', height: '34px', marginRight: '5px' }} />
          <div style={{ fontWeight: 'bold', fontSize: '18px', paddingRight: '5px', marginTop: '5px' }}>AWS</div>
          <img src={FilterIcon} alt="Filter" style={{ width: '20px', height: '20px', marginRight: '5px', marginTop: '5px' }} />
          <Filter additionalFilters={additionalFilters} />
        </div>
      </div>
    </div>
  );
};

SubHeader.propTypes = {
  title: PropTypes.node.isRequired,
  additionalFilters: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })).isRequired,
  })),
};

SubHeader.defaultProps = {
  additionalFilters: [], // Provide a default empty array
};

export default SubHeader;
