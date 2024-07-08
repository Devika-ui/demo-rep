import React from "react";
import Paper from "@mui/material/Paper";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Typography from "@mui/material/Typography";
import "../css/components/CategoriesBarChart.css"

// Custom tick formatter for YAxis
const formatYAxis = (tickItem) => `${tickItem }`;

// Custom legend component
const CustomLegend = ({ payload }) => {
  return (
    <div className="cmpCatBC_legendContainer">
      {payload.map((entry, index) => (
        <div key={`item-${index}`} className="cmpCatBC_legendItem">
          <span
            className="cmpCatBC_legendColor"
          />
          <span className="cmpCatBC_legend">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const CategoriesBarChart = ({ title, data, yAxisLabel, children }) => {
  

  return (
    <Paper className="cmpCatBC_container">
      <div className="cmpCatBC_dropdownContainer">{children}</div>
      <Typography className="cmpCatBC_heading">{title}</Typography>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          barGap={8} // Adjust the value to increase or decrease the gap between bars
        >
          <XAxis dataKey="name" tick={{ fontSize: 8 }} />
          <YAxis
            tick={{ fontSize: 12 }}
            domain={[0, 25]}
            ticks={[0, 5, 10, 15, 20, 25]}
            tickFormatter={formatYAxis}
            label={{
              value: yAxisLabel,
              angle: -90,
              position: "insideLeft",
              fontSize: 12,
            }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip />
          <Legend content={<CustomLegend />} />
          <Bar
            dataKey="Unhealthy"
            fill="#2CAFFE"
            name="Unhealthy"
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default CategoriesBarChart;
