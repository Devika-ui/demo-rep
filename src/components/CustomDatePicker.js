import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'daterangepicker';
import '../css/CustomDatePicker.scss';

const CustomDatePicker = () => {
  const [dateLimitChecked, setDateLimitChecked] = useState(false);

  useEffect(() => {
    updateConfig();
  }, [dateLimitChecked]);

  const updateConfig = () => {
    const options = {};
    if (dateLimitChecked) options.dateLimit = { days: 7 };
    options.ranges = {
      'Today': [moment(), moment()],
      'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Last 7 Days': [moment().subtract(6, 'days'), moment()],
      'Last 30 Days': [moment().subtract(29, 'days'), moment()],
      'This Month': [moment().startOf('month'), moment().endOf('month')],
      'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    };
    // $('#config-demo').daterangepicker(options, (start, end, label) => {
    //   console.log(`New date range selected: ${start.format('YYYY-MM-DD')} to ${end.format('YYYY-MM-DD')} (predefined range: ${label})`);
    // }).click();
  };

  const handleDateLimitChange = () => {
    setDateLimitChecked(!dateLimitChecked);
  };

  return (
    <div className="custom-date-picker">
      <input type="checkbox" id="dateLimit" checked={dateLimitChecked} onChange={handleDateLimitChange} />
      <label htmlFor="dateLimit">Date Limit</label>
      <input type="text" id="config-demo" className="form-control" />
    </div>
  );
};

export default CustomDatePicker;
