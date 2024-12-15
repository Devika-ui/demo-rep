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
//           (item) => new Date(item.monthdetail).getMonth() === 8
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
//         const formattedDates = uniqueDates.map((date) => formatMonthYear(date));

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
//               <TableCell className="cmpCostInv_tableHeadCell">Name</TableCell>
//               <TableCell className="cmpCostInv_tableHeadCell">
//                 On Demand Cost
//               </TableCell>
//               <TableCell className="cmpCostInv_tableHeadCell">
//                 Savings
//               </TableCell>
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
  level = 0,
  toggleRow,
  expandedRows,
  rowKey,
  indentIncrement,
  selectedColumns,
}) => {
  return Object.entries(data).map(([key, value]) => {
    const isGroup = typeof value === "object" && value !== null && !value.Date;
    const isMonthLevel =
      isGroup &&
      Object.keys(value).every((k) =>
        isNaN(new Date(k).getTime()) ? false : true
      );
    const rowId = `${rowKey}-${key}`;

    return (
      <React.Fragment key={rowId}>
        <TableRow>
          <TableCell style={{ paddingLeft: `${level * indentIncrement}px` }}>
            {isGroup ? (
              <IconButton size="small" onClick={() => toggleRow(rowId)}>
                {expandedRows[rowId] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            ) : null}
            {key}
          </TableCell>
          {selectedColumns.map((col) => (
            <TableCell key={col}>
              {!isGroup && value[col] ? value[col].toFixed(2) : ""}
            </TableCell>
          ))}
        </TableRow>
        {isMonthLevel && expandedRows[rowId]
          ? Object.entries(value).map(([month, monthData]) => (
              <React.Fragment key={`${rowId}-${month}`}>
                <TableRow>
                  <TableCell
                    colSpan={selectedColumns.length + 1}
                    style={{
                      fontWeight: "bold",
                      paddingLeft: `${(level + 1) * indentIncrement}px`,
                    }}
                  >
                    {month}
                  </TableCell>
                </TableRow>
                <TableRowComponent
                  data={monthData}
                  level={level + 2}
                  toggleRow={toggleRow}
                  expandedRows={expandedRows}
                  rowKey={`${rowId}-${month}`}
                  indentIncrement={indentIncrement}
                  selectedColumns={selectedColumns}
                />
              </React.Fragment>
            ))
          : isGroup &&
            expandedRows[rowId] && (
              <TableRowComponent
                data={value}
                level={level + 1}
                toggleRow={toggleRow}
                expandedRows={expandedRows}
                rowKey={rowId}
                indentIncrement={indentIncrement}
                selectedColumns={selectedColumns}
              />
            )}
      </React.Fragment>
    );
  });
};

const CostInventory = () => {
  const [expandedRows, setExpandedRows] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [groupBy, setGroupBy] = useState([
    { label: "On-Demand", value: "OnDemandCost" },
    { label: "Savings", value: "Savings" },
  ]);

  const [tableData, setTableData] = useState({});
  const [loading, setLoading] = useState(true);
  const [pageState, setPageState] = useState({});
  const [totalPagesState, setTotalPagesState] = useState({});
  const [loadedSubscriptions, setLoadedSubscriptions] = useState({});
  const [columns, setColumns] = useState(groupBy.map((option) => option.value));

  const columnOptions = [
    { label: "On-Demand", value: "OnDemandCost" },
    { label: "Savings", value: "Savings" },
    { label: "Reservation", value: "ReservationCost" },
    { label: "Market Purchase", value: "MarketPurchaseCostCost" },
    { label: "Total Bill", value: "TotalBill" },
  ];

  useEffect(() => {
    setColumns(groupBy.map((option) => option.value));
  }, [groupBy]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleGroupByChange = (selectedOptions) => {
    setGroupBy(selectedOptions);
  };

  const toggleRow = async (rowKey) => {
    setExpandedRows((prev) => ({ ...prev, [rowKey]: !prev[rowKey] }));

    if (!expandedRows[rowKey]) {
      const subscriptionNames = rowKey.split("-");
      for (const subscription of subscriptionNames) {
        if (!loadedSubscriptions[subscription]) {
          const currentPage = pageState[subscription] || 1;
          const totalPages = totalPagesState[subscription] || 1;

          for (let page = currentPage + 1; page <= totalPages; page++) {
            await fetchCloudInventoryData(subscription, page);
          }

          setLoadedSubscriptions((prev) => ({
            ...prev,
            [subscription]: true,
          }));
        }
      }
    }
  };

  const parseAndGroupByMonth = (data) => {
    const groupedData = {};

    const traverse = (obj, path = []) => {
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value === "object" && value !== null) {
          if (value.Date) {
            // Extract the month
            const monthKey = new Date(value.Date).toLocaleString("default", {
              month: "long",
              year: "numeric",
            });
            const subscription = path[0] || key; // Subscription Level
            const service = path[1] || "General"; // Service Level
            const type = path[2] || "Unknown"; // Type Level
            const resourceGroup = path[3] || "No Resource Group"; // Resource Group Level

            // Initialize the nested structure
            groupedData[subscription] = groupedData[subscription] || {};
            groupedData[subscription][service] =
              groupedData[subscription][service] || {};
            groupedData[subscription][service][type] =
              groupedData[subscription][service][type] || {};
            groupedData[subscription][service][type][resourceGroup] =
              groupedData[subscription][service][type][resourceGroup] || {};
            groupedData[subscription][service][type][resourceGroup][monthKey] =
              groupedData[subscription][service][type][resourceGroup][
                monthKey
              ] || {};

            // Assign the value under the month
            groupedData[subscription][service][type][resourceGroup][monthKey][
              key
            ] = value;
          } else {
            traverse(value, [...path, key]);
          }
        }
      }
    };

    traverse(data);
    return groupedData;
  };
  const fetchCloudInventoryData = async (subscriptionName, page) => {
    try {
      console.log(
        `Fetching data for subscription: ${subscriptionName}, page: ${page}`
      ); // Debug log
      const rawData = await api.getCloudInventory(subscriptionName, page);
      const groupedData = parseAndGroupByMonth(rawData);

      setTableData((prev) => ({
        ...prev,
        [subscriptionName]: appendData(
          prev[subscriptionName] || {},
          groupedData
        ),
      }));
      setPageState((prev) => ({ ...prev, [subscriptionName]: page }));
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
  };

  const appendData = (originalData, newData) => {
    const mergedData = { ...originalData };
    const recursiveMerge = (orig, newData) => {
      for (const [key, value] of Object.entries(newData)) {
        if (orig[key] && typeof orig[key] === "object") {
          recursiveMerge(orig[key], value);
        } else {
          orig[key] = value;
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
        const subscriptions = [
          ...new Set(countData.map((item) => item.subscriptionName)),
        ];
        const pageState = {};
        const dataState = {};

        await Promise.all(
          subscriptions.map(async (subscription) => {
            const totalCount = countData
              .filter((item) => item.subscriptionName === subscription)
              .reduce((sum, item) => sum + item.totalcount, 0);
            pageState[subscription] = Math.ceil(totalCount / 1000);
            const rawData = await api.getCloudInventory(subscription, 1);
            dataState[subscription] = parseAndGroupByMonth(rawData);
          })
        );

        setTotalPagesState(pageState);
        setTableData(dataState);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box className="cmpCostInv_container">
      <div className="cmpCostInv_header">
        <h2 className="cmpCostInv_title">Cloud Inventory</h2>
        <Box className="cmpCostInv_search">
          <div className="cmpCostInv_searchIcon">
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            classes={{
              root: "cmpCostInv_inputRoot",
              input: "cmpCostInv_inputInput",
            }}
          />
        </Box>
        <div className="cmpCostInv_buttonsContainer">
          <div className="cmpCostInv_groupByContainer">
            <span className="cmpCostInv_groupByLabel">Group By: (max 5)</span>
            <MultiSelect
              className="cmpCostInv_groupBySelect"
              options={columnOptions}
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
            <IconButton className="cmpCostInv_Sharebutton">
              <ShareIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <TableContainer className="cmpCostInv_tableContainer">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="cmpCostInv_tableHeader">
                {" "}
                SubscriptionName
              </TableCell>
              {columns.map((col) => (
                <TableCell key={col} className="cmpCostInv_tableHeader">
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(tableData).map(([month, data]) => (
              <React.Fragment key={month}>
                {/* Top-level: Month */}
                <TableRow>
                  <TableCell
                    colSpan={columns.length + 1}
                    style={{ fontWeight: "bold" }}
                  >
                    {month}
                  </TableCell>
                </TableRow>
                {/* Render nested levels */}
                <TableRowComponent
                  data={data}
                  toggleRow={toggleRow}
                  expandedRows={expandedRows}
                  rowKey={month}
                  indentIncrement={20}
                  selectedColumns={columns}
                />
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CostInventory;
