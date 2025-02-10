import React, { useState, useEffect, useRef } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import "../css/components/ServiceCategory.css";
import { CircularProgress } from "@mui/material";
import ShareButton from "./ShareButton";
import CustomizedReportButton from "./CustomizedReportButton";

const TableRowComponent = ({
  data,
  level,
  toggleRow,
  expandedRows,
  rowKey,
  indentIncrement,
  uniqueMonths,
  tableData,
}) => {
  const indentLevel = level * indentIncrement;

  // Extract dynamic column keys
  const columnKeys = tableData.flatMap((item) =>
    Object.keys(item)
      .filter((key) => key.startsWith("columnHead") && key !== "columnHead1")
      .map((colKey) => item[colKey].key)
  );

  const isResourceLevel = (item) => item.type === "resource";

  const hasNestedData = (item) =>
    Array.isArray(item?.children) &&
    item.children.length > 0 &&
    item.type !== "resource"; // Prevent nested expansion for resource-level rows

  const formatValueToTwoDecimals = (value) => parseFloat(value || 0).toFixed(2);

  const aggregateDataByKeys = (item) => {
    const aggregatedData = uniqueMonths.reduce((acc, month) => {
      acc[month] = columnKeys.reduce((keyAcc, key) => {
        keyAcc[key] = 0;
        return keyAcc;
      }, {});
      return acc;
    }, {});

    const aggregateRecursive = (node) => {
      uniqueMonths.forEach((month) => {
        const monthData =
          node.children?.find(
            (child) => child.name === month && child.type === "month"
          ) || {};

        columnKeys.forEach((key) => {
          aggregatedData[month][key] += monthData[key] || 0;
        });
      });

      if (hasNestedData(node)) {
        node.children.forEach((child) => aggregateRecursive(child));
      }
    };

    aggregateRecursive(item);

    return aggregatedData;
  };

  return (
    <>
      {data.map((item, index) => {
        const aggregatedDataByMonth = aggregateDataByKeys(item);

        return (
          <React.Fragment key={`${rowKey}-${index}`}>
            <TableRow className="cmpSvcCat_nestedRow">
              <TableCell
                style={{ paddingLeft: indentLevel, width: "200px" }}
                className="cmpSvcCat_first_cell"
              >
                {/* Only show expand button if not resource level and has nested data */}
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
                  item.children?.find(
                    (child) => child.name === month && child.type === "month"
                  ) || {};
                const aggregatedData = aggregatedDataByMonth[month];

                return (
                  <React.Fragment key={`${month}-${item.name}`}>
                    {columnKeys.map((key, index) => (
                      <TableCell
                        key={`${month}-${key}`}
                        className="cmpSvcCat_cell"
                      >
                        {index === 0
                          ? monthData.tags_owner || null
                          : formatValueToTwoDecimals(aggregatedData[key])}
                      </TableCell>
                    ))}
                  </React.Fragment>
                );
              })}
            </TableRow>

            {!isResourceLevel(item) &&
              expandedRows[rowKey]?.[index] &&
              hasNestedData(item) && (
                <TableRowComponent
                  data={item.children}
                  level={level + 1}
                  toggleRow={toggleRow}
                  expandedRows={expandedRows}
                  rowKey={`${rowKey}-${index}`}
                  indentIncrement={indentIncrement}
                  uniqueMonths={uniqueMonths}
                  tableData={tableData}
                />
              )}
          </React.Fragment>
        );
      })}
    </>
  );
};

