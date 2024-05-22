import React, { useState } from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  container: {
    width: 580, // Fixed width
    height: 695, // Fixed height
    backgroundColor: 'white',
    padding: 10, // Adjusted padding
    border: '1px solid #ddd',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'auto', // Add overflow to handle content
  },
  header: {
    display: 'flex',
    flexDirection: 'column', // Use column direction to stack title and buttons
    marginBottom: 10, // Add margin between header and table
  },
  title: {
    fontFamily: 'Inter, sans-serif', // Font family
    fontSize: '16px', // Font size
    fontWeight: 700, // Font weight
    lineHeight: '19.36px', // Line height
    textAlign: 'left', // Text align
    color: '#63666A', // Text color
    marginBottom: 8, // Add some space between title and buttons
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end', // Move buttons to the right
    gap: 10,
  },
  button: {
    fontSize: '0.7rem', // Reduce font size
    padding: '4px 8px', // Reduce padding
    color: '#63666A', // Button text color
    borderColor: '#63666A', // Button border color
  },
  tableContainer: {
    border: '1px solid #ddd', // Border around the table
    borderRadius: '0', // Rounded corners
    overflow: 'hidden', // Prevent overflow
  },
  tableHeader: {
    padding: '4px 8px', // Padding inside the box
    textAlign: 'center',
    color: '#63666A', // Text color
  },
  table: {
    tableLayout: 'fixed', // Fixed table layout
  },
  nestedRow: {
    backgroundColor: '#f9f9f9',
  },
  cell: {
    padding: '4px 8px', // Reduce padding
    overflow: 'hidden',
    textAlign: 'center', // Center-align text
    color: '#63666A', // Text color
  },
  columnHeader: {
    textAlign: 'center',
    padding: '4px 8px', // Reduce padding
    color: '#63666A', // Text color
    borderBottom: '2px solid #63666A', // Thicker bottom border
  },
  indentedCell: {
    fontSize: '0.8rem', // Adjusted font size
  },
  
});

