import React, { useState, useEffect } from "react";
import { Menu, MenuItem, Button } from "@mui/material";
import api from "../api.js";
import "../css/components/DateRangeDropdown.css";
import componentUtil from "../componentUtil.js";

const DateRangeDropdown = ({ selectedCSP, onBillingMonthsChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [billingPeriod, setBillingPeriod] = useState([]);

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const data1 = await api.getAssignedCustomerIds();
        const cspid = componentUtil.getSelectedCSP();

        const billingPeriods = data1[0].dataMonths
          .filter((item) => item.csp_id === cspid)
          .map((item) => {
            const date = new Date(item.billingPeriod);
            return date.toISOString().split("T")[0];
          });

        const formattedBillingPeriods = billingPeriods.map((date) => {
          const options = { year: "numeric", month: "long" };
          return new Date(date).toLocaleDateString("en-US", options);
        });

        setBillingPeriod(formattedBillingPeriods);

        // Set selectedMonths by default to all billing periods
        setSelectedMonths(formattedBillingPeriods);
      } catch (error) {
        console.error("Error fetching dates:", error);
      }
    };

    fetchDates();
  }, [selectedCSP]);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleMonth = (billingPeriod) => {
    setSelectedMonths((prevSelectedMonths) => {
      if (
        prevSelectedMonths.length === 1 &&
        prevSelectedMonths.includes(billingPeriod)
      ) {
        return prevSelectedMonths;
      }
      if (prevSelectedMonths.includes(billingPeriod)) {
        return prevSelectedMonths.filter(
          (selectedMonth) => selectedMonth !== billingPeriod
        );
      } else {
        return [...prevSelectedMonths, billingPeriod];
      }
    });
  };

  useEffect(() => {
    if (onBillingMonthsChange) {
      // onBillingMonthsChange(selectedMonths);

      const modifiedMonths = selectedMonths.map((month) => {
        // Convert each month to the required format (yyyy-mm-dd)
        const date = new Date(month);
        const year = date.getFullYear();
        const monthNumber = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero for single-digit months
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${monthNumber}-${day}`;
      });
      //console.log("22", modifiedMonths);
      onBillingMonthsChange(modifiedMonths);
    }
  }, [selectedMonths]);

  return (
    <div>
      <Button
        className="cmpDateRangePick_button"
        aria-controls="date-range-menu"
        aria-haspopup="true"
        onClick={handleOpen}
        style={{ fontSize: "16px" }}
      >
        {selectedMonths.length === 0
          ? "Select Months"
          : selectedMonths.join(", ")}
      </Button>
      <Menu
        id="date-range-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="custom-menu"
      >
        {billingPeriod.map((period, index) => (
          <MenuItem
            key={index}
            selected={selectedMonths.includes(period)}
            onClick={() => toggleMonth(period)}
          >
            {period}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default DateRangeDropdown;