const TotalBillAllocationTable = ({
  dropdown,
  dummyData,
  tableData,
  height,
  width,
  headerClass,
  loading = false,
  sortOptions,
}) => {
  const [uniqueMonths, setUniqueMonths] = useState([]);
  const [formattedMonths, setFormattedMonths] = useState([]);
  const tableRef = useRef(null);
  const [sortedData, setSortedData] = useState(...dummyData);
  const [currentSort, setCurrentSort] = useState({ field: "", direction: "" });

  useEffect(() => {
    if (dummyData?.length) {
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
    }
  }, [dummyData]);

  const headers = Object.keys(tableData[0]).filter((key) =>
    key.startsWith("columnHead")
  );

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

  useEffect(() => {
    setSortedData(dummyData);
  }, [dummyData]);

  const handleSortData = (field, direction) => {
    const aggregateData = (node) => {
      if (!node.children || node.children.length === 0) {
        return {
          ...node,
          aggregatedData: {
            totalBill: node.totalBill || 0,
            onDemandCost: node.onDemandCost || 0,
            reservedInstanceCost: node.reservedInstanceCost || 0,
            savings: node.savings || 0,
          },
        };
      }

      const aggregated = node.children.reduce(
        (acc, child) => {
          const childData = aggregateData(child);
          acc.totalBill += childData.aggregatedData?.totalBill || 0;
          acc.onDemandCost += childData.aggregatedData?.onDemandCost || 0;
          acc.reservedInstanceCost +=
            childData.aggregatedData?.reservedInstanceCost || 0;
          acc.savings += childData.aggregatedData?.savings || 0;
          return acc;
        },
        {
          totalBill: 0,
          onDemandCost: 0,
          reservedInstanceCost: 0,
          savings: 0,
        }
      );

      return {
        ...node,
        aggregatedData: aggregated,
      };
    };
    const aggregatedData = dummyData.map(aggregateData);

    const sorted = [...aggregatedData].sort((a, b) => {
      const valueA = a.aggregatedData?.[field] || 0;
      const valueB = b.aggregatedData?.[field] || 0;

      if (direction === "asc") {
        return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
      } else {
        return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
      }
    });

    setSortedData(sorted);
    setCurrentSort({ field, direction });
  };

  return (
    <>
      <div className="cmpInvTv_container" style={{ height, width }}>
        <div className={headerClass}>
          <h2 className="cmpInvTv_title">{tableData[0].tableTitle}</h2>
          <div>
            {dropdown}

            <CustomizedReportButton
              handleSortData={handleSortData}
              sortOptions={sortOptions}
              currentSort={currentSort}
            />
            <ShareButton
              tableData={dummyData}
              tableRef={tableRef}
              isHierarchical={true}
              className="cmpInvTv_shareButton"
              dataType="TotalBillAllocation"
            />

            <IconButton
              onClick={handleOverlayOpen}
              className="cmpInvTv_fullscreenButton"
            >
              <FullscreenIcon />
            </IconButton>
          </div>
        </div>
        {loading ? (
          <div className="loading-container">
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
                    {tableData[0].columnHead1.title}
                  </TableCell>
                  {formattedMonths.map((month, index) => (
                    <TableCell
                      key={index}
                      colSpan={5} // Adjust this based on the number of replicated headers per month
                      className="cmpSvcCat_tableHeader"
                    >
                      {month}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  {uniqueMonths.flatMap((month, monthIndex) =>
                    Object.keys(tableData[0])
                      .filter((key) => key.startsWith("columnHead"))
                      .map((headerKey, index) => {
                        if (monthIndex >= 0 && index === 0) return null; // Skip rendering the first column repeatedly
                        const header = tableData[0][headerKey]; // Header object
                        return (
                          <TableCell
                            key={`${month}-${headerKey}-${index}`}
                            className="cmpSvcCat_columnHeader"
                          >
                            {header.title}
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
                  tableData={tableData}
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
                      {tableData[0].columnHead1.title}{" "}
                    </TableCell>
                    {formattedMonths.map((month, index) => (
                      <TableCell
                        key={index}
                        colSpan={5} // Adjust this based on the number of replicated headers per month
                        className="cmpSvcCat_tableHeader"
                      >
                        {month}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    {uniqueMonths.flatMap((month, monthIndex) =>
                      Object.keys(tableData[0])
                        .filter((key) => key.startsWith("columnHead"))
                        .map((headerKey, index) => {
                          if (monthIndex >= 0 && index === 0) return null; // Skip rendering the first column repeatedly
                          const header = tableData[0][headerKey]; // Header object
                          return (
                            <TableCell
                              key={`${month}-${headerKey}-${index}`}
                              className="cmpSvcCat_columnHeader"
                            >
                              {header.title}
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
                    tableData={tableData}
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

export default TotalBillAllocationTable;
