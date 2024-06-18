import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MultiSelect } from 'react-multi-select-component';
import Modal from 'react-modal';
import '../css/Filter.scss';

const Filter = ({ additionalFilters = [] }) => {
  console.log('Additional Filters:', additionalFilters); // Ensure this logs correctly
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    accounts: [],
    businessUnits: [],
    locations: [],
    applications: []
  });

  const toggleFiltersVisibility = () => {
    setIsFiltersVisible(!isFiltersVisible);
  };

  const customStyles = {
    content: {
      top: '70px',
      left: '50%',
      transform: 'translate(-50%, 0)', // Center horizontally
      width: '100%',
      maxWidth: '800px',
      maxHeight: 'calc(100% - 150px)',
      overflow: 'auto',
      padding: '20px',
      margin: '0',
      zIndex: '1050' // Increased z-index to ensure it is above other elements
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: '1040' // Increased z-index to ensure it is above other elements
    },
  };

  const handleFilterChange = (filterType, values) => {
    setSelectedFilters({ ...selectedFilters, [filterType]: values });
  };

  const handleApplyFilters = () => {
    console.log('Selected filters:', selectedFilters);
    toggleFiltersVisibility();
    // Apply filter logic here
  };

  const handleResetFilters = () => {
    setSelectedFilters({
      accounts: [],
      businessUnits: [],
      locations: [],
      applications: []
    });
  };

  return (
    <div className='Filter-Container'>
      <span onClick={toggleFiltersVisibility} className='Filter-Text'>Filters</span>
      <Modal
        isOpen={isFiltersVisible}
        onRequestClose={toggleFiltersVisibility}
        style={customStyles}
        contentLabel='Filter Dialog'
      >
        <div className="filter-options-container">
          {/* Account dropdown */}
          <div className="filter-option">
            <label>Account(s)</label>
            <MultiSelect
              options={[
                { value: 'Account 1', label: 'Account 1' },
                { value: 'Account 2', label: 'Account 2' },
                { value: 'Account 3', label: 'Account 3' }
              ]}
              onChange={(values) => handleFilterChange('accounts', values)}
              value={selectedFilters.accounts}
            />
          </div>

          {/* Business Unit dropdown */}
          <div className="filter-option">
            <label>Business Unit(s)</label>
            <MultiSelect
              options={[
                { value: 'BusinessUnit 1', label: 'BusinessUnit 1' },
                { value: 'BusinessUnit 2', label: 'BusinessUnit 2' },
                { value: 'BusinessUnit 3', label: 'BusinessUnit 3' }
              ]}
              onChange={(values) => handleFilterChange('businessUnits', values)}
              value={selectedFilters.businessUnits}
            />
          </div>

          {/* Location dropdown */}
          <div className="filter-option">
            <label>Location(s)</label>
            <MultiSelect
              options={[
                { value: 'Location 1', label: 'Location 1' },
                { value: 'Location 2', label: 'Location 2' },
                { value: 'Location 3', label: 'Location 3' }
              ]}
              onChange={(values) => handleFilterChange('locations', values)}
              value={selectedFilters.locations}
            />
          </div>

          {/* Application Dropdown (on a new line after Location dropdown) */}
          <div className="filter-option">
            <label>Application(s)</label>
            <MultiSelect
              options={[
                { value: 'Application 1', label: 'Application 1' },
                { value: 'Application 2', label: 'Application 2' },
                { value: 'Application 3', label: 'Application 3' }
              ]}
              onChange={(values) => handleFilterChange('applications', values)}
              value={selectedFilters.applications}
            />
          </div>

          {/* Additional filters from props */}
          {additionalFilters?.map((filter, index) => (
            <div key={index} className="filter-option">
              <label>{filter.label}</label>
              <MultiSelect
                options={filter.options || []}
                onChange={(values) => handleFilterChange(filter.name, values)}
                value={selectedFilters[filter.name] || []}
              />
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="filter-buttons" style={{ textAlign: 'right', marginTop: '20px' }}>
          <button onClick={handleApplyFilters} style={{ backgroundColor: '#5F249F', color: '#fff', marginRight: '10px', padding: '10px 20px', fontSize: '14px', borderRadius: '17px', minWidth: '70px' }}>Apply</button>
          <button onClick={handleResetFilters} style={{ padding: '10px 20px', fontSize: '14px', borderRadius: '17px', minWidth: '70px' }}>Reset Filters</button>
        </div>
      </Modal>
    </div>
  );
};

Filter.propTypes = {
  additionalFilters: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })).isRequired,
  })),
};

Filter.defaultProps = {
  additionalFilters: [], // Provide a default empty array
};

export default Filter;
