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

const useStyles = makeStyles({
  container: {
    width: 550, // Fixed width
    height: 684, // Fixed height
    backgroundColor: 'white',
    padding: 10, // Adjusted padding
    border: '1px solid #ddd',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'auto', // Add overflow to handle content
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: '1.5rem',
  },
  buttons: {
    display: 'flex',
    gap: 10,
  },
  button: {
    fontSize: '0.8rem',
    padding: '4px 8px', // Adjusted padding
  },
  nestedRow: {
    backgroundColor: '#f9f9f9',
  },
  tableCell: {
    padding: '4px 8px', // Reduced padding
    fontSize: '0.8rem', // Reduced font size
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
            <TableCell className={classes.tableCell}>{item.totalBill}</TableCell>
            <TableCell className={classes.tableCell}>{item.onDemandCost}</TableCell>
            <TableCell className={classes.tableCell}>{item.commitmentsCost}</TableCell>
            <TableCell className={classes.tableCell}>{item.savings}</TableCell>
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
        <h2 className={classes.title}>ServiceCategory</h2>
        <div className={classes.buttons}>
          <IconButton color="primary" className={classes.button}>
            <ShareIcon />
          </IconButton>
          <Button variant="contained" color="primary" className={classes.button}>
            Customize Report
          </Button>
        </div>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell}>Service Category</TableCell>
              <TableCell className={classes.tableCell}>Total Bill</TableCell>
              <TableCell className={classes.tableCell}>On Demand Cost</TableCell>
              <TableCell className={classes.tableCell}>Commitments Cost</TableCell>
              <TableCell className={classes.tableCell}>Savings</TableCell>
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
  );
};

export default ServiceCategory;

