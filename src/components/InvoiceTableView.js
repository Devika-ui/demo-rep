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
  headerLabel // new prop
}) => {


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
          <TableHead>
            <TableRow>
              <TableCell className="cmpInvTv_tableHeadCell cmpInvTv_stickyHeader" colSpan={columns.length}>
                {headerLabel} {/* using the new prop */}
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index} className={`$"cmpInvTv_tableHeadCell} $"cmpInvTv_stickyHeader}`}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={index} className="cmpInvTv_tableRow">
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex} className="cmpInvTv_tableCell">{row[column.key]}</TableCell>
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
  headerLabel: PropTypes.string // new prop type
};

InvoiceTableView.defaultProps = {
  tableHeight: 'auto',
  tableWidth: '94%',
  headerLabel: 'April - 24' // default value for the prop
};

export default InvoiceTableView;
