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
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import CloseIcon from "@mui/icons-material/Close";
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

  // Helper function to format values to 2 decimal points
  const formatValueToTwoDecimals = (value) => {
    return parseFloat(value || 0).toFixed(2);
  };

  const aggregateMonthData = (month, item) => {
    const initialData = {
      TotalBill: 0,
      OnDemandCost: 0,
      CommitmentsCost: 0,
      Savings: 0,
    };

    const aggregateChildrenData = (children) => {
      return children.reduce(
        (acc, child) => {
          if (child.name === month && child.type === "month") {
            acc.TotalBill += child.TotalBill || 0;
            acc.OnDemandCost += child.OnDemandCost || 0;
            acc.CommitmentsCost += child.CommitmentsCost || 0;
            acc.Savings += child.Savings || 0;
          }
          if (child.children && child.children.length > 0) {
            const nestedData = aggregateChildrenData(child.children);
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

    return aggregateChildrenData(item?.children || []);
  };

  return (
    <>
      {data.map((item, index) => (
        <React.Fragment key={`${rowKey}-${index}`}>
          <TableRow className="cmpSvcCat_nestedRow">
            <TableCell
              style={{ paddingLeft: indentLevel, width: "200px  " }}
              className="cmpSvcCat_first_cell"
            >
              {level < 3 && hasNestedData(item) && (
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
                level === 3
                  ? item.children?.find(
                      (child) => child.name === month && child.type === "month"
                    ) || {}
                  : aggregateMonthData(month, item);

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
            level < 3 &&
            item.children &&
            item.children.length > 0 && (
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
            <Button
              variant="contained"
              className="cmpSvcCat_button"
              color="inherit"
            >
              Customize Report
            </Button>
            <IconButton className="cmpSvcCat_button">
              <ShareIcon />
            </IconButton>
            <IconButton
              onClick={handleOverlayOpen}
              className="cmpSvcCat_button"
            >
              <FullscreenIcon />
            </IconButton>
          </div>
        </div>
        {/* <div className="cmpSvcCat_tableHeader"></div> */}
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
                data={dummyData || []}
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
                    data={dummyData || []}
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
