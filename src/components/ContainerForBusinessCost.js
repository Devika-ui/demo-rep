import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress"; 
import Box from "./Box";
import "../css/components/ContainerForBusinessCost.css";

const ContainerForBusinessCost = ({ data }) => {
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    if (data && data.length > 0) {
      setIsLoading(false);
    }
  }, [data]);

  return (
    <Paper className="cmp_containerBox" style={{ width: "100%" }}>
      {isLoading ? (
        <div className="loading-spinner-container">
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
