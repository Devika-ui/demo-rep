import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import HeaderButtons from "./HeaderButtons";
import DateRangeDropdown from "./DateRangeDropdown";
import "../css/Subheader.scss";
import api from "../api";
import componentUtil from "../componentUtil";
import { CircularProgress } from "@mui/material";
import AWSFilter from "./AWSFilter.js";
import FilterIcon from "../images/filter.png";

const SubHeader = ({
  onButtonClick,
  onFiltersChange,
  selectedCSP,
  onMonthChange,
  monthComponent,
}) => {
  //100-Azure,110-AWS,120-Next new CSP add further whenever new CSP we supporting
  const [filterData, setFilterData] = useState({
    100: [],
    110: [],
    120: [],
    130: [],
    140: [],
  });
  const [filterDataTemplate, setFilterDataTemplate] = useState({
    100: [],
    110: [],
    120: [],
    130: [],
    140: [],
  });
  const [tags0, setTags0] = useState({
    100: [],
    110: [],
    120: [],
    130: [],
    140: [],
  });

  const [filterSelectedData, setFilterSelectedData] = useState({
    100: {},
    110: {},
    120: {},
    130: {},
    140: {},
  });
  const [filterSelectedDataTemplate, setFilterSelectedDataTemplate] = useState({
    100: {},
    110: {},
    120: {},
    130: {},
    140: {},
  });

  const [billingMonth, setBillingMonth] = useState([]);

  // const handleBillingMonthsChange = (month) => {
  //   setBillingMonth(month);
  //   onMonthChange(month);
  // };

  const handleBillingMonthsChange = (month) => {
    setBillingMonth(month);
    // Only call onMonthChange if it's a valid function
    if (typeof onMonthChange === "function") {
      onMonthChange(month);
    }
  };
  const [csp, setCSP] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInitialFilters();
  }, [selectedCSP]);

  const fetchInitialFilters = async () => {
    setLoading(true);
    try {
      const initialData = await api.getFilterBasedOnSelection({});
      const csp = componentUtil.getSelectedCSP();
      setCSP(csp);
      const subscriptionsData = initialData.subscriptionName;
      setAndPopulateFilterValues(initialData);
    } catch (error) {
      console.error("Error fetching initial filters:", error);
    } finally {
      setLoading(false);
    }
  };

  const setAndPopulateFilterValues = async (apiData) => {
    let data = [];
    let isDataAvailable = false;
    for (const key in apiData) {
      if (key.endsWith("_key")) {
        let tagPart = key.substring(0, key.indexOf("_key"));
        let displayName = tagPart + "_displayName";
        let dataKeyName = apiData[key];
        if (apiData[displayName] != undefined) {
          if (key == "tags0_key") {
            if (tags0[selectedCSP].length == 0)
              setTags0({
                ...filterDataTemplate,
                [selectedCSP]: apiData[dataKeyName],
              });
            else apiData[dataKeyName] = tags0[selectedCSP];
          }
          data.push({
            key: selectedCSP == 110 ? tagPart : dataKeyName,
            displayName: apiData[displayName],
            data: transformToOptions(apiData[dataKeyName]),
          });
        }
      }
    }

    setFilterData({ [selectedCSP]: data });
  };

  const handleFilterChange = async (filterType, values) => {
    let updatedValues;

    // Check if "Select All" is chosen
    const selectAllOption = values.find(
      (option) => option.value === "selectAll"
    );

    if (selectAllOption) {
      // If "Select All" is selected, replace with all options for that filter type
      filterData[selectedCSP].map((filterObj) => {
        if (filterObj["key"] == filterType) {
          updatedValues = filterObj.data;
        }
      });
    } else if (values.length > 1) {
      // Allow only one option at a time if "Select All" is not chosen
      updatedValues = [values[values.length - 1]];
    } else {
      updatedValues = values; // Keep the single selected value
    }

    const newFilterSelectedData = {
      ...filterSelectedData[selectedCSP],
      [filterType]: updatedValues,
    };

    setFilterSelectedData((prevFilterSelectedData) => {
      //prevFilterSelectedData[selectedCSP]= newFilterSelectedData;
      return {
        ...filterSelectedDataTemplate,
        [selectedCSP]: newFilterSelectedData,
      };
    });

    try {
      // Fetch updated filter options based on the current selections
      const updatedData = await api.getFilterBasedOnSelection(
        componentUtil.transformFiltersOptionsToObject(newFilterSelectedData)
      );
      // Update the filter options for all dropdowns
      setAndPopulateFilterValues(updatedData);
    } catch (error) {
      console.error("Error fetching filters based on selection:", error);
    }
  };

  const transformToOptions = (data, optionsOnly) => {
    if (!data || data.length == 0) return [];
    const options = data.map((item) => ({
      value: item,
      label: item === null ? "null" : item,
    }));

    // Add "Select All" as the first option
    if (optionsOnly) {
      return [...options];
    }
    return [{ value: "selectAll", label: "Select All" }, ...options];
  };

  const handleApplyFilters = () => {
    onFiltersChange(
      componentUtil.transformFiltersOptionsToObject(
        filterSelectedData[selectedCSP]
      )
    );
  };

  const handleResetFilters = () => {
    setFilterData(filterDataTemplate); // Reset to initial state
    setFilterSelectedData(filterSelectedDataTemplate);
    fetchInitialFilters();
    onFiltersChange(
      componentUtil.transformFiltersOptionsToObject(
        filterSelectedData[selectedCSP]
      )
    ); // Notify parent component of the reset filters
  };

  return (
    <div className="Subheader-Container">
      <div className="Subheader-ButtonsContainer">
        <HeaderButtons onButtonClick={onButtonClick} />
      </div>

      {loading ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <div className="Subheader-Container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            {csp === 100 && (
              <div
                className="AzureBox"
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "350px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "4rem",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "18px",
                      paddingRight: "5px",
                      marginTop: "5px",
                    }}
                  >
                    Azure
                  </div>
                  <img
                    src={FilterIcon}
                    alt="Filter"
                    style={{
                      width: "20px",
                      height: "20px",
                      marginLeft: "auto",
                      marginTop: "5px",
                    }}
                  />
                </div>
                <AWSFilter
                  onButtonClick={onButtonClick}
                  onFiltersChange={onFiltersChange}
                  selectedCSP={selectedCSP}
                />
              </div>
            )}
            {csp === 110 && (
              <div
                className="AWSBox"
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "350px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "4.5rem",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "18px",
                      paddingRight: "5px",
                      marginTop: "5px",
                    }}
                  >
                    AWS
                  </div>
                  <img
                    src={FilterIcon}
                    alt="Filter"
                    style={{
                      width: "20px",
                      height: "20px",
                      marginLeft: "auto",
                      marginTop: "5px",
                    }}
                  />
                </div>
                <AWSFilter
                  onButtonClick={onButtonClick}
                  onFiltersChange={onFiltersChange}
                  selectedCSP={selectedCSP}
                />
              </div>
            )}
          </div>
        </div>
      )}
      {/* <DateRangeDropdown
        selectedCSP={selectedCSP}
        onBillingMonthsChange={handleBillingMonthsChange}
      /> */}
      {monthComponent !== true && (
        <DateRangeDropdown
          selectedCSP={selectedCSP}
          onBillingMonthsChange={handleBillingMonthsChange}
        />
      )}
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
