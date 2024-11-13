import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
import HeaderButtons from "./HeaderButtons";
import DateRangeDropdown from "./DateRangeDropdown";
import "../css/Subheader.scss";
import api from "../api";

const SubHeader = ({ onButtonClick, onSubscriptionsFetch }) => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/dashboard"; 
  const [subscriptionOptions, setSubscriptionOptions] = useState([]);
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
    fetchInitialFilters();
  }, []);

  const fetchInitialFilters = async () => {
    try {
      const initialData = await api.getFilterBasedOnSelection({});
      const subscriptionsData = initialData.subscriptionName;

      onSubscriptionsFetch(subscriptionsData);
      setFilterOptions({
        subscriptions: transformToOptions(initialData.subscriptionName),
        businessUnits: transformToOptions(initialData.tags_BU_company),
        locations: transformToOptions(initialData.resourceLocation),
        applications: transformToOptions(initialData.tags_AppID_AppName),
        projects: transformToOptions(initialData.tags_ProjectName),
        environments: transformToOptions(initialData.tags_Environment),
      });
    } catch (error) {
      console.error("Error fetching initial filters:", error);
    }
  };

  const fetchFiltersBasedOnSelection = async (filters) => {
    try {
      const updatedData = await api.getFilterBasedOnSelection(filters);
      setFilterOptions({
        subscriptions: transformToOptions(updatedData.subscriptionName),
        businessUnits: transformToOptions(updatedData.tags_BU_company),
        locations: transformToOptions(updatedData.resourceLocation),
        applications: transformToOptions(updatedData.tags_AppID_AppName),
        projects: transformToOptions(updatedData.tags_ProjectName),
        environments: transformToOptions(updatedData.tags_Environment),
      });
    } catch (error) {
      console.error("Error fetching filters based on selection:", error);
    }
  };

  const transformToOptions = (data) => {
    if (!data) return [];
    return data.map((item) => ({
      value: item,
      label: item === null ? "null" : item,
    }));
  };

  // Handle change in dropdown selections
  const handleFilterChange = async (filterType, values) => {
    const newSelectedFilters = { ...selectedFilters, [filterType]: values };
    setSelectedFilters(newSelectedFilters);

    const filterParams = {
      subscriptions: newSelectedFilters.subscriptions.map((sub) => sub.value),
      businessUnits: newSelectedFilters.businessUnits.map((bu) => bu.value),
      locations: newSelectedFilters.locations.map((loc) => loc.value),
      applications: newSelectedFilters.applications.map((app) => app.value),
      projects: newSelectedFilters.projects.map((proj) => proj.value),
      environments: newSelectedFilters.environments.map((env) => env.value),
    };

    await fetchFiltersBasedOnSelection(filterParams); // Fetch updated filter options based on selections
  };

  return (
    <div className="Subheader-Container">
      <div className="Subheader-ButtonsContainer">
      <HeaderButtons onButtonClick={onButtonClick} isLandingPage={isLandingPage} />
        <DateRangeDropdown />
      </div>
      <div className="Subheader-Boxes">
        <div className="Filter-Options-Row">
          <div className="filter-option-inline">
            {/* Subscriptions dropdown */}
            <label>Subscription(s)</label>
            <MultiSelect
              options={filterOptions.subscriptions}
              value={selectedFilters.subscriptions}
              onChange={(values) => handleFilterChange("subscriptions", values)}
              labelledBy="Select"
            />
          </div>

          {/* Business Unit dropdown */}
          <div className="filter-option-inline">
            <label>Business Unit(s)</label>
            <MultiSelect
              options={filterOptions.businessUnits}
              value={selectedFilters.businessUnits}
              onChange={(values) => handleFilterChange("businessUnits", values)}
              labelledBy="Select"
            />
          </div>

          {/* Location dropdown */}
          <div className="filter-option-inline">
            <label>Location(s)</label>
            <MultiSelect
              options={filterOptions.locations}
              value={selectedFilters.locations}
              onChange={(values) => handleFilterChange("locations", values)}
              labelledBy="Select"
            />
          </div>

          {/* Application dropdown */}
          <div className="filter-option-inline">
            <label>Application(s)</label>
            <MultiSelect
              options={filterOptions.applications}
              value={selectedFilters.applications}
              onChange={(values) => handleFilterChange("applications", values)}
              labelledBy="Select"
            />
          </div>

          {/* Project dropdown */}
          <div className="filter-option-inline">
            <label>Project(s)</label>
            <MultiSelect
              options={filterOptions.projects}
              value={selectedFilters.projects}
              onChange={(values) => handleFilterChange("projects", values)}
              labelledBy="Select"
            />
          </div>

          {/* Environment dropdown */}
          <div className="filter-option-inline">
            <label>Environment(s)</label>
            <MultiSelect
              options={filterOptions.environments}
              value={selectedFilters.environments}
              onChange={(values) => handleFilterChange("environments", values)}
              labelledBy="Select"
            />
          </div>
        </div>

        <div className="Subheader-Buttons">
          <button className="apply-button">Apply</button>
          <button className="reset-button">Reset</button>
        </div>
      </div>
    </div>
  );
};

SubHeader.propTypes = {
  onButtonClick: PropTypes.func,
  onSubscriptionsFetch: PropTypes.func.isRequired,
};

SubHeader.defaultProps = {
  onButtonClick: () => {},
};

export default SubHeader;
