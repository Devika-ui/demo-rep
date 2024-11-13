import React from "react";
import Paper from "@mui/material/Paper";
import Box from "./Box";
import "../css/components/ContainerForBillOverview.css";

const ContainerForBillOverview = ({ data }) => {
  return (
    <Paper className="cmp_containerBox1" style={{ width: "100%" }}>
      {data.map((item, index) => (
        <Box key={index} number={item.number} text={item.text} />
      ))}
    </Paper>
  );
};

export default ContainerForBillOverview;
