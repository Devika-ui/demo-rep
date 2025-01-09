import React, { useState, useEffect, useRef } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CustomizedReportButton from "./CustomizedReportButton";
import ShareButton from "./ShareButton";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import "../css/components/ServiceCategory.css";

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

  const hasNestedData = (item) =>
    Array.isArray(item?.children) && item.children.length > 0;

  const isResourceLevel = (item) =>
    !hasNestedData(item) || item.type === "resource"; // Assuming resource items have `type: "resource"`

  // Helper function to format values to 2 decimal points
  const formatValueToTwoDecimals = (value) => {
    return parseFloat(value || 0).toFixed(2);
  };

  // Dynamically aggregate data for each level
  const aggregateData = (month, item) => {
    const initialData = {
      TotalBill: 0,
      OnDemandCost: 0,
      CommitmentsCost: 0,
      Savings: 0,
    };

    const aggregateChildren = (children) => {
      return children.reduce(
        (acc, child) => {
          if (child.name === month && child.type === "month") {
            acc.TotalBill += child.TotalBill || 0;
            acc.OnDemandCost += child.OnDemandCost || 0;
            acc.CommitmentsCost += child.CommitmentsCost || 0;
            acc.Savings += child.Savings || 0;
          }
          if (child.children && child.children.length > 0) {
            const nestedData = aggregateChildren(child.children);
            acc.TotalBill += nestedData.TotalBill;
            acc.OnDemandCost += nestedData.OnDemandCost;
            acc.CommitmentsCost += nestedData.CommitmentsCost;
            acc.Savings += nestedData.Savings;
          }
          return acc;
        },
        { ...initialData }
      );
    };

    return aggregateChildren(item?.children || []);
  };

  return (
    <>
      {data.map((item, index) => (
        <React.Fragment key={`${rowKey}-${index}`}>
          <TableRow className="cmpSvcCat_nestedRow">
            <TableCell
              style={{ paddingLeft: indentLevel, width: "200px" }}
              className="cmpSvcCat_first_cell"
            >
              {/* Only show expand button if not at resource level */}
              {!isResourceLevel(item) && hasNestedData(item) && (
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
              {item.name}
            </TableCell>

            {uniqueMonths.map((month) => {
              const monthData =
                level === "leaf"
                  ? item.children?.find(
                      (child) => child.name === month && child.type === "month"
                    ) || {}
                  : aggregateData(month, item);

              return (
                <React.Fragment key={`${month}-${item.name}`}>
                  <TableCell className="cmpSvcCat_cell">
                    {formatValueToTwoDecimals(monthData.TotalBill || "0")}
                  </TableCell>
                  <TableCell className="cmpSvcCat_cell">
                    {formatValueToTwoDecimals(monthData.OnDemandCost || "0")}
                  </TableCell>
                  <TableCell className="cmpSvcCat_cell">
                    {formatValueToTwoDecimals(monthData.CommitmentsCost || "0")}
                  </TableCell>
                  <TableCell className="cmpSvcCat_cell">
                    {formatValueToTwoDecimals(monthData.Savings || "0")}
                  </TableCell>
                </React.Fragment>
              );
            })}
          </TableRow>

          {expandedRows[rowKey]?.[index] &&
            !isResourceLevel(item) &&
            hasNestedData(item) && (
              <TableRowComponent
                data={item.children}
                level={level + 1}
                toggleRow={toggleRow}
                expandedRows={expandedRows}
                rowKey={`${rowKey}-${index}`}
                indentIncrement={indentIncrement}
                uniqueMonths={uniqueMonths}
              />
            )}
        </React.Fragment>
      ))}
    </>
  );
};

const ServiceCategory = ({ dummyData, tableData, height, width }) => {
  const [uniqueMonths, setUniqueMonths] = useState([]);
  const [formattedMonths, setFormattedMonths] = useState([]);
  const [sortedData, setSortedData] = useState(dummyData); // Track sorted data
  const [currentSort, setCurrentSort] = useState({ field: "", direction: "" }); // Current sort state
  const [loading, setLoading] = useState(true);

  // Create a ref for the table element
  const tableRef = useRef(null);

  useEffect(() => {
    if (!dummyData?.length) {
      return;
    }
    setLoading(true);

    // Recursively extract 'name' field where 'type' is 'month'
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
    const months = Array.from(new Set(extractMonths(dummyData)));
    months.sort((a, b) => new Date(a) - new Date(b));
    setUniqueMonths(months);
    function formatMonthYear(dateString) {
      const date = new Date(dateString);
      const options = { year: "numeric", month: "long" }; // e.g., "January-2024"
      return date.toLocaleDateString("en-US", options).replace(" ", "-");
    }

    // Sort the dates in ascending order
    const sortedMonths = months.sort((a, b) => new Date(a) - new Date(b));

    // Map the sorted array to the new format
    const formattedMonths = sortedMonths.map(formatMonthYear);
    console.log(formattedMonths);
    setFormattedMonths(formattedMonths);

    setLoading(false);
  }, [dummyData]);

  useEffect(() => {
    // Reset sortedData to the original dummyData when the component mounts or is refreshed
    setSortedData(dummyData);
  }, [dummyData]); // This will run whenever dummyData changes

  const sortOptions = [
    { value: "TotalBill", label: "Total Bill" },
    { value: "OnDemandCost", label: "On-Demand Cost" },
    { value: "CommitmentsCost", label: "Commitments Cost" },
    { value: "Savings", label: "Savings" },
  ];

  const handleSortParentData = (field, direction) => {
    // Helper function to aggregate data recursively for a node
    const aggregateData = (node) => {
      if (!node.children || node.children.length === 0) {
        // Base case: no children, return node's own value, ensuring it has the expected properties
        return {
          ...node,
          aggregatedData: {
            TotalBill: node.TotalBill || 0,
            OnDemandCost: node.OnDemandCost || 0,
            CommitmentsCost: node.CommitmentsCost || 0,
            Savings: node.Savings || 0,
          },
        };
      }

      // Aggregate data for the current node
      const aggregated = node.children.reduce(
        (acc, child) => {
          const childData = aggregateData(child);
          acc.TotalBill += childData.aggregatedData?.TotalBill || 0;
          acc.OnDemandCost += childData.aggregatedData?.OnDemandCost || 0;
          acc.CommitmentsCost += childData.aggregatedData?.CommitmentsCost || 0;
          acc.Savings += childData.aggregatedData?.Savings || 0;
          return acc;
        },
        {
          TotalBill: 0,
          OnDemandCost: 0,
          CommitmentsCost: 0,
          Savings: 0,
        }
      );

      return {
        ...node,
        aggregatedData: aggregated, // Store aggregated data for sorting
      };
    };

    // Aggregate data for all parent nodes and their children
    const aggregatedData = dummyData.map(aggregateData);

    // Sort parents based on the aggregated data
    const sorted = [...aggregatedData].sort((a, b) => {
      const valueA = a.aggregatedData?.[field] || 0;
      const valueB = b.aggregatedData?.[field] || 0;

      if (direction === "asc") {
        return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
      } else {
        return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
      }
    });

    console.log("Sorted data", sorted);

    setSortedData(sorted); // Update state with sorted parent nodes
    setCurrentSort({ field, direction });
  };

  const headers = Object.keys(tableData[0]).filter((key) =>
    key.startsWith("columnHead")
  );
  console.log("headers", headers);
  const [expandedRows, setExpandedRows] = useState({});
  const [isOverlayOpen, setOverlayOpen] = useState(false);

  const toggleRow = (rowKey, index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowKey]: { ...prev[rowKey], [index]: !prev[rowKey]?.[index] },
    }));
  };

  const indentIncrement = 30;

  const handleOverlayOpen = () => setOverlayOpen(true);
  const handleOverlayClose = () => setOverlayOpen(false);

  return (
    <>
      <div className="cmpSvcCat_container" style={{ height, width }}>
        <div className="cmpSvcCat_header">
          <h2 className="cmpSvcCat_title">{tableData[0].tableTitle}</h2>
          <div className="cmpSvcCat_buttons">
            <CustomizedReportButton
              handleSortData={handleSortParentData}
              sortOptions={sortOptions}
              currentSort={currentSort}
              className="cmpSvcCat_button"
            />
            <ShareButton
              tableData={dummyData}
              tableRef={tableRef}
              isHierarchical={true}
              className="cmpSvcCat_button"
            />
            <IconButton
              onClick={handleOverlayOpen}
              className="cmpSvcCat_button"
            >
              <FullscreenIcon />
            </IconButton>
          </div>
        </div>
        {/* <div className="cmpSvcCat_tableHeader"></div> */}
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <TableContainer ref={tableRef} className="cmpSvcCat_tableContainer">
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell
                    rowSpan={2}
                    className="cmpSvcCat_columnHeader_first_header"
                  >
                    {tableData[0].columnHead1}
                  </TableCell>
                  {formattedMonths.map((month, index) => (
                    <TableCell
                      key={index}
                      colSpan={4} // Adjust this based on the number of replicated headers per month
                      className="cmpSvcCat_tableHeader"
                    >
                      {month}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  {uniqueMonths.flatMap((month, monthIndex) =>
                    headers.map((headerKey, index) => {
                      // Skip the 0th index for the second iteration (monthIndex > 0)
                      if (monthIndex >= 0 && index === 0) {
                        return null; // Skip rendering for this cell
                      }

                      return (
                        <TableCell
                          key={`${month}-${headerKey}-${index}`}
                          className="cmpSvcCat_columnHeader"
                        >
                          {tableData[0][headerKey]}
                        </TableCell>
                      );
                    })
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRowComponent
                  data={sortedData || []}
                  level={0}
                  toggleRow={toggleRow}
                  expandedRows={expandedRows}
                  rowKey="category"
                  indentIncrement={indentIncrement}
                  uniqueMonths={uniqueMonths}
                />
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>

      {isOverlayOpen && (
        <div className="overlay overlay-mode">
          <div className="service_overlay_content">
            <IconButton className="close-overlay" onClick={handleOverlayClose}>
              <CloseIcon />
            </IconButton>

            <TableContainer className="cmpSvcCat_tableContainer">
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell
                      rowSpan={2}
                      className="cmpSvcCat_columnHeader_first_header"
                    >
                      {tableData[0].columnHead1}
                    </TableCell>
                    {formattedMonths.map((month, index) => (
                      <TableCell
                        key={index}
                        colSpan={4}
                        className="cmpSvcCat_tableHeader"
                      >
                        {month}
                      </TableCell>
                    ))}
                  </TableRow>

                  <TableRow>
                    {uniqueMonths.flatMap((month, monthIndex) =>
                      headers.map((headerKey, index) => {
                        // Skip the 0th index for the second iteration (monthIndex > 0)
                        if (monthIndex >= 0 && index === 0) {
                          return null; // Skip rendering for this cell
                        }

                        return (
                          <TableCell
                            key={`${month}-${headerKey}-${index}`}
                            className="cmpSvcCat_columnHeader"
                          >
                            {tableData[0][headerKey]}
                          </TableCell>
                        );
                      })
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRowComponent
                    data={sortedData || []}
                    level={0}
                    toggleRow={toggleRow}
                    expandedRows={expandedRows}
                    rowKey="category"
                    indentIncrement={indentIncrement}
                    uniqueMonths={uniqueMonths}
                  />
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceCategory;
