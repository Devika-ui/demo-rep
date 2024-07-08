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
import "../css/components/HyperScalarBarChart.css"


// Custom tick formatter for YAxis
const formatYAxis = (tickItem) => `${tickItem / 1000}k`;

// Custom legend component
const CustomLegend = ({ payload }) => {
  return (
    <div className="cmpHSBC_legendContainer">
      {payload.map((entry, index) => (
        <div key={`item-${index}`} className="cmpHSBC_legendItem">
          <span
            className="cmpHSBC_legendColor"
          />
          <span className="cmpHSBC_legend">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const HyperScalarBarChart = ({ title, data, yAxisLabel, children }) => {

  return (
    <Paper className="cmpHSBC_container">
      <div className="cmpHSBC_dropdownContainer">{children}</div>
      <Typography className="cmpHSBC_heading">{title}</Typography>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          barGap={8} // Adjust the value to increase or decrease the gap between bars
        >
          <XAxis dataKey="name" tick={{ fontSize: 8 }} />
          <YAxis
            tick={{ fontSize: 12 }}
            domain={[0, 500000]}
            ticks={[0, 100000, 200000, 300000, 400000, 500000]}
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
            dataKey="High"
            fill="#2CAFFE"
            name="High"
            barSize={20}
          />
          <Bar
            dataKey="Medium"
            fill="#006975"
            name="Medium"
            barSize={20}
          />
          <Bar
          dataKey="Low"
          fill="#330072"
          name="Low"
          barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default HyperScalarBarChart;
