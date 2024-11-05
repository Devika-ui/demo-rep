import React from "react";
import Paper from "@mui/material/Paper";
import Box from "./Box";
import "../css/components/ContainerForBusinessCost.css";

const ContainerForBusinessCost = ({ data }) => {
  return (
    <Paper className="cmp_containerBox" style={{ width: "100%" }}>
      {data.map((item, index) => (
        <Box key={index} number={item.number} text={item.text} />
      ))}
    </Paper>
  );
};

export default ContainerForBusinessCost;
