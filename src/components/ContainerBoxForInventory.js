// ContainerBoxForInventory.js
import React from 'react';
import Paper from '@mui/material/Paper';
import Box from './Box';
import "../css/components/ContainerBoxForInventory.css"


const ContainerBoxForInventory = () => {

  return (
    <Paper className="cmpCBInv_container">
      <Box number="$545.4K" text="Previous Month Total Bill" />
      <Box number="-3.4%" text="Increase Rate" />
      <Box number="2000" text="Total Resources" />
    </Paper>
  );
};

export default ContainerBoxForInventory;
