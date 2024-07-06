import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MultiSelect } from 'react-multi-select-component';
import Modal from 'react-modal';
import api from '../api';
import '../css/Filter.scss';

const AWSFilter = ({ additionalFilters = [] }) => {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    subscriptions: [],
    businessUnits: [],
    locations: [],
    applications: [],
    projects: [],
    environments: [],
  });

  const [filterOptions, setFilterOptions] = useState({
    subscriptions: [],
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
          subscriptions: transformToOptions(data.subscriptionName),
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
    if (values.length === filterOptions[filterType].length) {
      // "Select All" case
      setSelectedFilters({ ...selectedFilters, [filterType]: values });
    } else if (values.length > 1) {
      // Restrict to single selection
      setSelectedFilters({ ...selectedFilters, [filterType]: [values[values.length - 1]] });
    } else {
      setSelectedFilters({ ...selectedFilters, [filterType]: values });
    }

    if (filterType === 'subscriptions' && values.length > 0) {
      const selectedSubscriptions = values.map(sub => sub.value);
      try {
        const updatedData = await api.getFilterBasedOnSelection(selectedSubscriptions);
        setFilterOptions({
          subscriptions: transformToOptions(updatedData.subscriptionName),
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
      subscriptions: [],
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
          {/* Subscriptions dropdown */}
          <div className="filter-option">
            <label>Subscriptions(s)</label>
            <MultiSelect
              options={filterOptions.subscriptions}
              value={selectedFilters.subscriptions}
              onChange={(values) => handleFilterChange('subscriptions', values)}
              labelledBy="Select"
              overrideStrings={{
                selectSomeItems: "Select...",
                allItemsAreSelected: "All items are selected",
                selectAll: "Select All",
                search: "Search",
              }}
            />
          </div>
          {/* Business Unit dropdown */}
          <div className="filter-option">
            <label>Business Unit(s)</label>
            <MultiSelect
              options={filterOptions.businessUnits}
              value={selectedFilters.businessUnits}
              onChange={(values) => handleFilterChange('businessUnits', values)}
              labelledBy="Select"
              overrideStrings={{
                selectSomeItems: "Select...",
                allItemsAreSelected: "All items are selected",
                selectAll: "Select All",
                search: "Search",
              }}
            />
          </div>
          {/* Location dropdown */}
          <div className="filter-option">
            <label>Location(s)</label>
            <MultiSelect
              options={filterOptions.locations}
              value={selectedFilters.locations}
              onChange={(values) => handleFilterChange('locations', values)}
              labelledBy="Select"
              overrideStrings={{
                selectSomeItems: "Select...",
                allItemsAreSelected: "All items are selected",
                selectAll: "Select All",
                search: "Search",
              }}
            />
          </div>
          {/* Application dropdown */}
          <div className="filter-option">
            <label>Application(s)</label>
            <MultiSelect
              options={filterOptions.applications}
              value={selectedFilters.applications}
              onChange={(values) => handleFilterChange('applications', values)}
              labelledBy="Select"
              overrideStrings={{
                selectSomeItems: "Select...",
                allItemsAreSelected: "All items are selected",
                selectAll: "Select All",
                search: "Search",
              }}
            />
          </div>
          {/* Project dropdown */}
          <div className="filter-option">
            <label>Project(s)</label>
            <MultiSelect
              options={filterOptions.projects}
              value={selectedFilters.projects}
              onChange={(values) => handleFilterChange('projects', values)}
              labelledBy="Select"
              overrideStrings={{
                selectSomeItems: "Select...",
                allItemsAreSelected: "All items are selected",
                selectAll: "Select All",
                search: "Search",
              }}
            />
          </div>
          {/* Environment dropdown */}
          <div className="filter-option">
            <label>Environment(s)</label>
            <MultiSelect
              options={filterOptions.environments}
              value={selectedFilters.environments}
              onChange={(values) => handleFilterChange('environments', values)}
              labelledBy="Select"
              overrideStrings={{
                selectSomeItems: "Select...",
                allItemsAreSelected: "All items are selected",
                selectAll: "Select All",
                search: "Search",
              }}
            />
          </div>
          {/* Additional filters from props */}
          {additionalFilters?.map((filter, index) => (
            <div key={index} className="filter-option">
              <label>{filter.label}</label>
              <MultiSelect
                options={filter.options || []}
                value={selectedFilters[filter.name] || []}
                onChange={(values) => handleFilterChange(filter.name, values)}
                labelledBy="Select"
                overrideStrings={{
                  selectSomeItems: "Select...",
                  allItemsAreSelected: "All items are selected",
                  selectAll: "Select All",
                  search: "Search",
                }}
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

AWSFilter.propTypes = {
  additionalFilters: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })).isRequired,
  })),
};

AWSFilter.defaultProps = {
  additionalFilters: [],
};

export default AWSFilter;
