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

import "../css/components/GenericBarChart.css";

// Custom legend component
const CustomLegend = ({ payload }) => {
  return (
    <div className="cmpGBChart_legendContainer">
      {payload.map((entry, index) => (
        <div key={`item-${index}`} className="cmpGBChart_legendItem">
          <span
            className="cmpGBChart_legendColor"
            style={{ backgroundColor: entry.color }}
          />
          <span className="cmpGBChart_legend">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const GenericBarChart = ({
  title,
  data,
  yAxisLabel,
  yAxisTicks = [0, 1000, 2000, 3000],
  yAxisDomain = [0, 1000],
  bars,
  children,
}) => {
  // Custom tick formatter for YAxis

  const formatYAxis = (tickItem) => {
    if (yAxisTicks.some((tick) => tick >= 1000)) {
      return `${tickItem / 1000}k`;
    }
    return tickItem.toString();
  };

  return (
    <Paper className="cmpGBChart_container">
      <div className="cmpGBChart_dropdownContainer">{children}</div>
      <Typography className="cmpGBChart_heading">{title}</Typography>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          barGap={8} // Adjust the value to increase or decrease the gap between bars
        >
          <XAxis dataKey="subscriptionName" tick={{ fontSize: 8 }} />
          <YAxis
            tick={{ fontSize: 12 }}
            domain={yAxisDomain}
            ticks={yAxisTicks}
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
          {bars.map((bar, index) => (
            <Bar key={index} {...bar} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default GenericBarChart;
