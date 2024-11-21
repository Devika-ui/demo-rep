import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { MultiSelect } from "react-multi-select-component";
import HeaderButtons from "./HeaderButtons";
import DateRangeDropdown from "./DateRangeDropdown";
import "../css/Subheader.scss";
import api from "../api";

const SubHeader = ({
  onButtonClick,
  onSubscriptionsFetch,
  onFiltersChange,
}) => {
  const [subscriptionOptions, setSubscriptionOptions] = useState([]);
  const initialFilters = {
    subscriptions: [],
    businessUnits: [],
    locations: [],
    applications: [],
    projects: [],
    environments: [],
  };

  const [selectedFilters, setSelectedFilters] = useState(initialFilters);
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

      // Merge new options with existing ones to preserve unselected options
      setFilterOptions((prevOptions) => ({
        subscriptions: mergeOptions(
          prevOptions.subscriptions,
          transformToOptions(updatedData.subscriptionName)
        ),
        businessUnits: mergeOptions(
          prevOptions.businessUnits,
          transformToOptions(updatedData.tags_BU_company)
        ),
        locations: mergeOptions(
          prevOptions.locations,
          transformToOptions(updatedData.resourceLocation)
        ),
        applications: mergeOptions(
          prevOptions.applications,
          transformToOptions(updatedData.tags_AppID_AppName)
        ),
        projects: mergeOptions(
          prevOptions.projects,
          transformToOptions(updatedData.tags_ProjectName)
        ),
        environments: mergeOptions(
          prevOptions.environments,
          transformToOptions(updatedData.tags_Environment)
        ),
      }));
    } catch (error) {
      console.error("Error fetching filters based on selection:", error);
    }
  };

  // Helper function to merge options and remove duplicates
  const mergeOptions = (existingOptions, newOptions) => {
    const allOptions = [...existingOptions, ...newOptions];
    // Remove duplicates based on 'value'
    const uniqueOptions = Array.from(
      new Map(allOptions.map((item) => [item.value, item])).values()
    );
    return uniqueOptions;
  };

  // const handleFilterChange = async (filterType, values) => {
  //   const newSelectedFilters = {
  //     ...selectedFilters,
  //     [filterType]: values,
  //   };

  //   setSelectedFilters(newSelectedFilters);

  //   const filterParams = {
  //     subscriptions: newSelectedFilters.subscriptions.map((sub) => sub.value),
  //     businessUnits: newSelectedFilters.businessUnits.map((bu) => bu.value),
  //     locations: newSelectedFilters.locations.map((loc) => loc.value),
  //     applications: newSelectedFilters.applications.map((app) => app.value),
  //     projects: newSelectedFilters.projects.map((proj) => proj.value),
  //     environments: newSelectedFilters.environments.map((env) => env.value),
  //   };

  //   await fetchFiltersBasedOnSelection(filterParams); // Fetch updated filter options based on selections
  // };

  // const handleFilterChange = async (filterType, values) => {
  //   let updatedValues;

  //   // Check if "Select All" is chosen
  //   const selectAllOption = values.find(
  //     (option) => option.value === "selectAll"
  //   );

  //   if (selectAllOption) {
  //     // If "Select All" is selected, replace with all options for that filter type
  //     updatedValues = filterOptions[filterType];
  //   } else if (values.length > 1) {
  //     // Allow only one option at a time if "Select All" is not chosen
  //     updatedValues = [values[values.length - 1]];
  //   } else {
  //     updatedValues = values; // Keep the single selected value
  //   }

  //   const newSelectedFilters = {
  //     ...selectedFilters,
  //     [filterType]: updatedValues,
  //   };

  //   setSelectedFilters(newSelectedFilters);

  //   const filterParams = {
  //     subscriptions: newSelectedFilters.subscriptions.map((sub) => sub.value),
  //     businessUnits: newSelectedFilters.businessUnits.map((bu) => bu.value),
  //     locations: newSelectedFilters.locations.map((loc) => loc.value),
  //     applications: newSelectedFilters.applications.map((app) => app.value),
  //     projects: newSelectedFilters.projects.map((proj) => proj.value),
  //     environments: newSelectedFilters.environments.map((env) => env.value),
  //   };

  //   await fetchFiltersBasedOnSelection(filterParams); // Fetch updated filter options
  // };

  const handleFilterChange = async (filterType, values) => {
    let updatedValues;

    // Check if "Select All" is chosen
    const selectAllOption = values.find(
      (option) => option.value === "selectAll"
    );

    if (selectAllOption) {
      // If "Select All" is selected, replace with all options for that filter type
      updatedValues = filterOptions[filterType];
    } else if (values.length > 1) {
      // Allow only one option at a time if "Select All" is not chosen
      updatedValues = [values[values.length - 1]];
    } else {
      updatedValues = values; // Keep the single selected value
    }

    const newSelectedFilters = {
      ...selectedFilters,
      [filterType]: updatedValues,
    };

    setSelectedFilters(newSelectedFilters);

    // Prepare filter parameters for the API
    const filterParams = {
      subscriptions: newSelectedFilters.subscriptions.map((sub) => sub.value),
      businessUnits: newSelectedFilters.businessUnits.map((bu) => bu.value),
      locations: newSelectedFilters.locations.map((loc) => loc.value),
      applications: newSelectedFilters.applications.map((app) => app.value),
      projects: newSelectedFilters.projects.map((proj) => proj.value),
      environments: newSelectedFilters.environments.map((env) => env.value),
    };

    try {
      // Fetch updated filter options based on the current selections
      const updatedData = await api.getFilterBasedOnSelection(filterParams);

      // Update the filter options for all dropdowns
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

  // const transformToOptions = (data) => {
  //   if (!data) return [];
  //   return data.map((item) => ({
  //     value: item,
  //     label: item === null ? "null" : item,
  //   }));
  // };

  const transformToOptions = (data) => {
    if (!data) return [];
    const options = data.map((item) => ({
      value: item,
      label: item === null ? "null" : item,
    }));

    // Add "Select All" as the first option
    return [{ value: "selectAll", label: "Select All" }, ...options];
  };

  const handleApplyFilters = () => {
    onFiltersChange(selectedFilters);
  };

  const handleResetFilters = () => {
    console.log("Resetting filters to initial state:", initialFilters); // L
    setSelectedFilters(initialFilters); // Reset to initial state
    fetchInitialFilters();
    onFiltersChange(initialFilters); // Notify parent component of the reset filters
  };

  return (
    <div className="Subheader-Container">
      <div className="Subheader-ButtonsContainer">
        <HeaderButtons onButtonClick={onButtonClick} />
        <DateRangeDropdown />
      </div>
      <div className="Subheader-Boxes">
        <div className="Filter-Options-Row">
          <div className="filter-option-inline">
            {/* Subscriptions dropdown */}
            <label>Subscriptions(s)</label>
            <MultiSelect
              options={filterOptions.subscriptions}
              value={selectedFilters.subscriptions}
              onChange={(values) => handleFilterChange("subscriptions", values)}
              labelledBy="Select"
              disableSelectAll={false} // No built-in "Select All" needed as it's custom-handled
              hasSelectAll={false}
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
              disableSelectAll={false}
              hasSelectAll={false}
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
              disableSelectAll={false} // No built-in "Select All" needed as it's custom-handled
              hasSelectAll={false}
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
              disableSelectAll={false} // No built-in "Select All" needed as it's custom-handled
              hasSelectAll={false}
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
              disableSelectAll={false} // No built-in "Select All" needed as it's custom-handled
              hasSelectAll={false}
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
              disableSelectAll={false}
              hasSelectAll={false}
            />
          </div>
        </div>

        <div className="Subheader-Buttons">
          <button className="apply-button" onClick={handleApplyFilters}>
            Apply
          </button>
          <button className="reset-button" onClick={handleResetFilters}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

SubHeader.propTypes = {
  onButtonClick: PropTypes.func,
  onSubscriptionsFetch: PropTypes.func.isRequired,
  onFiltersChange: PropTypes.func.isRequired,
};

SubHeader.defaultProps = {
  onButtonClick: () => {},
};

export default SubHeader;
