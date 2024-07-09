import React from 'react';
import PropTypes from 'prop-types';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import "../css/components/InvoiceTableView.css"


const InvoiceTableView = ({
  title,
  dropdown,
  tableData,
  tableHeight,
  tableWidth,
  columns,
  headerLabels // new prop
}) => {

  const renderTableHead = () => (
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
        {headerLabels.flatMap((_, labelIndex) => (
          columns.map((column, colIndex) => (
            <TableCell key={`${labelIndex}-${colIndex}`} className={`$"cmpInvTv_tableHeadCell} $"cmpInvTv_stickyHeader}`}>
              {column.label}
            </TableCell>
          ))
        ))}
      </TableRow>
    </TableHead>
  );

  return (
    <div className="cmpInvTv_container" style={{ width: tableWidth, height: tableHeight }}>
      <div className="cmpInvTv_header">
        <h2 className="cmpInvTv_title">{title}</h2>
        <div>
          {dropdown}
          <IconButton className="cmpInvTv_button">
            <ShareIcon />
          </IconButton>
          <Button variant="contained" className="cmpInvTv_button" color="inherit">Customize Report</Button>
        </div>
      </div>
      <TableContainer className="cmpInvTv_tableContainer">
        <Table stickyHeader>
          {renderTableHead()}
          <TableBody>
            {tableData.map((row, rowIndex) => (
              <TableRow key={rowIndex} className="cmpInvTv_tableRow">
                {headerLabels.flatMap((_, labelIndex) => (
                  columns.map((column, colIndex) => (
                    <TableCell key={`${labelIndex}-${colIndex}`} className="cmpInvTv_tableCell">
                      {row[`${column.key}_${labelIndex}`]}
                    </TableCell>
                  ))
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

InvoiceTableView.propTypes = {
  title: PropTypes.string.isRequired,
  dropdown: PropTypes.element,
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  tableHeight: PropTypes.string,
  tableWidth: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  headerLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

InvoiceTableView.defaultProps = {
  tableHeight: 'auto',
  tableWidth: '94%',
  headerLabels: ['April - 24'],
};

export default InvoiceTableView;