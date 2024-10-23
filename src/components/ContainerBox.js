import React from "react";
import Paper from "@mui/material/Paper";

import Box from "./Box";
import "../css/components/ContainerBox.css";

const ContainerBox = ({ data }) => {
  return (
    <Paper className="cmp_containerBox">
      {data.map((item, index) => (
        <Box key={index} number={item.number} text={item.text} />
      ))}
    </Paper>
  );
};

export default ContainerBox;
