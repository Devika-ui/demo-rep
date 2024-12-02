import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
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
import "../css/components/InvoiceTableView.css";

const InvoiceTableView = ({
  title,
  dropdown,
  tableData,
  tableHeight,
  tableWidth,
  columns,
  columnTitle,
  headerLabels,
  headerClass,
  overlayHeight,
  columnData,
}) => {
  const [isOverlayOpen, setOverlayOpen] = useState(false);

  const handleOverlayOpen = () => {
    setOverlayOpen(true);
  };

  const handleOverlayClose = () => {
    setOverlayOpen(false);
  };
  const tableRef = useRef(null);

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
            <Button
              variant="contained"
              className="cmpInvTv_customizeButton"
              color="inherit"
            >
              Customize Report
            </Button>
            <IconButton className="cmpInvTv_shareButton">
              <ShareIcon />
            </IconButton>
            <IconButton
              onClick={handleOverlayOpen}
              className="cmpInvTv_fullscreenButton"
            >
              <FullscreenIcon />
            </IconButton>
          </div>
        </div>
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
                      <div>{columnData[rowIndex] || "No Data Available"}</div>
                    ) : (
                      <span>No Data Available</span>
                    )}
                  </TableCell>
                  {headerLabels.flatMap((_, labelIndex) =>
                    columns.map((column, colIndex) => (
                      <TableCell
                        key={`${labelIndex}-${colIndex}`}
                        className={`cmpInvTv_tableCell ${
                          column.key === "ownerName" ? "cmpInvTv_smallColumn" : ""
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
                      Subscription Name
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
                          <div>
                            {columnData[rowIndex] || "No Data Available"}
                          </div>
                        ) : (
                          <span>No Data Available</span>
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
