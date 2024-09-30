// import React, { useState, useEffect } from "react";
// import TableContainer from "@mui/material/TableContainer";
// import Table from "@mui/material/Table";
// import TableHead from "@mui/material/TableHead";
// import TableBody from "@mui/material/TableBody";
// import TableRow from "@mui/material/TableRow";
// import TableCell from "@mui/material/TableCell";
// import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import ShareIcon from "@mui/icons-material/Share";
// import SearchIcon from "@mui/icons-material/Search";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ExpandLessIcon from "@mui/icons-material/ExpandLess";
// import Box from "@mui/material/Box";
// import InputBase from "@mui/material/InputBase";
// import { MultiSelect } from "react-multi-select-component";
// import CostsAmortized from "./CostsAmortized";
// import "../css/components/CostInventory.css";
// import api from "../api";

// const TableRowComponent = ({
//   data,
//   level,
//   toggleRow,
//   expandedRows,
//   rowKey,
//   indentIncrement,
// }) => {
//   const indentLevel = level * indentIncrement;

//   const calculateAggregates = (value) => {
//     let aggregatedOnDemandCost = 0;
//     let aggregatedSavings = 0;

//     if (typeof value === "object" && value !== null && !Array.isArray(value)) {
//       for (const subValue of Object.values(value)) {
//         if (subValue.OnDemandCost) {
//           aggregatedOnDemandCost += parseFloat(subValue.OnDemandCost);
//         }
//         if (subValue.Savings) {
//           aggregatedSavings += parseFloat(subValue.Savings);
//         } else if (typeof subValue === "object") {
//           const { onDemandCost, savings } = calculateAggregates(subValue);
//           aggregatedOnDemandCost += onDemandCost;
//           aggregatedSavings += savings;
//         }
//       }
//     }
//     return { onDemandCost: aggregatedOnDemandCost, savings: aggregatedSavings };
//   };

//   const renderRow = (key, value, index) => {
//     const newKey = `${rowKey}-${index}`;
//     const hasNestedData =
//       typeof value === "object" &&
//       value !== null &&
//       !Array.isArray(value) &&
//       !("Date" in value && "OnDemandCost" in value && "Savings" in value);

//     const { onDemandCost: aggregatedOnDemandCost, savings: aggregatedSavings } =
//       calculateAggregates(value);

//     return (
//       <React.Fragment key={newKey}>
//         <TableRow className="cmpSvcCat_nestedRow">
//           <TableCell
//             style={{ paddingLeft: indentLevel }}
//             className="cmpCostInv_tableCell"
//           >
//             {hasNestedData ? (
//               <IconButton size="small" onClick={() => toggleRow(newKey)}>
//                 {expandedRows[newKey] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//               </IconButton>
//             ) : null}
//             {key}
//           </TableCell>
//           {typeof value === "object" &&
//           value !== null &&
//           !Array.isArray(value) ? (
//             <>
//               <TableCell className="cmpCostInv_cell">
//                 {hasNestedData
//                   ? aggregatedOnDemandCost.toFixed(2)
//                   : value.OnDemandCost}
//               </TableCell>
//               <TableCell className="cmpCostInv_cell">
//                 {hasNestedData ? aggregatedSavings.toFixed(2) : value.Savings}
//               </TableCell>
//             </>
//           ) : (
//             <>
//               <TableCell className="cmpCostInv_cell" />
//               <TableCell className="cmpCostInv_cell" />
//             </>
//           )}
//         </TableRow>
//         {expandedRows[newKey] && hasNestedData && (
//           <TableRowComponent
//             data={value}
//             level={level + 1}
//             toggleRow={toggleRow}
//             expandedRows={expandedRows}
//             rowKey={newKey}
//             indentIncrement={indentIncrement}
//           />
//         )}
//       </React.Fragment>
//     );
//   };

//   return (
//     <>
//       {Object.entries(data).map(([key, value], index) =>
//         renderRow(key, value, index)
//       )}
//     </>
//   );
// };

