import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import CustomizedReportButton from "./CustomizedReportButton";
import ShareButton from "./ShareButton";
import IconButton from "@mui/material/IconButton";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import CloseIcon from "@mui/icons-material/Close";
import "../css/components/InvoiceTableView.css";
import { CircularProgress } from "@mui/material";

const InvoiceTableView = ({
  title,
  dropdown,
  tableData: initialTableData,
  tableHeight,
  tableWidth,
  columns,
  columnTitle,
  headerLabels,
  headerClass,
  overlayHeight,
  columnData,
  loading = false,
}) => {
  const [isOverlayOpen, setOverlayOpen] = useState(false);
  const [tableData, setTableData] = useState(initialTableData);
  const [sortState, setSortState] = useState({ field: null, direction: null });

  useEffect(() => {
    setTableData(initialTableData);
  }, [initialTableData]);

  const alwaysExcludedColumns = [
    "ownerName",
    "simulatedPayGoCost",
    "normalizedVariation",
    "rawVariation",
  ];

  const sortOptions = columns
    .filter((column) => !alwaysExcludedColumns.includes(column.key))
    .map((column) => ({
      label: column.label.replace(/\s\(\$\)/g, ""),
      value: column.key.replace(/\s\(\$\)/g, ""),
    }));

  const handleOverlayOpen = () => {
    setOverlayOpen(true);
  };

  const handleOverlayClose = () => {
    setOverlayOpen(false);
  };
  const tableRef = useRef(null);
  const isHierarchical = false;

  const handleSortData = (field, direction) => {
    const sortedData = [...tableData];

    sortedData.sort((a, b) => {
      const dynamicKeyA =
        Object.keys(a).find((key) => key.startsWith(field)) || "";
      const dynamicKeyB =
        Object.keys(b).find((key) => key.startsWith(field)) || "";

      const valueA = parseFloat(a[dynamicKeyA] ?? 0);
      const valueB = parseFloat(b[dynamicKeyB] ?? 0);

      if (direction === "asc") {
        return valueA - valueB;
      } else if (direction === "desc") {
        return valueB - valueA;
      }
      return 0;
    });
    setTableData(sortedData);
  };

  return (
    <>
      <div
        className="cmpInvTv_container"
        style={{ width: tableWidth, height: tableHeight }}
      >
        <div className={headerClass}>
          <h2 className="cmpInvTv_title">{title}</h2>
          <div>
            {dropdown}
            <CustomizedReportButton
              handleSortData={handleSortData}
              sortOptions={sortOptions}
              currentSort={sortState}
            />
            <ShareButton
              tableData={tableData}
              tableRef={tableRef}
              isHierarchical={isHierarchical}
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
          <TableContainer
            ref={tableRef}
            className="cmpInvTv_tableContainer"
            style={{
              backgroundColor: "#fff",
            }}
          >
            <Table id="mytable" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell
                    rowSpan={2}
                    className="cmpInvTv_stickyFirstRow1 cmpInvTv_stickyColumn"
                  >
                    {columnTitle}
                  </TableCell>
                  {headerLabels.map((label, labelIndex) => (
                    <TableCell
                      key={labelIndex}
                      className="cmpInvTv_tableHeadCell cmpInvTv_stickyHeader"
                      colSpan={columns.length}
                    >
                      {label}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  {headerLabels.flatMap((_, labelIndex) =>
                    columns.map((column, colIndex) => (
                      <TableCell
                        key={`${labelIndex}-${colIndex}`}
                        className="cmpInvTv_tableHeadCell"
                      >
                        {column.label}
                      </TableCell>
                    ))
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row, rowIndex) => (
                  <TableRow key={rowIndex} className="cmpInvTv_tableRow">
                    <TableCell className="cmpInvTv_tableCell cmpInvTv_stickyColumn">
                      {Array.isArray(columnData) && columnData.length > 0 ? (
                        <div>{columnData[rowIndex] || ""}</div>
                      ) : (
                        <span></span>
                      )}
                    </TableCell>
                    {headerLabels.flatMap((_, labelIndex) =>
                      columns.map((column, colIndex) => (
                        <TableCell
                          key={`${labelIndex}-${colIndex}`}
                          className={`cmpInvTv_tableCell ${
                            column.key === "ownerName"
                              ? "cmpInvTv_smallColumn"
                              : ""
                          }`}
                          title={
                            column.key === "ownerName"
                              ? row[`${column.key}_${labelIndex}`]
                              : ""
                          }
                        >
                          {row[`${column.key}_${labelIndex}`]}
                        </TableCell>
                      ))
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
      {isOverlayOpen && (
        <div className="overlay overlay-mode">
          <div className="overlay-content" style={{ height: overlayHeight }}>
            <IconButton className="close-overlay" onClick={handleOverlayClose}>
              <CloseIcon />
            </IconButton>
            <TableContainer className="cmpInvTv_tableContainer">
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell
                      rowSpan={2}
                      className="cmpInvTv_stickyFirstRow1 cmpInvTv_stickyColumn"
                    >
                      {columnTitle}
                    </TableCell>
                    {headerLabels.map((label, labelIndex) => (
                      <TableCell
                        key={labelIndex}
                        className="cmpInvTv_tableHeadCell cmpInvTv_stickyHeader"
                        colSpan={columns.length}
                      >
                        {label}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    {headerLabels.flatMap((_, labelIndex) =>
                      columns.map((column, colIndex) => (
                        <TableCell
                          key={`${labelIndex}-${colIndex}`}
                          className="cmpInvTv_tableHeadCell"
                        >
                          {column.label}
                        </TableCell>
                      ))
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row, rowIndex) => (
                    <TableRow key={rowIndex} className="cmpInvTv_tableRow">
                      <TableCell className="cmpInvTv_tableCell cmpInvTv_stickyColumn">
                        {Array.isArray(columnData) && columnData.length > 0 ? (
                          <div>{columnData[rowIndex] || " "}</div>
                        ) : (
                          <span> ""</span>
                        )}
                      </TableCell>
                      {headerLabels.flatMap((_, labelIndex) =>
                        columns.map((column, colIndex) => (
                          <TableCell
                            key={`${labelIndex}-${colIndex}`}
                            className={`cmpInvTv_tableCell ${
                              column.key === "ownerName"
                                ? "cmpInvTv_smallColumn"
                                : ""
                            }`}
                            title={
                              column.key === "ownerName"
                                ? row[`${column.key}_${labelIndex}`]
                                : ""
                            }
                          >
                            {row[`${column.key}_${labelIndex}`]}
                          </TableCell>
                        ))
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      )}
    </>
  );
};

InvoiceTableView.propTypes = {
  title: PropTypes.string.isRequired,
  dropdown: PropTypes.element.isRequired,
  tableData: PropTypes.array.isRequired,
  tableHeight: PropTypes.string,
  tableWidth: PropTypes.string,
  columns: PropTypes.array.isRequired,
  columnTitle: PropTypes.string,
  headerLabels: PropTypes.array,
  headerClass: PropTypes.string.isRequired,
  overlayHeight: PropTypes.string,
  columnData: PropTypes.array,
};

InvoiceTableView.defaultProps = {
  tableHeight: "auto",
  tableWidth: "100%",
  headerLabels: ["April - 24"],
  overlayHeight: "82vh",
};

export default InvoiceTableView;
