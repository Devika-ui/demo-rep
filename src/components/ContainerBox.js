import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "./Box";
import "../css/components/ContainerBox.css";

const ContainerBox = ({ data = [], loading }) => {
  return (
    <Paper className="cmp_containerBox">
      {loading ? (
        <div className="loadingcontainer">
          <CircularProgress />
        </div>
      ) : data.length > 0 ? (
        <div className="cmp_innerBox">
          {data.map((item, index) => (
            <Box key={index} number={item.number} text={item.text} />
          ))}
        </div>
      ) : (
        <div>No recommendations available</div>
      )}
    </Paper>
  );
};

export default ContainerBox;
