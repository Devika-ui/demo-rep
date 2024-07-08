import React, { useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import { MultiSelect } from 'react-multi-select-component';
import CostsAmortized from './CostsAmortized'; // Import the new component
import "../css/components/CostInventory.css"

const dummyData = [
  {
    name: 'Subscription 1',
    aprilOnDemandCost: 3000,
    aprilSavings: 900,
    mayOnDemandCost: 3200,
    maySavings: 960,
    juneOnDemandCost: 3400,
    juneSavings: 1020,
    julyOnDemandCost: 3600,
    julySavings: 1080,
    services: [
      {
        name: 'Virtual Machine 1',
        aprilOnDemandCost: 1500,
        aprilSavings: 450,
        mayOnDemandCost: 1600,
        maySavings: 480,
        juneOnDemandCost: 1700,
        juneSavings: 510,
        julyOnDemandCost: 1800,
        julySavings: 540,
        resourceGroups: [
          {
            name: 'EV3 Series',
            aprilOnDemandCost: 800,
            aprilSavings: 240,
            mayOnDemandCost: 850,
            maySavings: 255,
            juneOnDemandCost: 900,
            juneSavings: 270,
            julyOnDemandCost: 950,
            julySavings: 285,
            resources: [
              {
                name: 'Resource Group 1',
                aprilOnDemandCost: 400,
                aprilSavings: 120,
                mayOnDemandCost: 420,
                maySavings: 126,
                juneOnDemandCost: 440,
                juneSavings: 132,
                julyOnDemandCost: 460,
                julySavings: 138,
              },
              {
                name: 'Resource Group 2',
                aprilOnDemandCost: 400,
                aprilSavings: 120,
                mayOnDemandCost: 430,
                maySavings: 129,
                juneOnDemandCost: 460,
                juneSavings: 138,
                julyOnDemandCost: 480,
                julySavings: 144,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Subscription 2',
    aprilOnDemandCost: 3000,
    aprilSavings: 900,
    mayOnDemandCost: 3200,
    maySavings: 960,
    juneOnDemandCost: 3400,
    juneSavings: 1020,
    julyOnDemandCost: 3600,
    julySavings: 1080,
    services: [
      {
        name: 'Virtual Machine 2',
        aprilOnDemandCost: 1500,
        aprilSavings: 450,
        mayOnDemandCost: 1600,
        maySavings: 480,
        juneOnDemandCost: 1700,
        juneSavings: 510,
        julyOnDemandCost: 1800,
        julySavings: 540,
        resourceGroups: [
          {
            name: 'EV4 Series',
            aprilOnDemandCost: 800,
            aprilSavings: 240,
            mayOnDemandCost: 850,
            maySavings: 255,
            juneOnDemandCost: 900,
            juneSavings: 270,
            julyOnDemandCost: 950,
            julySavings: 285,
            resources: [
              {
                name: 'Resource Group 3',
                aprilOnDemandCost: 400,
                aprilSavings: 120,
                mayOnDemandCost: 420,
                maySavings: 126,
                juneOnDemandCost: 440,
                juneSavings: 132,
                julyOnDemandCost: 460,
                julySavings: 138,
              },
              {
                name: 'Resource Group 4',
                aprilOnDemandCost: 400,
                aprilSavings: 120,
                mayOnDemandCost: 430,
                maySavings: 129,
                juneOnDemandCost: 460,
                juneSavings: 138,
                julyOnDemandCost: 480,
                julySavings: 144,
              },
            ],
          },
        ],
      },
    ],
  },
  // Add more subscriptions if needed
];

const TableRowComponent = ({ data, level, toggleRow, expandedRows, rowKey, indentIncrement }) => {
  
  const indentLevel = level * indentIncrement;

  return (
    <>
      {data.map((item, index) => (
        <React.Fragment key={`${rowKey}-${index}`}>
          <TableRow className="cmpCostInv_nestedRow">
            <TableCell style={{ paddingLeft: indentLevel }} className="cmpCostInv_tableCell cmpCostInv_cell">
              {item.services || item.resourceGroups || item.resources ? (
                <IconButton size="small" onClick={() => toggleRow(rowKey, index)}>
                  {expandedRows[rowKey]?.[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              ) : null}
              {item.name}
            </TableCell>
            {['april', 'may', 'june', 'july'].map(month => (
              <React.Fragment key={month}>
                <TableCell className="cmpCostInv_cell">{item[`${month}OnDemandCost`]}</TableCell>
                <TableCell className="cmpCostInv_cell">{item[`${month}Savings`]}</TableCell>
              </React.Fragment>
            ))}
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

const CostInventory = () => {

  const [expandedRows, setExpandedRows] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [groupBy, setGroupBy] = useState([]); // State for Group By dropdown

  const groupByOptions = [
    { label: "On Demand", value: "onDemand" },
    { label: "Savings Plan", value: "savingsPlan" },
    { label: "Reservation", value: "reservation" },
    { label: "Market Purchase", value: "marketPurchase" },
    { label: "Total Bill", value: "totalBill" },
  ];

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

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

  // Filtering data based on search query
  const filteredData = dummyData.filter(item => {
    const searchLower = searchQuery.toLowerCase();
    const searchInItems = (items) =>
      items.some(subItem => {
        const values = Object.values(subItem).join(' ').toLowerCase();
        return values.includes(searchLower) || (subItem.services && searchInItems(subItem.services)) || (subItem.resourceGroups && searchInItems(subItem.resourceGroups)) || (subItem.resources && searchInItems(subItem.resources));
      });
    return item.name.toLowerCase().includes(searchLower) || searchInItems(item.services || []);
  });

  return (
    <div className="cmpCostInv_container">
      <div className="cmpCostInv_header">
        <h2 className="cmpCostInv_title">Cloud Inventory</h2>
        <div className="cmpCostInv_buttonsContainer">
          <div className="cmpCostInv_groupByContainer">
            <span className="cmpCostInv_groupByLabel">Group by:(max 5)</span>
            <MultiSelect
              options={groupByOptions}
              value={groupBy}
              onChange={setGroupBy}
              labelledBy="Select"
              className="cmpCostInv_groupBySelect"
            />
          </div>
          <div className="cmpCostInv_search">
            <SearchIcon className="cmpCostInv_searchIcon" />
            <InputBase
              placeholder="Search..."
              classes={{
                root: "cmpCostInv_inputRoot",
                input: "cmpCostInv_inputInput",
              }}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="cmpCostInv_buttons">
            <CostsAmortized dialogPaperClass="cmpCostInv_dialogPaper" />
            <Button variant="contained" className="cmpCostInv_button" color="inherit">Customize Report</Button>

            <IconButton className="cmpCostInv_button">
              <ShareIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <Box className="cmpCostInv_tableContainer">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell rowSpan={2} className="cmpCostInv_columnHeader">Subscription Name</TableCell>
                <TableCell colSpan={2} className="cmpCostInv_columnHeaderNoBorder">April-24</TableCell>
                <TableCell colSpan={2} className="cmpCostInv_columnHeaderNoBorder">May-24</TableCell>
                <TableCell colSpan={2} className="cmpCostInv_columnHeaderNoBorder">June-24</TableCell>
                <TableCell colSpan={2} className="cmpCostInv_columnHeaderNoBorder">July-24</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="cmpCostInv_columnHeader">On Demand Cost</TableCell>
                <TableCell className="cmpCostInv_columnHeader">Savings Plan</TableCell>
                <TableCell className="cmpCostInv_columnHeader">On Demand Cost</TableCell>
                <TableCell className="cmpCostInv_columnHeader">Savings Plan</TableCell>
                <TableCell className="cmpCostInv_columnHeader">On Demand Cost</TableCell>
                <TableCell className="cmpCostInv_columnHeader">Savings Plan</TableCell>
                <TableCell className="cmpCostInv_columnHeader">On Demand Cost</TableCell>
                <TableCell className="cmpCostInv_columnHeader">Savings Plan</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRowComponent
                data={filteredData}
                level={0}
                toggleRow={toggleRow}
                expandedRows={expandedRows}
                rowKey="root"
                indentIncrement={indentIncrement}
              />
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default CostInventory;
