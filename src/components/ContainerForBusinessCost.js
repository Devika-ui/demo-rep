import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "./Box";
import "../css/components/ContainerForBusinessCost.css";

const ContainerForBusinessCost = ({ data, loading }) => {
  return (
    <Paper className="cmp_containerBox" style={{ width: "100%" }}>
      {loading ? (
        <div className="loading-container">
          <CircularProgress />
        </div>
      ) : (
        data.map((item, index) => (
          <Box key={index} number={item.number} text={item.text} />
        ))
      )}
    </Paper>
  );
};

export default ContainerForBusinessCost;
