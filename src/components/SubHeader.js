import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { MultiSelect } from "react-multi-select-component";
import HeaderButtons from "./HeaderButtons";
import DateRangeDropdown from "./DateRangeDropdown";
import "../css/Subheader.scss";
import api from "../api";
import componentUtil from "../componentUtil";

const SubHeader = ({
  onButtonClick,
  onFiltersChange, selectedCSP
}) => {

  //1-Azure,2-AWS,3-Next new CSP add further whenever new CSP we supporting
  const [filterData,setFilterData] = useState({"1":[],"2":[],"3":[],"4":[],"5":[]});
  const [filterDataTemplate,setFilterDataTemplate] = useState({"1":[],"2":[],"3":[],"4":[],"5":[]});
  const [tags0,setTags0] = useState({"1":[],"2":[],"3":[],"4":[],"5":[]});

  const [filterSelectedData,setFilterSelectedData] = useState({"1":{},"2":{},"3":{},"4":{},"5":{}});
  const [filterSelectedDataTemplate,setFilterSelectedDataTemplate] = useState({"1":{},"2":{},"3":{},"4":{},"5":{}});
  useEffect(() => {
    fetchInitialFilters();
  }, [selectedCSP]);

  const fetchInitialFilters = async () => {
    try {
      const initialData = await api.getFilterBasedOnSelection({});
      const subscriptionsData = initialData.subscriptionName;
      setAndPopulateFilterValues(initialData);
    } catch (error) {
      console.error("Error fetching initial filters:", error);
    }
  };

  const setAndPopulateFilterValues = async(apiData) =>{
    let data =[];
    let isDataAvailable = false;
    for (const key in apiData) {
      if(key.endsWith('_key')) {
        let tagPart = key.substring(0,key.indexOf("_key"));
        let displayName = tagPart + "_displayName";
        let dataKeyName = apiData[key];
        if (apiData[displayName] != undefined )
        {
          if(key == "tags0_key") {
            if (tags0[selectedCSP].length == 0)
              setTags0({...filterDataTemplate,[selectedCSP]:apiData[dataKeyName]});
            else 
              apiData[dataKeyName] = tags0[selectedCSP];
          }
          data.push({'key': (selectedCSP == 2 ? tagPart:dataKeyName),'displayName': apiData[displayName],data: transformToOptions(apiData[dataKeyName])});
        }
      }
    }
    /*setFilterData((prevFilterData)=>{
      prevFilterData[selectedCSP]= data;
      return prevFilterData;
    });*/
    setFilterData({[selectedCSP]:data});
  };

  const handleFilterChange = async (filterType, values) => {
    let updatedValues;

    // Check if "Select All" is chosen
    const selectAllOption = values.find(
      (option) => option.value === "selectAll"
    );

    if (selectAllOption) {
      // If "Select All" is selected, replace with all options for that filter type
      filterData[selectedCSP].map((filterObj)=>{
        if(filterObj["key"] == filterType) {
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

      setFilterSelectedData((prevFilterSelectedData) =>{
        //prevFilterSelectedData[selectedCSP]= newFilterSelectedData;
        return ({...filterSelectedDataTemplate,[selectedCSP]:newFilterSelectedData});
      });

      try {
        // Fetch updated filter options based on the current selections
        const updatedData = await api.getFilterBasedOnSelection(componentUtil.transformFiltersOptionsToObject(newFilterSelectedData));
        // Update the filter options for all dropdowns
        setAndPopulateFilterValues(updatedData);
      } catch (error) {
        console.error("Error fetching filters based on selection:", error);
      }
  };


  const transformToOptions = (data,optionsOnly) => {
    if (!data || data.length == 0) return [];
    const options = data.map((item) => ({
      value: item,
      label: item === null ? "null" : item,
    }));

    // Add "Select All" as the first option
    if(optionsOnly)
    {
      return [...options];
    }
    return [{ value: "selectAll", label: "Select All" }, ...options];
  };

  const handleApplyFilters = () => {
    onFiltersChange(componentUtil.transformFiltersOptionsToObject(filterSelectedData[selectedCSP]));
  };

  const handleResetFilters = () => {
    setFilterData(filterDataTemplate); // Reset to initial state
    setFilterSelectedData(filterSelectedDataTemplate);
    fetchInitialFilters();
    onFiltersChange(componentUtil.transformFiltersOptionsToObject(filterSelectedData[selectedCSP])); // Notify parent component of the reset filters
  };

  return (
    <div className="Subheader-Container">
      <div className="Subheader-ButtonsContainer">
        <HeaderButtons onButtonClick={onButtonClick} />
        <DateRangeDropdown selectedCSP={selectedCSP}/>
      </div>
      <div className="Subheader-Boxes">
        <div className="Filter-Options-Row">
      
          {filterData[selectedCSP] && filterData[selectedCSP].map((filterObj)=>{
            const selVal = filterSelectedData[selectedCSP][filterObj["key"]] !== undefined ? filterSelectedData[selectedCSP][filterObj["key"]] : [] ;
            return (<div className="filter-option-inline">
            <label>{filterObj.displayName}(s)</label>
            <MultiSelect
              options={filterObj.data}
              value={selVal}
              onChange={(values) => handleFilterChange(filterObj["key"], values)}
              labelledBy="Select"
              disableSelectAll={false}
              hasSelectAll={false}
            />
          </div>)
          })
          }
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
