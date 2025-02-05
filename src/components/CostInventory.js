import React, { useState, useEffect, useRef } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import { MultiSelect } from "react-multi-select-component";
import CostsAmortized from "./CostsAmortized";
import "../css/components/CostInventory.css";
import api from "../api";
import ShareButton from "./ShareButton";

const TableRowComponent = ({
  data,
  level,
  toggleRow,
  expandedRows,
  rowKey,
  indentIncrement,
  selectedColumns,
  uniqueMonths,
  selectedCSP,
}) => {
  let transformedData = [];
  const indentLevel = level * indentIncrement;
  const heirarchyLevel = selectedCSP == 100 ? 4 : 3;
  const dateLevel = selectedCSP == 100 ? 3 : 2;

  const hasNestedData = (item) =>
    Array.isArray(item?.children) && item.children.length > 0;

  // Helper function to format values to 2 decimal points
  const formatValueToTwoDecimals = (value) => {
    return parseFloat(value || 0).toFixed(2);
  };

  const aggregateMonthData = (month, item) => {
    const initialData = {
      TotalBill: 0,
      OnDemandCost: 0,
      ReservationCost: 0,
      SavingsPlanCost: 0,
      MarketPurchaseCost: 0,
    };

    const aggregateChildrenData = (children) => {
      return children.reduce(
        (acc, child) => {
          if (child.name === month && child.type === "month") {
            acc.TotalBill += child.TotalBill || 0;
            acc.OnDemandCost += child.OnDemandCost || 0;
            acc.ReservationCost += child.ReservationCost || 0;
            acc.SavingsPlanCost += child.SavingsPlanCost || 0;
            acc.MarketPurchaseCost += child.MarketPurchaseCostCost || 0;
          }
          if (child.children && child.children.length > 0) {
            const nestedData = aggregateChildrenData(child.children);
            acc.TotalBill += nestedData.TotalBill;
            acc.OnDemandCost += nestedData.OnDemandCost;
            acc.ReservationCost += nestedData.ReservationCost;
            acc.SavingsPlanCost += nestedData.SavingsPlanCost;
            acc.MarketPurchaseCost += child.MarketPurchaseCostCost || 0;
          }
          return acc;
        },
        { ...initialData }
      );
    };

    return aggregateChildrenData(item?.children || []);
  };
  return (
    <>
      {data.map((item, index) => (
        <React.Fragment key={`${rowKey}-${index}`}>
          <TableRow className="cmpCostInv_nestedRow">
            <TableCell
              style={{ paddingLeft: indentLevel, width: "200px  " }}
              className="cmpCostInv_first_cell"
            >
              {item.name}
              {level < heirarchyLevel && hasNestedData(item) && (
                <IconButton
                  size="small"
                  onClick={() => toggleRow(rowKey, index)}
                >
                  {expandedRows[rowKey]?.[index] ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </IconButton>
              )}
            </TableCell>

            {uniqueMonths.map((month) => {
              const monthData =
                level === dateLevel
                  ? item.children?.find(
                      (child) => child.name === month && child.type === "month"
                    ) || {}
                  : aggregateMonthData(month, item);

              return (
                <React.Fragment key={`${month}-${item.name}`}>
                  {selectedColumns.map((col) => (
                    <TableCell className="cmpCostInv_cell">
                      {formatValueToTwoDecimals(monthData[col] || "0")}
                    </TableCell>
                  ))}
                </React.Fragment>
              );
            })}
          </TableRow>

          {expandedRows[rowKey]?.[index] &&
            level < heirarchyLevel &&
            item.children &&
            item.children.length > 0 && (
              <TableRowComponent
                data={item.children}
                level={level + 1}
                toggleRow={toggleRow}
                expandedRows={expandedRows}
                rowKey={`${rowKey}-${index}`}
                indentIncrement={indentIncrement}
                selectedColumns={selectedColumns}
                uniqueMonths={uniqueMonths}
                selectedCSP={selectedCSP}
              />
            )}
        </React.Fragment>
      ))}
    </>
  );
};

const CostInventory = ({ selectedCSP, billingMonth }) => {
  const [expandedRows, setExpandedRows] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [groupBy, setGroupBy] = useState([
    { label: "On-Demand", value: "OnDemandCost" },
    { label: "Savings", value: "SavingsPlanCost" },
  ]);

  const [tableData, setTableData] = useState({});
  const [loading, setLoading] = useState(true);
  const [pageState, setPageState] = useState({});
  const [totalPagesState, setTotalPagesState] = useState({});
  const [loadedSubscriptions, setLoadedSubscriptions] = useState({});
  const [columns, setColumns] = useState(groupBy.map((option) => option.value));
  const [uniqueMonths, setUniqueMonths] = useState([]);
  const [formattedMonths, setFormattedMonths] = useState([]);
  const [fetchingPage, setFetchingPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const columnOptions = [
    { label: "On-Demand", value: "OnDemandCost" },
    { label: "Savings", value: "SavingsPlanCost" },
    { label: "Reservation", value: "ReservationCost" },
    { label: "Market Purchase", value: "MarketPurchaseCost" },
    { label: "Total Bill", value: "TotalBill" },
  ];

  const flattenTableData = (data) => {
    const result = [];

    const flatten = (node) => {
      if (!node) return;

      const { name, type, children } = node;
      const row = { name, type };

      // Add month data if it exists
      if (children) {
        children.forEach((child) => {
          if (child.type === "month") {
            row[child.name] = {
              TotalBill: child.TotalBill || 0,
              OnDemandCost: child.OnDemandCost || 0,
              ReservationCost: child.ReservationCost || 0,
              SavingsPlanCost: child.SavingsPlanCost || 0,
              MarketPurchaseCost: child.MarketPurchaseCost || 0,
            };
          } else {
            flatten(child); // Recursively flatten children
          }
        });
      }

      result.push(row);
    };

    Object.values(data).forEach((subscriptionData) => {
      subscriptionData.forEach(flatten);
    });

    return result;
  };

  const flattenedData = flattenTableData(tableData);

  const tableRef = useRef(null);

  useEffect(() => {
    setColumns(groupBy.map((option) => option.value));
  }, [groupBy]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleGroupByChange = (selectedOptions) => {
    setGroupBy(selectedOptions);
  };

  const toggleRow = async (rowKey, index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowKey]: { ...prev[rowKey], [index]: !prev[rowKey]?.[index] },
    }));

    if (!expandedRows[rowKey]) {
      const subscriptionNames = rowKey.split("-");
      for (const subscription of subscriptionNames) {
        if (!loadedSubscriptions[subscription]) {
          const currentPage = pageState[subscription] || 1;
          const totalPages = totalPagesState[subscription] || 1;

          for (let page = currentPage + 1; page <= totalPages; page++) {
            await fetchCloudInventoryData(subscription, page);
          }
          const groupedData = parseAndGroupByMonth(subscription);
          setTableData((prevTableData) => ({
            ...prevTableData,
            [subscription]: groupedData,
          }));
          setLoadedSubscriptions((prev) => ({
            ...prev,
            [subscription]: true,
          }));
        }
      }
    }
  };

  const parseAndGroupByMonth = (subscriptionName) => {
    const transformDataToArrayFormat = (data) => {
      const result = [];
      const allMonths = new Set();
      if (data) {
        // First pass: Collect all unique months
        for (const [subscription, categories] of Object.entries(data)) {
          if (subscription === subscriptionName) {
            for (const subCategories of Object.values(categories)) {
              for (const resourceGroups of Object.values(subCategories)) {
                for (const resources of Object.values(resourceGroups)) {
                  if (selectedCSP == 100) {
                    for (const resourceDetails of Object.values(resources)) {
                      const { Date: date } = resourceDetails;
                      const month = new Date(date).toISOString().slice(0, 7);
                      allMonths.add(month);
                    }
                  } else {
                    const { Date: date } = resources;
                    const month = new Date(date).toISOString().slice(0, 7);
                    allMonths.add(month);
                  }
                }
              }
            }
          }
        }

        // Second pass: Transform data into hierarchical array structure
        for (const [subscription, categories] of Object.entries(data)) {
          if (subscription === subscriptionName) {
            const subscriptionNode = {
              name: subscription,
              type: "subscription",
              children: [],
            };
            for (const [category, subCategories] of Object.entries(
              categories
            )) {
              const categoryNode = {
                name: category,
                type: "category",
                children: [],
              };

              for (const [subCategory, resourceGroups] of Object.entries(
                subCategories
              )) {
                const subCategoryNode = {
                  name: subCategory,
                  type: "subCategory",
                  children: [],
                };

                for (const [resourceGroupName, resources] of Object.entries(
                  resourceGroups
                )) {
                  const resourceGroupNode = {
                    name: resourceGroupName,
                    type: "resourceGroup",
                    children: [],
                  };

                  if (selectedCSP == 100) {
                    for (const [
                      resourceName,
                      resourceDetails,
                    ] of Object.entries(resources)) {
                      const resourceNode = {
                        name: resourceName,
                        type: "resource",
                        children: [],
                      };

                      // Extract the month data and ensure all months are present
                      const monthData = {};
                      for (const uniqueMonth of allMonths) {
                        monthData[uniqueMonth] = {
                          TotalBill: 0,
                          OnDemandCost: 0,
                          CommitmentsCost: 0,
                          Savings: 0,
                        };
                      }

                      const {
                        Date: date,
                        TotalBill,
                        OnDemandCost,
                        CommitmentsCost,
                        Savings,
                      } = resourceDetails;
                      const month = new Date(date).toISOString().slice(0, 7);
                      monthData[month] = {
                        TotalBill,
                        OnDemandCost,
                        CommitmentsCost,
                        Savings,
                      };

                      // Convert month data into an array for the resource
                      for (const [monthName, monthDetails] of Object.entries(
                        monthData
                      )) {
                        resourceNode.children.push({
                          name: monthName,
                          type: "month",
                          ...monthDetails,
                        });
                      }
                      resourceGroupNode.children.push(resourceNode);
                    }
                  } else {
                    const resourceNode = {
                      name: resourceGroupName,
                      type: "resource",
                      children: [],
                    };

                    // Extract the month data and ensure all months are present
                    const monthData = {};
                    for (const uniqueMonth of allMonths) {
                      monthData[uniqueMonth] = {
                        TotalBill: 0,
                        OnDemandCost: 0,
                        CommitmentsCost: 0,
                        Savings: 0,
                      };
                    }

                    const {
                      Date: date,
                      TotalBill,
                      OnDemandCost,
                      CommitmentsCost,
                      Savings,
                    } = resources;
                    const month = new Date(date).toISOString().slice(0, 7);
                    monthData[month] = {
                      TotalBill,
                      OnDemandCost,
                      CommitmentsCost,
                      Savings,
                    };

                    // Convert month data into an array for the resource
                    for (const [monthName, monthDetails] of Object.entries(
                      monthData
                    )) {
                      resourceNode.children.push({
                        name: monthName,
                        type: "month",
                        ...monthDetails,
                      });
                    }
                    resourceGroupNode.children.push(resourceNode);
                  }

                  subCategoryNode.children.push(resourceGroupNode);
                }

                categoryNode.children.push(subCategoryNode);
              }

              subscriptionNode.children.push(categoryNode);
            }
            result.push(subscriptionNode);
          }
        }
      }
      return result;
    };
    const transformedData = transformDataToArrayFormat(window.apiData);
    const extractMonths = (data) => {
      let months = [];
      data.forEach((item) => {
        if (item.children) {
          months = months.concat(extractMonths(item.children));
        }
        if (item.type === "month" && item.name) {
          months.push(item.name);
        }
      });
      return months;
    };

    // Extract unique months
    const months = Array.from(new Set(extractMonths(transformedData)));
    months.sort((a, b) => new Date(a) - new Date(b));
    // Update formattedMonths only if new months are added
    setUniqueMonths((prevMonths) => {
      const newMonths = Array.from(new Set([...prevMonths, ...months]));
      return newMonths;
    });
    // setUniqueMonths(months);
    function formatMonthYear(dateString) {
      const date = new Date(dateString);
      const options = { year: "numeric", month: "long" }; // e.g., "January-2024"
      return date.toLocaleDateString("en-US", options).replace(" ", "-");
    }

    // Sort the dates in ascending order
    const sortedMonths = months.sort((a, b) => new Date(a) - new Date(b));

    // Map the sorted array to the new format
    const formattedMonths = sortedMonths.map(formatMonthYear);
    // setFormattedMonths(formattedMonths);
    // Update formattedMonths state
    setFormattedMonths((prevFormattedMonths) => {
      const newFormattedMonths = Array.from(
        new Set([...prevFormattedMonths, ...formattedMonths])
      );
      return newFormattedMonths;
    });
    return transformedData;
  };
  const fetchCloudInventoryData = async (subscriptionName, page) => {
    try {
      setFetchingPage(page); // Track the page being fetched
      console.log(
        `Fetching data for subscription: ${subscriptionName}, page: ${page}`
      ); // Debug log
      const rawData = await api.getCloudInventory(
        subscriptionName,
        page,
        selectedCSP,
        billingMonth
      );
      window.apiData[subscriptionName] = appendData(
        window.apiData[subscriptionName] || {},
        rawData[subscriptionName]
      );
      setPageState((prev) => ({ ...prev, [subscriptionName]: page }));
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
  };

  const appendData = (originalData, newData) => {
    const mergedData = { ...originalData };
    const recursiveMerge = (orig, newData) => {
      try {
        for (const [key, value] of Object.entries(newData)) {
          if (orig[key] && typeof orig[key] === "object") {
            recursiveMerge(orig[key], value);
          } else {
            orig[key] = value;
          }
        }
      } catch (exception) {
        console.log("API Response seems empty");
      }
    };
    recursiveMerge(mergedData, newData);
    return mergedData;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (billingMonth.length == 0) {
          return;
        }
        setLoading(true);
        const countData = await api.getCloudInventoryCount();
        const subscriptions = [
          ...new Set(
            countData.map(
              (item) => item.subscriptionName || item.BillingAccountName
            )
          ),
        ];
        const pageState = {};
        const dataState = [];
        window.apiData = {};
        await Promise.all(
          subscriptions.map(async (subscription) => {
            const totalCount = countData
              .filter(
                (item) =>
                  item.subscriptionName === subscription ||
                  item.BillingAccountName === subscription
              )
              .reduce((sum, item) => sum + item.totalcount, 0);
            console.log(totalCount);
            pageState[subscription] = Math.ceil(totalCount / 1000);
            const rawData = await api.getCloudInventory(
              subscription,
              1,
              selectedCSP,
              billingMonth
            );
            window.apiData[subscription] = appendData(
              window.apiData[subscription] || {},
              rawData[subscription]
            );
            const transformedData = parseAndGroupByMonth(subscription);
            dataState[subscription] = transformedData;
          })
        );
        setTotalPagesState(pageState);

        setTotalPages(Math.max(...Object.values(pageState))); // Track total pages

        setTableData(dataState);
        console.log("new data", dataState);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCSP, billingMonth]);

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
            <ShareButton
              tableData={flattenedData}
              tableRef={tableRef}
              isHierarchical={true}
              className="cmpCostInv_Sharebutton"
              dataType="CostInventory"
            />
          </div>
        </div>
      </div>
      {loading ? (
        <div className="loading-container">
          <CircularProgress />
        </div>
      ) : (
        <TableContainer ref={tableRef} className="cmpCostInv_tableContainer">
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  rowSpan={2}
                  className="cmpCostInv_columnHeader_first_header"
                >
                  SubscriptionName
                </TableCell>
                {formattedMonths.map((month, index) => (
                  <TableCell
                    key={index}
                    colSpan={columns.length}
                    className="cmpCostInv_tableHeader"
                    style={{ fontWeight: "bold" }}
                  >
                    {month}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                {formattedMonths.map((month, index) =>
                  columns.map((col) => (
                    <TableCell key={col} className="cmpCostInv_columnHeader">
                      {col}
                    </TableCell>
                  ))
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Render nested levels */}
              {Object.entries(tableData).map(([subscriptionName, data]) => (
                <TableRowComponent
                  data={data || []}
                  level={0}
                  toggleRow={toggleRow}
                  expandedRows={expandedRows}
                  rowKey={subscriptionName}
                  indentIncrement={20}
                  selectedColumns={columns}
                  uniqueMonths={uniqueMonths}
                  selectedCSP={selectedCSP}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        {fetchingPage > 0 && totalPages > 0 && (
          <p>
            Fetching {fetchingPage} of {totalPages} pages...
          </p>
        )}
      </div>
    </Box>
  );
};

export default CostInventory;
