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
import "../css/components/CategoriesBarChart.css";

// Custom tick formatter for YAxis
const formatYAxis = (tickItem) => `${tickItem}`;

// Custom legend component
const CustomLegend = ({ payload }) => {
  return (
    <div className="cmpCatBC_legendContainer">
      {payload.map((entry, index) => (
        <div key={`item-${index}`} className="cmpCatBC_legendItem">
          <div
            className="cmpHBgraph_legendColorBox"
            style={{ backgroundColor: entry.color }}
          ></div>
          <span className="cmpCatBC_legend">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const CategoriesBarChart = ({ title, data, yAxisLabel, containerStyle }) => {
  if (!data || data.length === 0) {
    return (
      <Paper className="cmpCatBC_container" style={containerStyle}>
        <Typography
          className="cmpPieChart_title"
          style={{ marginTop: "-20px" }}
        >
          {title}
        </Typography>
        <div
          style={{
            textAlign: "center",
            padding: "50px",
            fontSize: "16px",
            color: "#888",
          }}
        ></div>
      </Paper>
    );
  }

  const maxValue = Math.max(...data.map((d) => d.Unhealthycount), 0);

  // Determine step size for ticks (round to nearest multiple of 5 or 10)
  const stepSize = maxValue > 50 ? 20 : 10; // Adjust step dynamically
  const yTicks = Array.from(
    { length: Math.ceil(maxValue / stepSize) + 1 },
    (_, i) => i * stepSize
  );

  return (
    <Paper className="cmpCatBC_container" style={containerStyle}>
      <Typography className="cmpPieChart_title" style={{ marginTop: "-20px" }}>
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
          barGap={8} // Adjust the value to increase or decrease the gap between bars
        >
          <XAxis dataKey="Category" tick={{ fontSize: 12 }} />
          <YAxis
            tick={{ fontSize: 12 }}
            domain={[0, maxValue]}
            ticks={yTicks}
            tickFormatter={(tick) => `${tick}`}
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
          <Legend
            content={<CustomLegend />}
            wrapperStyle={{
              top: 0,
              right: 0,
              position: "absolute",
              fontSize: 22,
            }}
            verticalAlign="top"
            align="right"
          />
          <Bar
            dataKey="Unhealthycount"
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
