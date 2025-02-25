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
import Typography from "@mui/material/Typography";

import CircularProgress from "@mui/material/CircularProgress";

const TableRowComponent = ({
  data,
  level,
  toggleRow,
  expandedRows,
  rowKey,
  indentIncrement,
}) => {
  const indentLevel = level * indentIncrement;

  return (
    <>
      {data.map((item, index) => {
        // Identify child keys dynamically
        const childrenKeys = Object.keys(item).filter(
          (key) => typeof item[key] === "object" && item[key] !== null
        );
        const children =
          childrenKeys.length > 0
            ? childrenKeys.flatMap((key) => item[key])
            : null;

        // Aggregate totals for the current item if it has children
        const aggregatedCost = children
          ? children.reduce((sum, child) => sum + (child.totalCost || 0), 0)
          : item.totalCost || 0;

        const aggregatedDiskCount = children
          ? children.reduce((sum, child) => sum + (child.diskCount || 0), 0)
          : item.diskCount || 0;

        return (
          <React.Fragment key={`${rowKey}-${index}`}>
            <TableRow className="cmpSvcCat_nestedRow">
              {/* Expand/Collapse Button */}
              <TableCell
                style={{ paddingLeft: indentLevel, width: "200px" }}
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
                {item.name}
              </TableCell>

              {/* Other Columns - Display Aggregated Values */}
              <TableCell className="cmpSvcCat_cell">
                {item.ownername || " "}
              </TableCell>
              <TableCell className="cmpSvcCat_cell">
                {aggregatedCost.toFixed(2)}
              </TableCell>
              <TableCell className="cmpSvcCat_cell">
                {aggregatedDiskCount}
              </TableCell>
              <TableCell className="cmpSvcCat_cell">
                {item.environment || " "}
              </TableCell>
            </TableRow>

            {/* Render Children if Expanded */}
            {expandedRows[rowKey]?.[index] && children && (
              <TableRowComponent
                data={children}
                level={level + 1}
                toggleRow={toggleRow}
                expandedRows={expandedRows}
                rowKey={`${rowKey}-${index}`}
                indentIncrement={indentIncrement}
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
                {dropdown}
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
                        <TableCell key={key}>
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
                        <TableCell key={key}>
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
