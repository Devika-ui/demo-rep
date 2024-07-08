import React from 'react';
import Paper from '@mui/material/Paper';
import Box from './Box';
import "../css/components/BillOverviewBox.css"


const BillOverviewBox = () => {
 

  return (
    <Paper className="cmpBillOv_container">
      <Box className="cmpBillOv_box" number="$1.40M" text="Total Bill" />
      <Box className="cmpBillOv_box" number="$2.00M" text="Simulated Bill" />
      <Box className="cmpBillOv_box" number="$570K" text="Total Savings" />
      <Box className="cmpBillOv_box" number="52.3%" text="%Savings over Bill" />
      <Box className="cmpBillOv_box" number="61.3%" text="%Savings over Pay-as-you-go" />
      <Box className="cmpBillOv_box" number="10.2%" text="Normalized Variation" />
      <Box className="cmpBillOv_box" number="13.7%" text="%Raw Variation" />
    </Paper>
  );
};

export default BillOverviewBox;