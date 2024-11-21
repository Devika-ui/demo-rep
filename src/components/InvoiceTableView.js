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
  headerLabels,
  headerClass,
  overlayHeight,
}) => {
  const [isOverlayOpen, setOverlayOpen] = useState(false);

  const handleOverlayOpen = () => {
    setOverlayOpen(true);
  };

  const handleOverlayClose = () => {
    setOverlayOpen(false);
  };
  const tableRef = useRef(null); // Create a separate ref for the table

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
              <TableRow className="cmpInvTv_stickyFirstRow">
                {headerLabels.flatMap((_, labelIndex) =>
                  columns.map((column, colIndex) => (
                    <TableCell
                      key={`${labelIndex}-${colIndex}`}
                      className={`$"cmpInvTv_tableHeadCell} $"cmpInvTv_stickyHeader}`}
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
                  {headerLabels.flatMap((_, labelIndex) =>
                    columns.map((column, colIndex) => (
                      <TableCell
                        key={`${labelIndex}-${colIndex}`}
                        className="cmpInvTv_tableCell"
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
                          className={`$"cmpInvTv_tableHeadCell} $"cmpInvTv_stickyHeader}`}
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
                      {headerLabels.flatMap((_, labelIndex) =>
                        columns.map((column, colIndex) => (
                          <TableCell
                            key={`${labelIndex}-${colIndex}`}
                            className="cmpInvTv_tableCell"
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
  dropdown: PropTypes.element,
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  tableHeight: PropTypes.string,
  tableWidth: PropTypes.string,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  headerLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  headerClass: PropTypes.string,
};

InvoiceTableView.defaultProps = {
  tableHeight: "auto",
  tableWidth: "100%",
  headerLabels: ["April - 24"],
};

InvoiceTableView.defaultProps = {
  overlayHeight: "82vh", // Default height for overlay
};

export default InvoiceTableView;
