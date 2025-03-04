import React, { useState, useEffect } from "react";
import { Menu, MenuItem, Button, Popover } from "@mui/material";
import api from "../api.js";
import "../css/components/DateRangeDropdown.css";
import componentUtil from "../componentUtil.js";
import { CalendarToday, ArrowDropDown } from "@mui/icons-material";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { months } from "moment";

const DateRangeDropdown = ({ selectedCSP, onBillingMonthsChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [billingPeriod, setBillingPeriod] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const predefinedOptions = [
    "This Quarter",
    "This Year",
    "Last Month",
    "Last Quarter",
    "Last 3 Months",
    "Last 6 Months",
    "Custom Date Range",
  ];

  useEffect(() => {
    const fetchDates = async () => {
      try {
        setSelectedMonths([]);
        setSelectedOption(null);
        const data1 = await api.getAssignedCustomerIds();
        const cspid = componentUtil.getSelectedCSP();

        let billingPeriods;

        if (cspid === 0) {
          billingPeriods = data1[0].dataMonths.map((item) => {
            const date = new Date(item.billingPeriod);
            return date.toISOString().split("T")[0];
          });
        } else {
          billingPeriods = data1[0].dataMonths
            .filter((item) => item.csp_id === cspid)
            .map((item) => {
              const date = new Date(item.billingPeriod);
              return date.toISOString().split("T")[0];
            });
        }
        billingPeriods = [...new Set(billingPeriods)].sort(
          (a, b) => new Date(a) - new Date(b)
        );

        const formattedBillingPeriods = billingPeriods.map((date) => {
          const options = { year: "numeric", month: "long" };
          return new Date(date).toLocaleDateString("en-US", options);
        });

        setBillingPeriod(formattedBillingPeriods);
        // Set selectedMonths to the most recent billing period
        if (formattedBillingPeriods.length > 0) {
          const latestMonth =
            formattedBillingPeriods[formattedBillingPeriods.length - 1];
          setSelectedMonths([latestMonth]);
          setSelectedOption(null);
        }
      } catch (error) {
        console.error("Error fetching dates:", error);
      }
    };

    fetchDates();
  }, [selectedCSP]);

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
      const modifiedMonths = selectedMonths.map((month) => {
        const date = new Date(month);
        const year = date.getFullYear();
        const monthNumber = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${monthNumber}-${day}`;
      });
      onBillingMonthsChange(modifiedMonths);
    }
  }, [selectedMonths]);

  const handleSelection = (option) => {
    setSelectedOption(option);
    setAnchorEl(null);

    if (option === "Custom Date Range") {
      setOpenDatePicker(true);
      return;
    }

    const { filteredMonths, startDate, endDate } =
      convertSelectionToDates(option);

    setSelectedMonths(filteredMonths);
    onBillingMonthsChange(filteredMonths, startDate, endDate); // Ensure API gets all values
  };

  const convertSelectionToDates = (option) => {
    if (!billingPeriod.length)
      return { filteredMonths: [], startDate: null, endDate: null };
    const sortedBillingPeriods = billingPeriod
      .map((month) => {
        const [monthName, year] = month.split(" ");
        return { date: new Date(`${monthName} 1, ${year}`), label: month };
      })
      .sort((a, b) => a.date - b.date)
      .map((item) => item.label);

    const latestBillingMonth =
      sortedBillingPeriods[sortedBillingPeriods.length - 1];
    const latestDate = new Date(latestBillingMonth);
    const latestYear = latestDate.getFullYear();
    const latestMonth = latestDate.getMonth();

    let startDate, endDate;

    switch (option) {
      case "This Year":
        startDate = new Date(latestYear, 0, 1);
        endDate = new Date(latestYear, 11, 31);
        break;

      case "Last Month": {
        let lastMonthIndex = latestMonth - 1;
        let lastYear = latestYear;
        if (lastMonthIndex < 0) {
          lastMonthIndex = 11;
          lastYear -= 1;
        }
        startDate = new Date(lastYear, lastMonthIndex, 1);
        endDate = new Date(lastYear, lastMonthIndex + 1, 0);
        break;
      }

      case "This Quarter": {
        const quarterStartMonth = Math.floor(latestMonth / 3) * 3;
        startDate = new Date(latestYear, quarterStartMonth, 1);
        endDate = new Date(latestYear, quarterStartMonth + 3, 0);
        break;
      }

      case "Last Quarter": {
        let lastQuarterStartMonth = Math.floor((latestMonth - 3) / 3) * 3;
        let lastQuarterYear = latestYear;

        if (latestMonth < 3) {
          lastQuarterStartMonth = 9; // October of last year
          lastQuarterYear -= 1;
        }

        startDate = new Date(lastQuarterYear, lastQuarterStartMonth, 1);
        endDate = new Date(lastQuarterYear, lastQuarterStartMonth + 3, 0);
        break;
      }

      case "Last 3 Months":
        startDate = new Date(latestYear, Math.max(0, latestMonth - 2), 1);
        endDate = new Date(latestYear, latestMonth + 1, 0);
        break;

      case "Last 6 Months":
        startDate = new Date(latestYear, Math.max(0, latestMonth - 5), 1);
        endDate = new Date(latestYear, latestMonth + 1, 0);
        break;

      // case "Custom Date Range":
      //   return [];

      default:
        return { filteredMonths: [], startDate: null, endDate: null };
    }

    const filteredMonths = billingPeriod.filter((month) => {
      const [monthName, year] = month.split(" ");
      const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth();
      const monthDate = new Date(year, monthIndex, 1);

      return monthDate >= startDate && monthDate <= endDate;
    });

    return { filteredMonths, startDate, endDate };
  };

  const handleDateRangeApply = () => {
    if (!billingPeriod.length || !selectedStartDate || !selectedEndDate) return;

    // Extract only the month and year from the selected dates
    const startMonth = new Date(
      selectedStartDate.year(),
      selectedStartDate.month(),
      1
    );
    const endMonth = new Date(
      selectedEndDate.year(),
      selectedEndDate.month(),
      1
    );

    // Filter all months that fall within the selected range
    const filteredMonths = billingPeriod.filter((month) => {
      const [monthName, year] = month.split(" ");
      const monthDate = new Date(`${monthName} 1, ${year}`);

      return monthDate >= startMonth && monthDate <= endMonth;
    });

    setSelectedMonths(filteredMonths);
    onBillingMonthsChange(filteredMonths);
    setOpenDatePicker(false);
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setOpenDatePicker(false);
    setAnchorEl(null);
    setSelectedStartDate(null);
    setSelectedEndDate(null);
  };

  const getLastBilledMonth = () => {
    if (!billingPeriod.length) return "";

    const sortedBillingPeriods = [...billingPeriod].sort(
      (a, b) => new Date(a) - new Date(b)
    );
    return sortedBillingPeriods[sortedBillingPeriods.length - 1]; // Latest month
  };

  const latestBilledMonth = getLastBilledMonth();

  const shouldDisableDate = (date, isStartDate) => {
    if (isStartDate) {
      return selectedEndDate ? date.isBefore(selectedEndDate, "day") : false;
    } else {
      return selectedStartDate ? date.isAfter(selectedStartDate, "day") : false;
    }
  };

  return (
    <div>
      <Button
        className="cmpDateRangePick_button"
        aria-controls="date-range-menu"
        aria-haspopup="true"
        onClick={handleOpen}
        style={{
          fontSize: "16px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <CalendarToday style={{ fontSize: "18px" }} />
        {selectedOption
          ? selectedOption
          : selectedMonths[selectedMonths.length - 1]}
        <ArrowDropDown />
      </Button>
      <Menu
        id="date-range-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="custom-menu"
      >
        {predefinedOptions.map((option, index) => {
          const { filteredMonths } = convertSelectionToDates(option); // Extract filteredMonths

          const formattedMonths = filteredMonths.length
            ? filteredMonths.length === 1
              ? `${filteredMonths[0].slice(0, 3)} ${filteredMonths[0].slice(
                  -4
                )}`
              : `${filteredMonths[0].slice(0, 3)}-${filteredMonths[
                  filteredMonths.length - 1
                ].slice(0, 3)}
         ${filteredMonths[filteredMonths.length - 1].slice(-4)}`
            : "";
          return (
            <MenuItem
              key={index}
              selected={selectedOption === option}
              onClick={() => handleSelection(option)}
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <span>{option}</span>
              <span
                style={{ fontSize: "12px", color: "#666", marginLeft: "20px" }}
              >
                {formattedMonths}
              </span>
            </MenuItem>
          );
        })}
      </Menu>
      {/* Date Range Picker Popover */}
      <Popover
        open={openDatePicker}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          style: { marginTop: "130px", maxHeight: "500px", overflow: "auto" },
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div style={{ padding: "5px", textAlign: "center" }}>
            <h3>Select Date Range</h3>

            <div
              style={{
                display: "flex",
                gap: "0px",
                justifyContent: "center",
                alignItems: "start",
              }}
            >
              {/* Start Date Calendar */}
              <div>
                <p style={{ marginLeft: "30px", fontWeight: "bold" }}>
                  Start Date
                </p>
                <StaticDatePicker
                  displayStaticWrapperAs="desktop"
                  value={selectedStartDate}
                  onChange={(newDate) => setSelectedStartDate(newDate)}
                  minDate={dayjs(latestBilledMonth).subtract(6, "months")}
                  maxDate={dayjs(latestBilledMonth)
                    .subtract(1, "months")
                    .endOf("month")}
                  shouldDisableDate={shouldDisableDate}
                />
              </div>

              {/* End Date Calendar */}
              <div>
                <p style={{ marginLeft: "30px", fontWeight: "bold" }}>
                  End Date
                </p>
                <StaticDatePicker
                  displayStaticWrapperAs="desktop"
                  value={selectedEndDate}
                  onChange={(newDate) => setSelectedEndDate(newDate)}
                  minDate={dayjs(latestBilledMonth).startOf("month")}
                  maxDate={dayjs(latestBilledMonth).endOf("month")}
                />
              </div>
            </div>

            <div style={{ marginTop: "-35px" }}>
              <Button
                variant="contained"
                onClick={() => {
                  handleDateRangeApply();
                  handleClose();
                }}
                style={{ marginRight: "10px" }}
              >
                Apply
              </Button>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </div>
        </LocalizationProvider>
      </Popover>
    </div>
  );
};

export default DateRangeDropdown;
