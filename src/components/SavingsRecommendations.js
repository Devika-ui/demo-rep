import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ShareIcon from "@mui/icons-material/Share";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import CloseIcon from "@mui/icons-material/Close";
import api from "../api";
import "../css/components/SavingsRecommendations.css";

const SavingsRecommendations = () => {
  const [data, setData] = useState({});
  const [expandedAccounts, setExpandedAccounts] = useState({});
  const [isOverlayOpen, setOverlayOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getadvisorApplications();
        setData(response || {});
      } catch (error) {
        console.error("Error fetching data:", error);
        setData({});
      }
    };
    fetchData();
  }, []);

  const toggleExpand = (account) => {
    setExpandedAccounts((prev) => ({
      ...prev,
      [account]: !prev[account],
    }));
  };

  return (
    <>
      {/* Main Container */}
      <Paper className="savings-container">
        <Typography variant="h6" className="savings-title">
          Estimated Savings for Recommendations
        </Typography>

        {/* Buttons Section */}
        <div className="cmpSR_buttons">
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
            onClick={() => setOverlayOpen(true)}
            className="cmpSR_fullscreenButton"
          >
            <FullscreenIcon />
          </IconButton>
        </div>

        <TableContainer className="CmpSrtable_container">
          <Table stickyHeader sx={{ tableLayout: "fixed" }}>
            <TableHead>
              <TableRow className="table-header">
                <TableCell className="table-header-cell">Account</TableCell>
                <TableCell className="table-header-cell">
                  Estimated Savings ($)
                </TableCell>
                <TableCell className="table-header-cell">Name</TableCell>
                <TableCell className="table-header-cell">Solution</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(data).map((account) => {
                const services = data[account] || {};
                const totalSavings = Object.values(services).reduce(
                  (sum, service) => sum + (service.Estimatedsavings || 0),
                  0
                );

                return (
                  <React.Fragment key={account}>
                    {/* Account Row */}
                    <TableRow className="account-row">
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => toggleExpand(account)}
                        >
                          {expandedAccounts[account] ? (
                            <ExpandLessIcon />
                          ) : (
                            <ExpandMoreIcon />
                          )}
                        </IconButton>
                        <b className="account-name">{account}</b>
                      </TableCell>
                      <TableCell>
                        <b style={{ color: "#5F249F" }}>
                          ${totalSavings.toFixed(2)}
                        </b>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>

                    {/* Service Rows */}
                    {expandedAccounts[account] &&
                      Object.keys(services).map((service) => {
                        const serviceData = services[service] || {};
                        return (
                          <TableRow key={service} className="service-row">
                            <TableCell className="service-cell">
                              {service}
                            </TableCell>
                            <TableCell className="service-cell">
                              ${(serviceData.Estimatedsavings || 0).toFixed(2)}
                            </TableCell>
                            <TableCell className="service-cell">
                              {serviceData.name || "N/A"}
                            </TableCell>
                            <TableCell className="service-cell">
                              {serviceData.description || "N/A"}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Fullscreen Overlay */}
      {isOverlayOpen && (
        <div className="overlay overlay-mode">
          <div className="service_overlay_content">
            <IconButton
              className="close-overlay"
              onClick={() => setOverlayOpen(false)}
            >
              <CloseIcon />
            </IconButton>
            <TableContainer className="CmpSrtable_container2">
              <Table stickyHeader sx={{ tableLayout: "fixed" }}>
                <TableHead>
                  <TableRow className="table-header">
                    <TableCell className="table-header-cell">Account</TableCell>
                    <TableCell className="table-header-cell">
                      Estimated Savings ($)
                    </TableCell>
                    <TableCell className="table-header-cell">Name</TableCell>
                    <TableCell className="table-header-cell">
                      Solution
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(data).map((account) => {
                    const services = data[account] || {};
                    const totalSavings = Object.values(services).reduce(
                      (sum, service) => sum + (service.Estimatedsavings || 0),
                      0
                    );

                    return (
                      <React.Fragment key={account}>
                        <TableRow className="account-row">
                          <TableCell>
                            <IconButton
                              size="small"
                              onClick={() => toggleExpand(account)}
                            >
                              {expandedAccounts[account] ? (
                                <ExpandLessIcon />
                              ) : (
                                <ExpandMoreIcon />
                              )}
                            </IconButton>
                            <b className="account-name">{account}</b>
                          </TableCell>
                          <TableCell>
                            <b style={{ color: "#5F249F" }}>
                              ${totalSavings.toFixed(2)}
                            </b>
                          </TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                        {expandedAccounts[account] &&
                          Object.keys(services).map((service) => {
                            const serviceData = services[service] || {};
                            return (
                              <TableRow key={service} className="service-row">
                                <TableCell className="service-cell">
                                  {service}
                                </TableCell>
                                <TableCell className="service-cell">
                                  $
                                  {(serviceData.Estimatedsavings || 0).toFixed(
                                    2
                                  )}
                                </TableCell>
                                <TableCell className="service-cell">
                                  {serviceData.name || "N/A"}
                                </TableCell>
                                <TableCell className="service-cell">
                                  {serviceData.description || "N/A"}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </React.Fragment>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default SavingsRecommendations;
