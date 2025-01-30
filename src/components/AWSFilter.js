import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { MultiSelect } from "react-multi-select-component";
import Modal from "react-modal";
import api from "../api";
import "../css/Filter.scss";
import componentUtil from "../componentUtil";
import { CircularProgress } from "@mui/material";

const AWSFilter = ({ onButtonClick, onFiltersChange, selectedCSP }) => {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
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

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInitialFilters();
  }, [selectedCSP]);

  const fetchInitialFilters = async () => {
    setLoading(true);
    try {
      const initialData = await api.getFilterBasedOnSelection({});
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
    /*setFilterData((prevFilterData)=>{
      prevFilterData[selectedCSP]= data;
      return prevFilterData;
    });*/
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
    toggleFiltersVisibility();
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

  const toggleFiltersVisibility = () => {
    setIsFiltersVisible(!isFiltersVisible);
  };

  const customStyles = {
    content: {
      top: "70px",
      left: "50%",
      transform: "translate(-50%, 0)",
      width: "100%",
      maxWidth: "800px",
      maxHeight: "calc(100% - 150px)",
      overflow: "auto",
      padding: "20px",
      margin: "0",
      zIndex: "1050",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: "1040",
    },
  };

  // return (
  //   <div className="Filter-Container">
  //     <span onClick={toggleFiltersVisibility} className="Filter-Text">
  //       Options
  //     </span>
  //     <Modal
  //       isOpen={isFiltersVisible}
  //       onRequestClose={toggleFiltersVisibility}
  //       style={customStyles}
  //       contentLabel="Filter Dialog"
  //     >
  //       <div className="Subheader-Boxes">
  //         {loading ? (
  //           <div className="loading-guage">
  //             <CircularProgress />
  //           </div>
  //         ) : (
  //           <div className="filter-options-container">
  //             {filterData[selectedCSP] &&
  //               filterData[selectedCSP].map((filterObj) => {
  //                 const selVal =
  //                   filterSelectedData[selectedCSP][filterObj["key"]] !==
  //                   undefined
  //                     ? filterSelectedData[selectedCSP][filterObj["key"]]
  //                     : [];
  //                 return (
  //                   <div className="filter-option">
  //                     <label>{filterObj.displayName}(s)</label>
  //                     <MultiSelect
  //                       options={filterObj.data}
  //                       value={selVal}
  //                       onChange={(values) =>
  //                         handleFilterChange(filterObj["key"], values)
  //                       }
  //                       labelledBy="Select"
  //                       disableSelectAll={false}
  //                       hasSelectAll={false}
  //                     />
  //                   </div>
  //                 );
  //               })}
  //           </div>
  //         )}

  //         <div className="Subheader-Buttons">
  //           <button className="apply-button" onClick={handleApplyFilters}>
  //             Apply
  //           </button>
  //           <button className="reset-button" onClick={handleResetFilters}>
  //             Reset
  //           </button>
  //         </div>
  //       </div>
  //     </Modal>
  //   </div>
  // );

  return (
    <div className="Filter-Container">
      <span onClick={toggleFiltersVisibility} className="Filter-Text">
        Options
      </span>
      <Modal
        isOpen={isFiltersVisible}
        onRequestClose={toggleFiltersVisibility}
        className="modal-content"
        overlayClassName="modal-overlay"
        contentLabel="Filter Dialog"
      >
        <div>
          {loading ? (
            <div className="loading-guage">
              <CircularProgress />
            </div>
          ) : (
            <div className="filter-options-container">
              {filterData[selectedCSP] &&
                filterData[selectedCSP].map((filterObj) => {
                  const selVal =
                    filterSelectedData[selectedCSP][filterObj["key"]] !==
                    undefined
                      ? filterSelectedData[selectedCSP][filterObj["key"]]
                      : [];
                  return (
                    <div className="filter-option">
                      <label>{filterObj.displayName}(s)</label>
                      <MultiSelect
                        options={filterObj.data}
                        value={selVal}
                        onChange={(values) =>
                          handleFilterChange(filterObj["key"], values)
                        }
                        labelledBy="Select"
                        disableSelectAll={false}
                        hasSelectAll={false}
                      />
                    </div>
                  );
                })}
            </div>
          )}

          <div className="Subheader-Buttons">
            <button className="apply-button" onClick={handleApplyFilters}>
              Apply
            </button>
            <button className="reset-button" onClick={handleResetFilters}>
              Reset
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

AWSFilter.propTypes = {
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
};

AWSFilter.defaultProps = {
  additionalFilters: [],
};

export default AWSFilter;
