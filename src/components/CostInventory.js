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
import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';
import { MultiSelect } from 'react-multi-select-component';
import CostsAmortized from './CostsAmortized'; // Import the new component

const useStyles = makeStyles({
  container: {
    width: 1120,
    height: 693,
    backgroundColor: 'white',
    padding: 10,
    border: '1px solid #ddd',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'auto',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 10,
    position: 'relative',
  },
  title: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '18px',
    fontWeight: 700,
    lineHeight: '19.36px',
    textAlign: 'left',
    color: '#63666A',
    marginTop: '2px',
    marginBottom: 8,
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  groupByContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  buttons: {
    display: 'flex',
    gap: 10,
  },
  button: {
    fontSize: '0.7rem',
    padding: '4px 8px',
    color: '#63666A',
    borderColor: '#63666A',
  },
  tableContainer: {
    border: '1px solid #ddd',
    borderRadius: '0',
    overflow: 'hidden',
  },
  tableHeader: {
    padding: '4px 8px',
    textAlign: 'center',
    color: '#63666A',
  },
  nestedRow: {
    backgroundColor: '#f9f9f9',
  },
  cell: {
    padding: '4px 8px',
    overflow: 'hidden',
    textAlign: 'center',
    color: '#63666A',
    borderRight: '1px solid #ddd', // Add right border for vertical lines
  },
  columnHeader: {
    textAlign: 'center',
    padding: '4px 8px',
    color: '#63666A',
    borderBottom: '2px solid #63666A',
  },
  columnHeaderNoBorder: {
    textAlign: 'center',
    padding: '4px 8px',
    color: '#63666A',
    borderBottom: 'none',
  },
  indentedCell: {
    fontSize: '0.8rem',
  },
  search: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: '348px',
    width: '477px',
    backgroundColor: '#D9D9D9',
    borderRadius: '7px',
    padding: '2px 4px',
    boxShadow: '0px 4px 4px 0px #00000040',
  },
  searchIcon: {
    padding: 4,
    color: '#63666A',
  },
  inputRoot: {
    marginLeft: 4,
    flex: 1,
  },
  inputInput: {
    padding: '4px 0',
    paddingLeft: 4,
  },
  groupByLabel: {
    fontFamily: 'Inter, sans-serif',
    color: '#63666A',
    fontWeight: 'bold',
    marginTop: '17px',
    marginLeft: '5px',
  },
  groupBySelect: {
    minWidth: 200,
    marginLeft: 8,
    marginTop: 17,
    color: '#63666A',
  },
  dialogPaper: {
    backgroundColor: '#D9D9D9',
    maxWidth: '280px',  // Set a maximum width
    top: '140px',
    left: '280px',
    marginBottom: '200px',
    padding: '20px',  // Add padding if needed
  },
});

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
  const classes = useStyles();
  const indentLevel = level * indentIncrement;

  return (
    <>
      {data.map((item, index) => (
        <React.Fragment key={`${rowKey}-${index}`}>
          <TableRow className={classes.nestedRow}>
            <TableCell style={{ paddingLeft: indentLevel }} className={`${classes.tableCell} ${classes.cell}`}>
              {item.services || item.resourceGroups || item.resources ? (
                <IconButton size="small" onClick={() => toggleRow(rowKey, index)}>
                  {expandedRows[rowKey]?.[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              ) : null}
              {item.name}
            </TableCell>
            {['april', 'may', 'june', 'july'].map(month => (
              <React.Fragment key={month}>
                <TableCell className={classes.cell}>{item[`${month}OnDemandCost`]}</TableCell>
                <TableCell className={classes.cell}>{item[`${month}Savings`]}</TableCell>
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
  const classes = useStyles();
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
    <div className={classes.container}>
      <div className={classes.header}>
        <h2 className={classes.title}>Cloud Inventory</h2>
        <div className={classes.buttonsContainer}>
          <div className={classes.groupByContainer}>
            <span className={classes.groupByLabel}>Group by:(max 5)</span>
            <MultiSelect
              options={groupByOptions}
              value={groupBy}
              onChange={setGroupBy}
              labelledBy="Select"
              className={classes.groupBySelect}
            />
          </div>
          <div className={classes.search}>
            <SearchIcon className={classes.searchIcon} />
            <InputBase
              placeholder="Search..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className={classes.buttons}>
            <CostsAmortized dialogPaperClass={classes.dialogPaper} />
            <Button variant="contained" className={classes.button}>Customize Report</Button>

            <IconButton className={classes.button}>
              <ShareIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <Box className={classes.tableContainer}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell rowSpan={2} className={classes.columnHeader}>Subscription Name</TableCell>
                <TableCell colSpan={2} className={classes.columnHeaderNoBorder}>April-24</TableCell>
                <TableCell colSpan={2} className={classes.columnHeaderNoBorder}>May-24</TableCell>
                <TableCell colSpan={2} className={classes.columnHeaderNoBorder}>June-24</TableCell>
                <TableCell colSpan={2} className={classes.columnHeaderNoBorder}>July-24</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.columnHeader}>On Demand Cost</TableCell>
                <TableCell className={classes.columnHeader}>Savings Plan</TableCell>
                <TableCell className={classes.columnHeader}>On Demand Cost</TableCell>
                <TableCell className={classes.columnHeader}>Savings Plan</TableCell>
                <TableCell className={classes.columnHeader}>On Demand Cost</TableCell>
                <TableCell className={classes.columnHeader}>Savings Plan</TableCell>
                <TableCell className={classes.columnHeader}>On Demand Cost</TableCell>
                <TableCell className={classes.columnHeader}>Savings Plan</TableCell>
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
