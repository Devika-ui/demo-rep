import React, { useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Box from "@mui/material/Box";
import "../css/components/TableforOrphaned.css"
const orphanedData = [
  {
    name: "Subscription 1",
    totalCost: "$1000",
    countOfDisks: 50,
    environment: "Production",
    children: [
      {
        name: "Storage",
        totalCost: "$500",
        countOfDisks: 30,
        environment: "Production",
        children: [
          {
            name: "Premium LRS",
            totalCost: "$300",
            countOfDisks: 20,
            environment: "Production",
            children: [
              {
                name: "Resource Group 1",
                totalCost: "$200",
                countOfDisks: 10,
                environment: "Production",
                children: [
                  {
                    name: "Resource 1",
                    totalCost: "$100",
                    countOfDisks: 5,
                    environment: "Production",
                  },
                  {
                    name: "Resource 2",
                    totalCost: "$100",
                    countOfDisks: 5,
                    environment: "Production",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  // Add more data here as needed
  {
    name: "Subscription 2",
    totalCost: "$1500",
    countOfDisks: 70,
    environment: "Development",
    children: [
      {
        name: "Storage",
        totalCost: "$800",
        countOfDisks: 40,
        environment: "Development",
        children: [
          {
            name: "Standard LRS",
            totalCost: "$400",
            countOfDisks: 25,
            environment: "Development",
            children: [
              {
                name: "Resource Group 2",
                totalCost: "$250",
                countOfDisks: 15,
                environment: "Development",
                children: [
                  {
                    name: "Resource 3",
                    totalCost: "$150",
                    countOfDisks: 8,
                    environment: "Development",
                  },
                  {
                    name: "Resource 4",
                    totalCost: "$100",
                    countOfDisks: 7,
                    environment: "Development",
                  },
                ],
              },
              {
                name: "Resource Group 3",
                totalCost: "$150",
                countOfDisks: 10,
                environment: "Development",
                children: [
                  {
                    name: "Resource 5",
                    totalCost: "$80",
                    countOfDisks: 5,
                    environment: "Development",
                  },
                  {
                    name: "Resource 6",
                    totalCost: "$70",
                    countOfDisks: 5,
                    environment: "Development",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

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
      {data.map((item, index) => (
        <React.Fragment key={`${rowKey}-${index}`}>
          <TableRow className="cmpTblOrphan_nestedRow">
            <TableCell
              style={{ paddingLeft: indentLevel }}
              className="cmpTblOrphan_cell"
            >
              {item.children ? (
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
              ) : null}
              {item.name}
            </TableCell>
            <TableCell className="cmpTblOrphan_cell">{item.totalCost}</TableCell>
            <TableCell className="cmpTblOrphan_cell">{item.countOfDisks}</TableCell>
            <TableCell className="cmpTblOrphan_cell">{item.environment}</TableCell>
          </TableRow>
          {expandedRows[rowKey]?.[index] && (
            <TableRowComponent
              data={item.children || []}
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

const TableforOrphaned = () => {
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

  const indentIncrement = 30;

  return (
    <div className="cmpTblOrphan_container">
      <div className="cmpTblOrphan_header">
        <h2 className="cmpTblOrphan_title">
          On-Demand Cost Allocation for Orphaned Snapshots
        </h2>
        <div className="cmpTblOrphan_buttons">
          <Button variant="contained" className="cmpTblOrphan_button" color="inherit">
            Customize Report
          </Button>
          <IconButton className="cmpTblOrphan_button">
            <ShareIcon />
          </IconButton>
        </div>
      </div>
      <Box className="cmpTblOrphan_tableContainer">
        <div className="cmpTblOrphan_tableHeader">April - 24</div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="cmpTblOrphan_columnHeader">
                  Application/Project Name
                </TableCell>
                <TableCell className="cmpTblOrphan_columnHeader">
                  Owner Name
                </TableCell>
                <TableCell className="cmpTblOrphan_columnHeader">
                  Total Cost
                </TableCell>
                <TableCell className="cmpTblOrphan_columnHeader">
                  Count of Disks
                </TableCell>
                <TableCell className="cmpTblOrphan_columnHeader">
                  Environment
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRowComponent
                data={orphanedData}
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

export default TableforOrphaned;
