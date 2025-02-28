import React, { useState, useRef } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import "../css/components/ServiceCategory.css";
import ShareButton from "./ShareButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
 
const TableRowComponent = ({
  data,
  level,
  toggleRow,
  expandedRows,
  rowKey,
  indentIncrement,
  tableData,
}) => {
  console.log("table", data);
  const indentLevel = level * indentIncrement;
  const columns = Object.values(tableData[0]).filter((col) => col.key);
 
  const aggregateData = (data) => {
    return data.map((item) => {
      const childrenKeys = Object.keys(item).filter(
        (key) => typeof item[key] === "object" && item[key] !== null
      );
 
      const children =
        childrenKeys.length > 0
          ? childrenKeys.flatMap((key) => item[key])
          : null;
 
      if (children) {
        const aggregatedChildren = aggregateData(children);
 
        // Identify numeric fields dynamically
        const numericKeys = Object.keys(aggregatedChildren[0] || {}).filter(
          (key) => typeof aggregatedChildren[0][key] === "number"
        );
 
        const aggregatedValues = numericKeys.reduce((acc, key) => {
          acc[key] = aggregatedChildren.reduce(
            (sum, child) => sum + (child[key] || 0),
            0
          );
          return acc;
        }, {});
 
        return {
          ...item,
          ...aggregatedValues, // Add aggregated values
          children: aggregatedChildren, // Keep the processed children
        };
      }
 
      return item;
    });
  };
 
  const processedData = aggregateData(data);
 
  return (
    <>
      {processedData.map((item, index) => {
        const children = item.children || null;
 
        return (
          <React.Fragment key={`${rowKey}-${index}`}>
            <TableRow className="cmpSvcCat_nestedRow">
              {/* Display the name field in the first column */}
              <TableCell
                style={{ paddingLeft: indentLevel }}
                className="cmpSvcCat_first_cell"
              >
                {children && (
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
                {item.name || ""}
              </TableCell>
 
              {/* Render the remaining columns dynamically */}
              {columns.slice(1).map((col, colIndex) => (
                <TableCell key={colIndex} className="cmpSvcCat_cell">
                  {typeof item[col.key] === "number"
                    ? item[col.key].toFixed(2) // Format numbers properly
                    : item[col.key] ?? " "}
                </TableCell>
              ))}
            </TableRow>
 
            {/* Recursively render children if expanded */}
            {expandedRows[rowKey]?.[index] && children && (
              <TableRowComponent
                data={children}
                level={level + 1}
                toggleRow={toggleRow}
                expandedRows={expandedRows}
                rowKey={`${rowKey}-${index}`}
                indentIncrement={indentIncrement}
                tableData={tableData}
              />
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};
 
const CostAllocationTable = ({
  dropdown,
  dummyData,
  tableData,
  height,
  width,
  headerClass,
  marginTop,
  loading = false,
}) => {
  const tableRef = useRef(null);
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
      <div className="cmpInvTv_container" style={{ height, width }}>
        {loading ? (
          <div className="loading-container">
            <CircularProgress />
          </div>
        ) : (
          <>
            <div className={headerClass}>
              <Typography className="cmpPieChart_title">
                {tableData[0].tableTitle}
              </Typography>
 
              <div>
                <Button
                  variant="contained"
                  className="cmpUAMD_button"
                  color="inherit"
                >
                  Customize Report
                </Button>
                <ShareButton
                  tableData={dummyData}
                  tableRef={tableRef}
                  isHierarchical={true}
                />
                <IconButton
                  className="cmpInvTv_fullscreenButton"
                  onClick={handleOverlayOpen}
                >
                  <FullscreenIcon />
                </IconButton>
              </div>
            </div>
 
            <TableContainer
              ref={tableRef}
              style={{ marginTop }}
              className="cmpSvcCat_tableContainer"
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell className="cmpSvcCat_columnHeader_first_header">
                      {tableData[0].columnHead1.title}
                    </TableCell>
                    {Object.keys(tableData[0])
                      .filter(
                        (key) =>
                          key.startsWith("columnHead") && key !== "columnHead1"
                      )
                      .map((key) => (
                        <TableCell
                          className="cmpSvcCat_columnHeader1"
                          key={key}
                        >
                          {tableData[0][key].title}
                        </TableCell>
                      ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRowComponent
                    data={dummyData}
                    level={0}
                    toggleRow={toggleRow}
                    expandedRows={expandedRows}
                    rowKey="category"
                    indentIncrement={indentIncrement}
                    tableData={tableData}
                  />
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </div>
 
      {isOverlayOpen && (
        <div className="overlay overlay-mode">
          <div className="service_overlay_content">
            <IconButton className="close-overlay" onClick={handleOverlayClose}>
              <CloseIcon />
            </IconButton>
 
            <TableContainer ref={tableRef} className="cmpSvcCat_tableContainer">
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell className="cmpSvcCat_columnHeader_first_header">
                      {tableData[0].columnHead1.title}
                    </TableCell>
                    {Object.keys(tableData[0])
                      .filter(
                        (key) =>
                          key.startsWith("columnHead") && key !== "columnHead1"
                      )
                      .map((key) => (
                        <TableCell
                          className="cmpSvcCat_columnHeader1"
                          key={key}
                        >
                          {tableData[0][key].title}
                        </TableCell>
                      ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRowComponent
                    data={dummyData}
                    level={0}
                    toggleRow={toggleRow}
                    expandedRows={expandedRows}
                    rowKey="category"
                    indentIncrement={indentIncrement}
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
 
export default CostAllocationTable;