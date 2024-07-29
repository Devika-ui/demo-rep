import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import "../css/components/PieChartContainer.css";

const PieChartContainer = ({
  title1,
  data1,
  title2,
  data2,
  containerStyle,
  chartStyle,
}) => {
  return (
    <Paper className="cmpPieChart_container" style={containerStyle}>
      <div className="cmpPieChart_chartContainer" style={chartStyle}>
        <Typography
          variant="subtitle1"
          gutterBottom
          className="cmpPieChart_title"
        >
          {title1}
        </Typography>
        <div className="cmpPieChart_chart">
          <ResponsiveContainer width="101%" height={200}>
            <PieChart>
              <Pie data={data1} dataKey="value" nameKey="name">
                {data1.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                align="right"
                verticalAlign="middle"
                layout="vertical"
                wrapperStyle={{ right: 0, fontSize: "12px" }} // Adjust the font size here
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="cmpPieChart_chartContainer" style={chartStyle}>
        <Typography
          variant="subtitle1"
          gutterBottom
          className="cmpPieChart_title"
        >
          {title2}
        </Typography>
        <div className="cmpPieChart_chart">
          <ResponsiveContainer width="101%" height={200}>
            <PieChart>
              <Pie data={data2} dataKey="value" nameKey="name">
                {data2.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                align="right"
                verticalAlign="middle"
                layout="vertical"
                wrapperStyle={{ right: 0, fontSize: "10px" }} // Adjust the font size here
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Paper>
  );
};

export default PieChartContainer;