// const CostInventory = () => {
//   const [expandedRows, setExpandedRows] = useState({});
//   const [searchQuery, setSearchQuery] = useState("");
//   const [groupBy, setGroupBy] = useState([]);
//   const [tableData, setTableData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [date, setDate] = useState([]);
//   const [pageState, setPageState] = useState({});
//   const [totalPagesState, setTotalPagesState] = useState({});
//   const [loadedSubscriptions, setLoadedSubscriptions] = useState({});
//   const [loadedInnerRows, setLoadedInnerRows] = useState({});
//   const [uniqueMonths1, setUniqueMonths] = useState([]);

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleGroupByChange = (selectedOptions) => {
//     setGroupBy(selectedOptions);
//   };

//   const toggleRow = async (rowKey) => {
//     const isExpanded = !expandedRows[rowKey];
//     setExpandedRows((prevExpandedRows) => ({
//       ...prevExpandedRows,
//       [rowKey]: isExpanded,
//     }));

//     // Extract the top-level subscription from the rowKey
//     const topLevelSubscription = rowKey.split("-")[0];

//     // If expanding, and data for the top-level subscription is not yet fully loaded
//     if (isExpanded && !loadedSubscriptions[topLevelSubscription]) {
//       const subscriptionNames = rowKey.split("-");
//       const fetchAllData = async () => {
//         for (const subscriptionName of subscriptionNames) {
//           // Ensure we don't refetch data if it is already fully loaded
//           if (loadedSubscriptions[subscriptionName]) continue;

//           const currentPage = pageState[subscriptionName] || 1;
//           const totalPages = totalPagesState[subscriptionName] || 1;

//           const fetchDataForPages = async (page) => {
//             await fetchCloudInventoryData(subscriptionName, page);
//             if (page < totalPages) {
//               await fetchDataForPages(page + 1);
//             }
//           };

//           await fetchDataForPages(currentPage + 1);
//         }

//         // Mark the top-level subscription as fully loaded
//         setLoadedSubscriptions((prevLoadedSubscriptions) => ({
//           ...prevLoadedSubscriptions,
//           [topLevelSubscription]: true,
//         }));
//       };
//       await fetchAllData();
//     }
//   };

//   // Example of fetchCloudInventoryData function
//   const fetchCloudInventoryData = async (subscriptionName, page) => {
//     try {
//       const apiData = await api.getCloudInventory(subscriptionName, page);

//       setTableData((prevTableData) => ({
//         ...prevTableData,
//         [subscriptionName]: appendData(
//           prevTableData[subscriptionName] || {},
//           apiData
//         ),
//       }));

//       setPageState((prevPageState) => ({
//         ...prevPageState,
//         [subscriptionName]: page,
//       }));
//     } catch (error) {
//       console.error("Error fetching more data:", error);
//     }
//   };

//   const appendData = (originalData, newData) => {
//     const mergedData = { ...originalData };

//     const recursiveMerge = (orig, newData) => {
//       for (const [key, value] of Object.entries(newData)) {
//         if (
//           orig[key] &&
//           typeof orig[key] === "object" &&
//           !Array.isArray(orig[key])
//         ) {
//           recursiveMerge(orig[key], value);
//         } else {
//           if (key === "OnDemandCost" || key === "Savings") {
//             orig[key] = (
//               parseFloat(orig[key] || 0) + parseFloat(value)
//             ).toFixed(2);
//           } else {
//             orig[key] = value;
//           }
//         }
//       }
//     };

//     recursiveMerge(mergedData, newData);
//     return mergedData;
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const countData = await api.getCloudInventoryCount();

//         // Filter for March data
//         const marchData = countData.filter(
//           (item) => new Date(item.monthdetail).getMonth() === 2
//         );

//         // Extract unique subscriptions
//         const subscriptions = Array.from(
//           new Set(marchData.map((item) => item.subscriptionName))
//         );

//         // Initialize state for pages and data
//         const pageState = {};
//         const dataState = {};

//         // Fetch total pages and data for each subscription
//         await Promise.all(
//           subscriptions.map(async (subscription) => {
//             const totalCount = marchData
//               .filter((item) => item.subscriptionName === subscription)
//               .reduce((sum, item) => sum + item.totalcount, 0);

//             pageState[subscription] = Math.ceil(totalCount / 1000);

//             // Fetch initial data for each subscription
//             dataState[subscription] = await api.getCloudInventory(
//               subscription,
//               1
//             );
//           })
//         );

//         // Update state with fetched data
//         setTotalPagesState(pageState);
//         setTableData(dataState);

//         // Extract dates from data
//         const datesSet = new Set();
//         const extractDates = (data) => {
//           for (const key in data) {
//             const value = data[key];
//             if (typeof value === "object" && value !== null) {
//               extractDates(value);
//             } else if (key === "Date") {
//               datesSet.add(value);
//             }
//           }
//         };

//         Object.values(dataState).forEach((subscriptionData) =>
//           extractDates(subscriptionData)
//         );

//         // Convert the set back to an array
//         const uniqueDates = Array.from(datesSet);
//         const formatMonthYear = (dateString) => {
//           const date = new Date(dateString);
//           const month = date.toLocaleString("default", { month: "long" });
//           const year = date.getFullYear().toString().slice(-2);
//           return `${month}-${year}`;
//         };

//         const uniqueMonths = Array.from(
//           new Set(countData.map((item) => item.monthdetail))
//         ).map(formatMonthYear);
//         setUniqueMonths(uniqueMonths);

//         const formattedDates = uniqueDates.map((date) => formatMonthYear(date));
//         console.log("uniquemonths", uniqueMonths);
//         // Update dates state
//         setDate(formattedDates);
//       } catch (error) {
//         console.error("Error fetching initial data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <Box className="cmpCostInv_container">
//       <div className="cmpCostInv_header">
//         <h2 className="cmpCostInv_title">Cost Inventory</h2>
//         <Box className="cmpCostInv_search">
//           <div className="cmpCostInv_searchIcon">
//             <SearchIcon />
//           </div>
//           <InputBase
//             placeholder="Search by resource group"
//             classes={{
//               root: "cmpCostInv_inputRoot",
//               input: "cmpCostInv_inputInput",
//             }}
//             value={searchQuery}
//             onChange={handleSearchChange}
//           />
//         </Box>
//         <div className="cmpCostInv_buttonsContainer">
//           <div className="cmpCostInv_groupByContainer">
//             <span className="cmpCostInv_groupByLabel">Group By</span>
//             <MultiSelect
//               className="cmpCostInv_groupBySelect"
//               options={[
//                 { label: "Resource", value: "Resource" },
//                 { label: "Resource Group", value: "Resource Group" },
//               ]}
//               value={groupBy}
//               onChange={handleGroupByChange}
//               labelledBy="Select"
//             />
//           </div>

//           <div className="cmpCostInv_buttons">
//             <CostsAmortized dialogPaperClass="cmpCostInv_dialogPaper" />
//             <Button
//               variant="contained"
//               className="cmpCostInv_button"
//               color="inherit"
//             >
//               Customize Report
//             </Button>
//             <IconButton className="cmpCostInv_button">
//               <ShareIcon />
//             </IconButton>
//           </div>
//         </div>
//       </div>
//       <TableContainer>
//         <Table className="cmpCostInv_table">
//           <TableHead>
//             <TableRow>
//               {uniqueMonths1.map((month) => (
//                 <TableCell
//                   key={month}
//                   colSpan={3}
//                   className="cmpCostInv_tableHeadCell"
//                   align="center"
//                 >
//                   {month}
//                 </TableCell>
//               ))}
//             </TableRow>
//             <TableRow>
//               {uniqueMonths1.map((month) => (
//                 <>
//                   <TableCell
//                     key={`${month}-name`}
//                     className="cmpCostInv_tableHeadCell"
//                   >
//                     Name
//                   </TableCell>
//                   <TableCell
//                     key={`${month}-ondemand`}
//                     className="cmpCostInv_tableHeadCell"
//                   >
//                     On Demand Cost
//                   </TableCell>
//                   <TableCell
//                     key={`${month}-savings`}
//                     className="cmpCostInv_tableHeadCell"
//                   >
//                     Savings
//                   </TableCell>
//                 </>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {Object.entries(tableData).map(([subscriptionName, data]) => (
//               <TableRowComponent
//                 key={subscriptionName}
//                 data={data}
//                 level={0}
//                 toggleRow={toggleRow}
//                 expandedRows={expandedRows}
//                 rowKey={subscriptionName}
//                 indentIncrement={20}
//               />
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default CostInventory;
import React, { useState, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import { MultiSelect } from "react-multi-select-component";
import CostsAmortized from "./CostsAmortized";
import "../css/components/CostInventory.css";
import api from "../api";

const TableRowComponent = ({
  data,
  level,
  toggleRow,
  expandedRows,
  rowKey,
  indentIncrement,
  uniqueMonths,
}) => {
  const indentLevel = level * indentIncrement;

  const calculateAggregates = (value) => {
    let aggregatedOnDemandCost = 0;
    let aggregatedSavings = 0;

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      for (const subValue of Object.values(value)) {
        if (subValue.OnDemandCost) {
          aggregatedOnDemandCost += parseFloat(subValue.OnDemandCost);
        }
        if (subValue.Savings) {
          aggregatedSavings += parseFloat(subValue.Savings);
        } else if (typeof subValue === "object") {
          const { onDemandCost, savings } = calculateAggregates(subValue);
          aggregatedOnDemandCost += onDemandCost;
          aggregatedSavings += savings;
        }
      }
    }
    return { onDemandCost: aggregatedOnDemandCost, savings: aggregatedSavings };
  };

  const renderRow = (key, value, index) => {
    const newKey = `${rowKey}-${index}`;
    const hasNestedData =
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value) &&
      !("Date" in value && "OnDemandCost" in value && "Savings" in value);

    const { onDemandCost: aggregatedOnDemandCost, savings: aggregatedSavings } =
      calculateAggregates(value);

    return (
      <React.Fragment key={newKey}>
        <TableRow className="cmpSvcCat_nestedRow">
          <TableCell
            style={{ paddingLeft: indentLevel }}
            className="cmpCostInv_tableCell"
          >
            {hasNestedData ? (
              <IconButton size="small" onClick={() => toggleRow(newKey)}>
                {expandedRows[newKey] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            ) : null}
            {key}
          </TableCell>
          {uniqueMonths.map((month) => (
            <React.Fragment key={month}>
              <TableCell className="cmpCostInv_cell">
                {hasNestedData
                  ? aggregatedOnDemandCost.toFixed(2)
                  : value.OnDemandCost}
              </TableCell>
              <TableCell className="cmpCostInv_cell">
                {hasNestedData ? aggregatedSavings.toFixed(2) : value.Savings}
              </TableCell>
            </React.Fragment>
          ))}
        </TableRow>
        {expandedRows[newKey] && hasNestedData && (
          <TableRowComponent
            data={value}
            level={level + 1}
            toggleRow={toggleRow}
            expandedRows={expandedRows}
            rowKey={newKey}
            indentIncrement={indentIncrement}
            uniqueMonths={uniqueMonths}
          />
        )}
      </React.Fragment>
    );
  };

  return (
    <>
      {Object.entries(data).map(([key, value], index) =>
        renderRow(key, value, index)
      )}
    </>
  );
};

const CostInventory = () => {
  const [expandedRows, setExpandedRows] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [groupBy, setGroupBy] = useState([]);
  const [tableData, setTableData] = useState({});
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState([]);
  const [pageState, setPageState] = useState({});
  const [totalPagesState, setTotalPagesState] = useState({});
  const [loadedSubscriptions, setLoadedSubscriptions] = useState({});
  const [uniqueMonths, setUniqueMonths] = useState([]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleGroupByChange = (selectedOptions) => {
    setGroupBy(selectedOptions);
  };

  const toggleRow = async (rowKey) => {
    const isExpanded = !expandedRows[rowKey];
    setExpandedRows((prevExpandedRows) => ({
      ...prevExpandedRows,
      [rowKey]: isExpanded,
    }));

    const topLevelSubscription = rowKey.split("-")[0];

    if (isExpanded && !loadedSubscriptions[topLevelSubscription]) {
      const subscriptionNames = rowKey.split("-");
      const fetchAllData = async () => {
        for (const subscriptionName of subscriptionNames) {
          if (loadedSubscriptions[subscriptionName]) continue;

          const currentPage = pageState[subscriptionName] || 1;
          const totalPages = totalPagesState[subscriptionName] || 1;

          const fetchDataForPages = async (page) => {
            await fetchCloudInventoryData(subscriptionName, page);
            if (page < totalPages) {
              await fetchDataForPages(page + 1);
            }
          };

          await fetchDataForPages(currentPage + 1);
        }

        setLoadedSubscriptions((prevLoadedSubscriptions) => ({
          ...prevLoadedSubscriptions,
          [topLevelSubscription]: true,
        }));
      };
      await fetchAllData();
    }
  };

  const fetchCloudInventoryData = async (subscriptionName, page) => {
    try {
      const apiData = await api.getCloudInventory(subscriptionName, page);

      setTableData((prevTableData) => ({
        ...prevTableData,
        [subscriptionName]: appendData(
          prevTableData[subscriptionName] || {},
          apiData
        ),
      }));

      setPageState((prevPageState) => ({
        ...prevPageState,
        [subscriptionName]: page,
      }));
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
  };

  const appendData = (originalData, newData) => {
    const mergedData = { ...originalData };

    const recursiveMerge = (orig, newData) => {
      for (const [key, value] of Object.entries(newData)) {
        if (
          orig[key] &&
          typeof orig[key] === "object" &&
          !Array.isArray(orig[key])
        ) {
          recursiveMerge(orig[key], value);
        } else {
          if (key === "OnDemandCost" || key === "Savings") {
            orig[key] = (
              parseFloat(orig[key] || 0) + parseFloat(value)
            ).toFixed(2);
          } else {
            orig[key] = value;
          }
        }
      }
    };

    recursiveMerge(mergedData, newData);
    return mergedData;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countData = await api.getCloudInventoryCount();

        const marchData = countData.filter(
          (item) => new Date(item.monthdetail).getMonth() === 2
        );

        const subscriptions = Array.from(
          new Set(marchData.map((item) => item.subscriptionName))
        );

        const pageState = {};
        const dataState = {};

        await Promise.all(
          subscriptions.map(async (subscription) => {
            const totalCount = marchData
              .filter((item) => item.subscriptionName === subscription)
              .reduce((sum, item) => sum + item.totalcount, 0);

            pageState[subscription] = Math.ceil(totalCount / 1000);

            dataState[subscription] = await api.getCloudInventory(
              subscription,
              1
            );
          })
        );

        setTotalPagesState(pageState);
        setTableData(dataState);

        const datesSet = new Set();
        const extractDates = (data) => {
          for (const key in data) {
            const value = data[key];
            if (typeof value === "object" && value !== null) {
              extractDates(value);
            } else if (key === "Date") {
              datesSet.add(value);
            }
          }
        };

        Object.values(dataState).forEach((subscriptionData) =>
          extractDates(subscriptionData)
        );

        const uniqueDates = Array.from(datesSet);
        const formatMonthYear = (dateString) => {
          const date = new Date(dateString);
          const month = date.toLocaleString("default", { month: "long" });
          const year = date.getFullYear().toString().slice(-2);
          return `${month}-${year}`;
        };

        const uniqueMonths = Array.from(
          new Set(countData.map((item) => item.monthdetail))
        ).map(formatMonthYear);
        setUniqueMonths(uniqueMonths);

        const formattedDates = uniqueDates.map((date) => formatMonthYear(date));
        setDate(formattedDates);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box className="cmpCostInv_container">
      <div className="cmpCostInv_header">
        <h2 className="cmpCostInv_title">Cost Inventory</h2>
        <Box className="cmpCostInv_search">
          <div className="cmpCostInv_searchIcon">
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search by resource group"
            classes={{
              root: "cmpCostInv_inputRoot",
              input: "cmpCostInv_inputInput",
            }}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Box>
        <div className="cmpCostInv_buttonsContainer">
          <div className="cmpCostInv_groupByContainer">
            <span className="cmpCostInv_groupByLabel">Group By</span>
            <MultiSelect
              className="cmpCostInv_groupBySelect"
              options={[
                { label: "Resource", value: "Resource" },
                { label: "Resource Group", value: "Resource Group" },
              ]}
              value={groupBy}
              onChange={handleGroupByChange}
              labelledBy="Select"
            />
          </div>

          <div className="cmpCostInv_buttons">
            <CostsAmortized dialogPaperClass="cmpCostInv_dialogPaper" />
            <Button
              variant="contained"
              className="cmpCostInv_button"
              color="inherit"
            >
              Customize Report
            </Button>
            <IconButton className="cmpCostInv_button">
              <ShareIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <TableContainer>
        <Table className="cmpCostInv_table">
          <TableHead>
            <TableRow>
              {uniqueMonths.map((month) => (
                <TableCell
                  key={month}
                  colSpan={3}
                  className="cmpCostInv_tableHeadCell"
                  align="center"
                >
                  {month}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              {uniqueMonths.map((month) => (
                <React.Fragment key={month}>
                  <TableCell className="cmpCostInv_tableHeadCell">
                    Name
                  </TableCell>
                  <TableCell className="cmpCostInv_tableHeadCell">
                    On Demand Cost
                  </TableCell>
                  <TableCell className="cmpCostInv_tableHeadCell">
                    Savings
                  </TableCell>
                </React.Fragment>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(tableData).map(([subscriptionName, data]) => (
              <TableRowComponent
                key={subscriptionName}
                data={data}
                level={0}
                toggleRow={toggleRow}
                expandedRows={expandedRows}
                rowKey={subscriptionName}
                indentIncrement={20}
                uniqueMonths={uniqueMonths}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CostInventory;
