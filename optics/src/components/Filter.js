import React, { useState } from 'react';
import { MultiSelect } from 'react-multi-select-component';
import Modal from 'react-modal';
import '../css/Filter.scss';

const Filter = () => {
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
      top: '120px',
      left: '50%',
      transform: 'translate(-50%, 0)', // Center horizontally
      width: '80%',
      maxWidth: '800px',
      maxHeight: 'calc(60% - 100px)',
      overflow: 'auto',
      padding: '20px',
      margin: '0',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  };

  const handleFilterChange = (filterType, values) => {
    setSelectedFilters({ ...selectedFilters, [filterType]: values });
  };

  const handleApplyFilters = () => {
    console.log('Selected filters:', selectedFilters);
    toggleFiltersVisibility();
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
      <button onClick={toggleFiltersVisibility}>Filters</button>
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
              value={selectedFilters['accounts']}
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
              value={selectedFilters['businessUnits']}
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
              value={selectedFilters['locations']}
            />
          </div>
        </div>
        
        {/* Application dropdown in the next row */}
        <div className="filter-option" style={{width:'265px'}}>
          <label>Application(s)</label>
          <MultiSelect
            name="Appplications"
            options={[
              { value: 'Application 1', label: 'Application 1' },
              { value: 'Application 2', label: 'Application 2' },
              { value: 'Application 3', label: 'Application 3' },
            ]}
            onChange={(values) => handleFilterChange('applications', values)}
            value={selectedFilters['applications']}
          />
        </div>

        {/* Buttons */}
        <div className="filter-buttons" style={{ textAlign: 'right', marginTop: '90px' }}>
          <button onClick={handleApplyFilters} style={{ backgroundColor: '#5F249F', color: '#fff', marginRight: '10px', padding: '10px 20px', fontSize: '14px', borderRadius: '17px', minWidth: '70px' }}>Apply</button>
          <button onClick={handleResetFilters} style={{ padding: '10px 20px', fontSize: '14px', borderRadius: '17px', minWidth: '70px' }}>Reset Filters</button>
        </div>

      </Modal>
    </div>
  );
};

export default Filter;
