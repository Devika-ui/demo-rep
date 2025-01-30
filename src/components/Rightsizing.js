import React, { useState, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { CircularProgress, Paper, Typography, Button } from "@mui/material";
import api from "../api";
import ShareIcon from "@mui/icons-material/Share";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import CloseIcon from "@mui/icons-material/Close";
import CostsAmortized from "./CostsAmortized";


const MAX_NODE_LEVEL = 3;

const RightsizingRecommendationsTableRow = ({
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
      {Object.entries(data).map(([key, value], index) => {
        const isNestedNode = typeof value === "object" && !Array.isArray(value);
        const isExpandable = isNestedNode && level < MAX_NODE_LEVEL;

        return (
          <React.Fragment key={`${rowKey}-${index}`}>
            <TableRow>
              <TableCell
                style={{ paddingLeft: indentLevel, color: "5f249f",fontWeight:"bold" }}
                className="cmpSvcCat_first_cell"
              >
                {isExpandable && (
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
                )}
                {key}
              </TableCell>
              {level === MAX_NODE_LEVEL ? (
                <>
                  <TableCell style={{color: "#5f249f"}}>{value.number_of_days_low_utilization || "-"}</TableCell>
                  <TableCell style={{color: "#5f249f"}}>{value["14_day_avg_network_io"] || "-"}</TableCell>
                  <TableCell style={{color: "#5f249f"}}>{value.Region || "-"}</TableCell>
                  <TableCell style={{color: "#5f249f"}}>{value.instance_type || "-"}</TableCell>
                  <TableCell style={{color: "#5f249f"}}>{value["14_day_avg_cpu_utilization"] || "-"}</TableCell>
                  <TableCell style={{color: "#5f249f"}}>{value.total_estimated_monthly_savings || "-"}</TableCell>
                </>
              ) : (
                <>
                  <TableCell colSpan={6}></TableCell>
                </>
              )}
            </TableRow>
            {expandedRows[rowKey]?.[index] && isExpandable && (
              <RightsizingRecommendationsTableRow
                data={value}
                level={level + 1}
                toggleRow={toggleRow}
                expandedRows={expandedRows}
                rowKey={`${rowKey}-${index}`}
                indentIncrement={indentIncrement}
              />
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

const RightsizingRecommendationsTable = ({ loading = false, height, width }) => {
  const [expandedRows, setExpandedRows] = useState({});
  const [formattedData, setFormattedData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [isOverlayOpen, setOverlayOpen] = useState(false);

  const toggleRow = (rowKey, index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowKey]: { ...prev[rowKey], [index]: !prev[rowKey]?.[index] },
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getRightsizingRecommendations();
        setFormattedData(response);
        setLoadingData(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoadingData(false);
      }
    };

    fetchData();
  }, []);

  const handleOverlayOpen = () => setOverlayOpen(true);
  const handleOverlayClose = () => setOverlayOpen(false);

  return (
    <>
      <Paper className="savings-container5" style={{  padding: "20px",width: "90.5%",marginLeft:"4rem",marginTop:"-1rem" }}>
        <Typography variant="h6" className="savings-title" >
          Estimated Savings for Right-sizing Recommendations
        </Typography>
        <div className="cmpSR_buttons">
          <CostsAmortized dialogPaperClass="cmpCostInv_dialogPaper" />
          <Button
            variant="contained"
            className="cmpSRCustomize_button"
            color="inherit"
          >
            Customize Report
          </Button>
          <IconButton className="cmpSR_Sharebutton">
            <ShareIcon />
          </IconButton>
          <IconButton
            onClick={handleOverlayOpen}
            className="cmpSR_fullscreenButton"
          >
            <FullscreenIcon />
          </IconButton>
        </div>

        <div style={{ height, width }}>
          {loadingData || loading ? (
            <div className="loading-container">
              <CircularProgress />
            </div>
          ) : (
            <TableContainer style={{ maxHeight: "400px", overflowY: "auto" }}>
              <Table stickyHeader>
                <TableHead >
                  <TableRow >
                    <TableCell>Resource Name</TableCell>
                    <TableCell>Low Utilization Days</TableCell>
                    <TableCell>Avg Network IO</TableCell>
                    <TableCell>Region</TableCell>
                    <TableCell>Instance Type</TableCell>
                    <TableCell>Avg CPU Utilization</TableCell>
                    <TableCell>Estimated Monthly Savings ($)</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <RightsizingRecommendationsTableRow
                    data={formattedData}
                    level={0}
                    toggleRow={toggleRow}
                    expandedRows={expandedRows}
                    rowKey="recommendation"
                    indentIncrement={30}
                  />
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </Paper>

      {isOverlayOpen && (
        <div className="overlay">
          <div className="service_overlay_content">
            <IconButton className="close-overlay" onClick={handleOverlayClose}>
              <CloseIcon />
            </IconButton>
            <TableContainer className="CmpSrtable_container2" style={{maxHeight:"440px"}}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Resource Name</TableCell>
                    <TableCell>Low Utilization Days</TableCell>
                    <TableCell>Avg Network IO</TableCell>
                    <TableCell>Region</TableCell>
                    <TableCell>Instance Type</TableCell>
                    <TableCell>Avg CPU Utilization</TableCell>
                    <TableCell>Estimated Monthly Savings ($)</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <RightsizingRecommendationsTableRow
                    data={formattedData}
                    level={0}
                    toggleRow={toggleRow}
                    expandedRows={expandedRows}
                    rowKey="recommendation"
                    indentIncrement={30}
                  />
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default RightsizingRecommendationsTable;