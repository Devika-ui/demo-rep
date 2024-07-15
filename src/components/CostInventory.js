import React, { useState, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import { MultiSelect } from "react-multi-select-component";
import CostsAmortized from "./CostsAmortized";
import "../css/components/CostInventory.css";
import api from "../api";

const TableRowComponent = ({
  data,
  level,
  toggleRow,
  expandedRows,
  rowKey,
  indentIncrement,
}) => {
  const indentLevel = level * indentIncrement;

  const calculateAggregates = (value) => {
    let aggregatedOnDemandCost = 0;
    let aggregatedSavings = 0;

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      for (const subValue of Object.values(value)) {
        if (subValue.OnDemandCost) {
          aggregatedOnDemandCost += parseFloat(subValue.OnDemandCost);
        }
        if (subValue.Savings) {
          aggregatedSavings += parseFloat(subValue.Savings);
        } else if (typeof subValue === "object") {
          const { onDemandCost, savings } = calculateAggregates(subValue);
          aggregatedOnDemandCost += onDemandCost;
          aggregatedSavings += savings;
        }
      }
    }
    return { onDemandCost: aggregatedOnDemandCost, savings: aggregatedSavings };
  };

  const renderRow = (key, value, index) => {
    const newKey = `${rowKey}-${index}`;
    const hasNestedData =
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value) &&
      !("Date" in value && "OnDemandCost" in value && "Savings" in value);

    const { onDemandCost: aggregatedOnDemandCost, savings: aggregatedSavings } =
      calculateAggregates(value);

    return (
      <React.Fragment key={newKey}>
        <TableRow className="cmpSvcCat_nestedRow">
          <TableCell
            style={{ paddingLeft: indentLevel }}
            className="cmpCostInv_tableCell "
          >
            {hasNestedData ? (
              <IconButton size="small" onClick={() => toggleRow(rowKey, index)}>
                {expandedRows[rowKey]?.[index] ? (
                  <ExpandLessIcon />
                ) : (
                  <ExpandMoreIcon />
                )}
              </IconButton>
            ) : null}
            {key}
          </TableCell>
          {typeof value === "object" &&
          value !== null &&
          !Array.isArray(value) ? (
            <>
              <TableCell className="cmpCostInv_cell">
                {hasNestedData
                  ? aggregatedOnDemandCost.toFixed(2)
                  : value.OnDemandCost}
              </TableCell>
              <TableCell className="cmpCostInv_cell">
                {hasNestedData ? aggregatedSavings.toFixed(2) : value.Savings}
              </TableCell>
            </>
          ) : (
            <>
              <TableCell className="cmpCostInv_cell" />
              <TableCell className="cmpCostInv_cell" />
            </>
          )}
        </TableRow>
        {expandedRows[rowKey]?.[index] && hasNestedData && (
          <TableRowComponent
            data={value}
            level={level + 1}
            toggleRow={toggleRow}
            expandedRows={expandedRows}
            rowKey={newKey}
            indentIncrement={indentIncrement}
          />
        )}
      </React.Fragment>
    );
  };

  return (
    <>
      {Object.entries(data).map(([key, value], index) =>
        renderRow(key, value, index)
      )}
    </>
  );
};
const Tory = () => {
  const [expandedRows, setExpandedRows] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [groupBy, setGroupBy] = useState([]);
  const [tableData1, setTableData1] = useState([]);
  const [tableData2, setTableData2] = useState([]);
  const [date, setDate] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleGroupByChange = (selectedOptions) => {
    setGroupBy(selectedOptions);
  };

  const toggleRow = (rowKey, index) => {
    setExpandedRows((prevExpandedRows) => {
      const newExpandedRows = { ...prevExpandedRows };
      if (!newExpandedRows[rowKey]) {
        newExpandedRows[rowKey] = {};
      }
      newExpandedRows[rowKey][index] = !newExpandedRows[rowKey][index];
      return newExpandedRows;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData1 = await api.getCloudInventory1();
        console.log(apiData1);
        setTableData1(apiData1);

        const apiData2 = await api.getCloudInventory2();
        console.log(apiData2);
        setTableData2(apiData2);

        const datesSet = new Set();
        const extractDates = (data) => {
          for (const key in data) {
            const value = data[key];
            if (typeof value === "object" && value !== null) {
              extractDates(value);
            } else if (key === "Date") {
              datesSet.add(value);
            }
          }
        };

        extractDates(apiData1);
        // Convert the set back to an array
        const uniqueDates = Array.from(datesSet);
        const formatMonthYear = (dateString) => {
          const date = new Date(dateString);
          const month = date.toLocaleString("default", { month: "long" });
          const year = date.getFullYear().toString().slice(-2);
          return `${month}-${year}`;
        };

        const formattedDates = uniqueDates.map(formatMonthYear);
        setDate(formattedDates);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box className="cmpCostInv_container">
      <div className="cmpCostInv_header">
        <h2 className="cmpCostInv_title">Cloud Inventory</h2>
        <Box className="cmpCostInv_search">
          <div className="cmpCostInv_searchIcon">
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search by resource group"
            classes={{
              root: "cmpCostInv_inputRoot",
              input: "cmpCostInv_inputInput",
            }}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Box>
        <div className="cmpCostInv_buttonsContainer">
          <div className="cmpCostInv_groupByContainer">
            <span className="cmpCostInv_groupByLabel">Group By</span>
            <MultiSelect
              className="cmpCostInv_groupBySelect"
              options={[
                { label: "Resource", value: "Resource" },
                { label: "Resource Group", value: "Resource Group" },
              ]}
              value={groupBy}
              onChange={handleGroupByChange}
              labelledBy="Select"
            />
          </div>

          <div className="cmpCostInv_buttons">
            <CostsAmortized dialogPaperClass="cmpCostInv_dialogPaper" />
            <Button
              variant="contained"
              className="cmpCostInv_button"
              color="inherit"
            >
              Customize Report
            </Button>
            <IconButton className="cmpCostInv_button">
              <ShareIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <TableContainer className="cmpCostInv_tableContainer">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="cmpCostInv_columnHeader" />
              <TableCell
                colSpan={2}
                className="cmpCostInv_columnHeaderNoBorder"
              >
                {date}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="cmpCostInv_columnHeader">
                Subsciption Name
              </TableCell>
              <TableCell className="cmpCostInv_columnHeader">
                On Demand
              </TableCell>
              <TableCell className="cmpCostInv_columnHeader">
                Savings Plan
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRowComponent
              data={tableData1}
              level={0}
              toggleRow={toggleRow}
              expandedRows={expandedRows}
              rowKey={"tableData1"}
              indentIncrement={20}
            />
            <TableRowComponent
              data={tableData2}
              level={0}
              toggleRow={toggleRow}
              expandedRows={expandedRows}
              rowKey={"tableData2"}
              indentIncrement={20}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Tory;
