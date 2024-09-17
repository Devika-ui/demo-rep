import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { MultiSelect } from "react-multi-select-component";
import HeaderButtons from "./HeaderButtons";
import DateRangeDropdown from "./DateRangeDropdown";
import "../css/Subheader.scss";
import api from "../api";

const SubHeader = ({ additionalFilters, onButtonClick }) => {
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
        console.error("Error fetching filters:", error);
      }
    };

    fetchFilters();
  }, []);

  const transformToOptions = (data) => {
    return data
      .filter((item) => item !== null)
      .map((item) => ({ value: item, label: item }));
  };

  const handleFilterChange = (filterType, values) => {
    setSelectedFilters({ ...selectedFilters, [filterType]: values });
  };

  return (
    <div className="Subheader-Container">
      <div className="Subheader-TitleContainer">
        <HeaderButtons onButtonClick={onButtonClick} />
        <DateRangeDropdown />
      </div>
      <div className="Subheader-Boxes">
        <div className="Filter-Options-Row">
          <div className="filter-option-inline">
            <label>Subscription(s)</label>
            <MultiSelect
              options={filterOptions.subscriptions}
              value={selectedFilters.subscriptions}
              onChange={(values) => handleFilterChange("subscriptions", values)}
              labelledBy="Select"
            />
          </div>
          <div className="filter-option-inline">
            <label>Business Unit(s)</label>
            <MultiSelect
              options={filterOptions.subscriptions}
              value={selectedFilters.subscriptions}
              onChange={(values) => handleFilterChange("subscriptions", values)}
              labelledBy="Select"
            />
          </div>
          <div className="filter-option-inline">
            <label>Location(s)</label>
            <MultiSelect
              options={filterOptions.locations}
              value={selectedFilters.locations}
              onChange={(values) => handleFilterChange("locations", values)}
              labelledBy="Select"
            />
          </div>
          <div className="filter-option-inline">
            <label>Application(s)</label>
            <MultiSelect
              options={filterOptions.applications}
              value={selectedFilters.applications}
              onChange={(values) => handleFilterChange("applications", values)}
              labelledBy="Select"
            />
          </div>
          <div className="filter-option-inline">
            <label>Project(s)</label>
            <MultiSelect
              options={filterOptions.projects}
              value={selectedFilters.projects}
              onChange={(values) => handleFilterChange("projects", values)}
              labelledBy="Select"
            />
          </div>
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
  additionalFilters: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ),
  onButtonClick: PropTypes.func,
};

SubHeader.defaultProps = {
  additionalFilters: [],
  onButtonClick: () => {},
};

export default SubHeader;
