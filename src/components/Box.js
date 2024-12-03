import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import "../css/components/Box.css";
import "../css/components/ContainerBox.css";

const Box = ({ number, text }) => {
  // Calculate width based on text length
  const getTextWidth = (text) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = "16px Arial"; // You can adjust the font size as needed
    return context.measureText(text).width + 40; // Adding some extra padding
  };

  const boxWidth = getTextWidth(text);

  return (
    <Paper className="cmp_box" style={{ width: boxWidth }}>
      <Typography className="cmp_box_text" variant="h5">
        {number}
      </Typography>
      <Typography className="cmp_box_text1" variant="body1">
        {text}
      </Typography>
    </Paper>
  );
};

export default Box;
