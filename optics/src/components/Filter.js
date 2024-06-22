import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MultiSelect } from 'react-multi-select-component';
import Modal from 'react-modal';
import api from '../api';
import '../css/Filter.scss';

const Filter = ({ additionalFilters = [] }) => {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    accounts: [],
    businessUnits: [],
    locations: [],
    applications: [],
    projects: [],
    environments: [],
  });

  const [filterOptions, setFilterOptions] = useState({
    accounts: [],
    businessUnits: [],
    locations: [],
    applications: [],
    projects: [],
    environments: [],
  });

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const data = await api.getAllFilters();
        setFilterOptions({
          accounts: transformToOptions(data.subscriptionName),
          businessUnits: transformToOptions(data.tags_BU_company),
          locations: transformToOptions(data.resourceLocation),
          applications: transformToOptions(data.tags_AppID_AppName),
          projects: transformToOptions(data.tags_ProjectName),
          environments: transformToOptions(data.tags_Environment),
        });
      } catch (error) {
        console.error('Error fetching filters:', error);
      }
    };

    fetchFilters();
  }, []);

  const transformToOptions = (data) => {
    return data
      .filter(item => item !== null) // Exclude null values
      .map(item => ({ value: item, label: item }));
  };

  const toggleFiltersVisibility = () => {
    setIsFiltersVisible(!isFiltersVisible);
  };

  const handleFilterChange = async (filterType, values) => {
    setSelectedFilters({ ...selectedFilters, [filterType]: values });

    if (filterType === 'accounts' && values.length > 0) {
      try {
        const updatedData = await api.getFilterBasedOnSelection(values[0].value);
        setFilterOptions({
          accounts: transformToOptions(updatedData.subscriptionName), // Still need this as per your requirements
          businessUnits: transformToOptions(updatedData.tags_BU_company),
          locations: transformToOptions(updatedData.resourceLocation),
          applications: transformToOptions(updatedData.tags_AppID_AppName),
          projects: transformToOptions(updatedData.tags_ProjectName),
          environments: transformToOptions(updatedData.tags_Environment),
        });
      } catch (error) {
        console.error('Error fetching filters based on selection:', error);
      }
    }
  };

  const customStyles = {
    content: {
      top: '70px',
      left: '50%',
      transform: 'translate(-50%, 0)',
      width: '100%',
      maxWidth: '800px',
      maxHeight: 'calc(100% - 150px)',
      overflow: 'auto',
      padding: '20px',
      margin: '0',
      zIndex: '1050',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: '1040',
    },
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
      applications: [],
      projects: [],
      environments: [],
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
          {/* Accounts Unit dropdown */}
          <div className="filter-option">
            <label>Accounts(s)</label>
            <MultiSelect
              options={filterOptions.accounts}
              onChange={(values) => handleFilterChange('accounts', values)}
              value={selectedFilters.accounts}
            />
          </div>
          {/* Business Unit dropdown */}
          <div className="filter-option">
            <label>Business Unit(s)</label>
            <MultiSelect
              options={filterOptions.businessUnits}
              onChange={(values) => handleFilterChange('businessUnits', values)}
              value={selectedFilters.businessUnits}
            />
          </div>

          {/* Location dropdown */}
          <div className="filter-option">
            <label>Location(s)</label>
            <MultiSelect
              options={filterOptions.locations}
              onChange={(values) => handleFilterChange('locations', values)}
              value={selectedFilters.locations}
            />
          </div>

          {/* Application dropdown */}
          <div className="filter-option">
            <label>Application(s)</label>
            <MultiSelect
              options={filterOptions.applications}
              onChange={(values) => handleFilterChange('applications', values)}
              value={selectedFilters.applications}
            />
          </div>

          {/* Project dropdown */}
          <div className="filter-option">
            <label>Project(s)</label>
            <MultiSelect
              options={filterOptions.projects}
              onChange={(values) => handleFilterChange('projects', values)}
              value={selectedFilters.projects}
            />
          </div>

          {/* Environment dropdown */}
          <div className="filter-option">
            <label>Environment(s)</label>
            <MultiSelect
              options={filterOptions.environments}
              onChange={(values) => handleFilterChange('environments', values)}
              value={selectedFilters.environments}
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
  additionalFilters: [],
};

export default Filter;