const dummyData = [
    {
      name: 'Virtual Machine',
      totalBill: '$400',
      onDemandCost: '$100',
      commitmentsCost: '$200',
      savings: '$50',
      services: [
        {
          name: 'VM1',
          totalBill: '$200',
          onDemandCost: '$50',
          commitmentsCost: '$100',
          savings: '$25',
          resourceGroups: [
            {
              name: 'RG1',
              totalBill: '$100',
              onDemandCost: '$25',
              commitmentsCost: '$50',
              savings: '$12.5',
              resources: [
                {
                  name: 'VM1-Resource1',
                  totalBill: '$50',
                  onDemandCost: '$12.5',
                  commitmentsCost: '$25',
                  savings: '$6.25',
                },
                {
                  name: 'VM1-Resource2',
                  totalBill: '$50',
                  onDemandCost: '$12.5',
                  commitmentsCost: '$25',
                  savings: '$6.25',
                },
              ],
            },
            {
              name: 'RG2',
              totalBill: '$100',
              onDemandCost: '$25',
              commitmentsCost: '$50',
              savings: '$12.5',
              resources: [
                {
                  name: 'VM2-Resource1',
                  totalBill: '$50',
                  onDemandCost: '$12.5',
                  commitmentsCost: '$25',
                  savings: '$6.25',
                },
                {
                  name: 'VM2-Resource2',
                  totalBill: '$50',
                  onDemandCost: '$12.5',
                  commitmentsCost: '$25',
                  savings: '$6.25',
                },
              ],
            },
          ],
        },
        {
          name: 'VM2',
          totalBill: '$200',
          onDemandCost: '$50',
          commitmentsCost: '$100',
          savings: '$25',
          resourceGroups: [
            {
              name: 'RG3',
              totalBill: '$100',
              onDemandCost: '$25',
              commitmentsCost: '$50',
              savings: '$12.5',
              resources: [
                {
                  name: 'VM3-Resource1',
                  totalBill: '$50',
                  onDemandCost: '$12.5',
                  commitmentsCost: '$25',
                  savings: '$6.25',
                },
                {
                  name: 'VM3-Resource2',
                  totalBill: '$50',
                  onDemandCost: '$12.5',
                  commitmentsCost: '$25',
                  savings: '$6.25',
                },
              ],
            },
            {
              name: 'RG4',
              totalBill: '$100',
              onDemandCost: '$25',
              commitmentsCost: '$50',
              savings: '$12.5',
              resources: [
                {
                  name: 'VM4-Resource1',
                  totalBill: '$50',
                  onDemandCost: '$12.5',
                  commitmentsCost: '$25',
                  savings: '$6.25',
                },
                {
                  name: 'VM4-Resource2',
                  totalBill: '$50',
                  onDemandCost: '$12.5',
                  commitmentsCost: '$25',
                  savings: '$6.25',
                },
              ],
            },
          ],
        },
      ],
    },
    {
        name: 'Storage',
        totalBill: '$300',
        onDemandCost: '$120',
        commitmentsCost: '$180',
        savings: '$60',
        services: [
          {
            name: 'Storage1',
            totalBill: '$150',
            onDemandCost: '$60',
            commitmentsCost: '$90',
            savings: '$30',
            resourceGroups: [
              {
                name: 'RG5',
                totalBill: '$75',
                onDemandCost: '$30',
                commitmentsCost: '$45',
                savings: '$15',
                resources: [
                  {
                    name: 'Storage1-Resource1',
                    totalBill: '$37.5',
                    onDemandCost: '$15',
                    commitmentsCost: '$22.5',
                    savings: '$7.5',
                  },
                  {
                    name: 'Storage1-Resource2',
                    totalBill: '$37.5',
                    onDemandCost: '$15',
                    commitmentsCost: '$22.5',
                    savings: '$7.5',
                  },
                ],
              },
              {
                name: 'RG6',
                totalBill: '$75',
                onDemandCost: '$30',
                commitmentsCost: '$45',
                savings: '$15',
                resources: [
                  {
                    name: 'Storage2-Resource1',
                    totalBill: '$37.5',
                    onDemandCost: '$15',
                    commitmentsCost: '$22.5',
                    savings: '$7.5',
                  },
                  {
                    name: 'Storage2-Resource2',
                    totalBill: '$37.5',
                    onDemandCost: '$15',
                    commitmentsCost: '$22.5',
                    savings: '$7.5',
                  },
                ],
              },
            ],
          },
          {
            name: 'Storage2',
            totalBill: '$150',
            onDemandCost: '$60',
            commitmentsCost: '$90',
            savings: '$30',
            resourceGroups: [
              {
                name: 'RG7',
                totalBill: '$75',
                onDemandCost: '$30',
                commitmentsCost: '$45',
                savings: '$15',
                resources: [
                  {
                    name: 'Storage3-Resource1',
                    totalBill: '$37.5',
                    onDemandCost: '$15',
                    commitmentsCost: '$22.5',
                    savings: '$7.5',
                  },
                  {
                    name: 'Storage3-Resource2',
                    totalBill: '$37.5',
                    onDemandCost: '$15',
                    commitmentsCost: '$22.5',
                    savings: '$7.5',
                  },
                ],
              },
              {
                name: 'RG8',
                totalBill: '$75',
                onDemandCost: '$30',
                commitmentsCost: '$45',
                savings: '$15',
                resources: [
                  {
                    name: 'Storage4-Resource1',
                    totalBill: '$37.5',
                    onDemandCost: '$15',
                    commitmentsCost: '$22.5',
                    savings: '$7.5',
                  },
                  {
                    name: 'Storage4-Resource2',
                    totalBill: '$37.5',
                    onDemandCost: '$15',
                    commitmentsCost: '$22.5',
                    savings: '$7.5',
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

const TableRowComponent = ({ data, level, toggleRow, expandedRows, rowKey, indentIncrement }) => {
  const classes = useStyles();
  const indentLevel = level * indentIncrement;

  return (
    <>
      {data.map((item, index) => (
        <React.Fragment key={`${rowKey}-${index}`}>
          <TableRow className={classes.nestedRow}>
            <TableCell style={{ paddingLeft: indentLevel }} className={classes.tableCell}>
              {item.services || item.resourceGroups || item.resources ? (
                <IconButton size="small" onClick={() => toggleRow(rowKey, index)}>
                  {expandedRows[rowKey]?.[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              ) : null}
              {item.name}
            </TableCell>
            <TableCell className={classes.cell}>{item.totalBill}</TableCell>
            <TableCell className={classes.cell}>{item.onDemandCost}</TableCell>
            <TableCell className={classes.cell}>{item.commitmentsCost}</TableCell>
            <TableCell className={classes.cell}>{item.savings}</TableCell>
          </TableRow>
          {expandedRows[rowKey]?.[index] && (
            <TableRowComponent
              data={item.services || item.resourceGroups || item.resources || []}
              level={level + 1}
              toggleRow={toggleRow}
              expandedRows={expandedRows}
              rowKey={`${rowKey}-${index}`}
              indentIncrement={indentIncrement}
            />
          )}
        </React.Fragment>
      ))}
    </>
  );
};

const ServiceCategory = () => {
  const classes = useStyles();
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (rowKey, index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowKey]: {
        ...prev[rowKey],
        [index]: !prev[rowKey]?.[index],
      },
    }));
  };

  const indentIncrement = 30; // You can change this value to adjust the indentation

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h2 className={classes.title}>Service Category Cost Allocation</h2>
        <div className={classes.buttons}>
          
          <Button variant="contained" className={classes.button}>Customize Report</Button>
          <IconButton className={classes.button}>
            <ShareIcon />
          </IconButton>
        </div>
      </div>
      <Box className={classes.tableContainer}>
      <div className={classes.tableHeader}>April - 24</div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.columnHeader}>Service Category</TableCell>
              <TableCell className={classes.columnHeader}>Total Bill</TableCell>
              <TableCell className={classes.columnHeader}>On Demand Cost</TableCell>
              <TableCell className={classes.columnHeader}>Commitments Cost</TableCell>
              <TableCell className={classes.columnHeader}>Savings</TableCell>
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
      </Box>
    </div>
  );
};

export default ServiceCategory;

