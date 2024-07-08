import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
} from "recharts";
import Typography from "@mui/material/Typography";
import { format, parseISO } from "date-fns";
import "../css/components/BarChartContainer.css"

const BarChartContainer = ({ chartData, trendData }) => {
  
  const [data, setData] = useState([]);

  useEffect(() => {
    // Combine chartData and trendData into a single array
    const combinedData = chartData.map((item) => {
      const trendItem = trendData.find(
        (trend) =>
          format(parseISO(trend.Date), "yyyy-MM") ===
          format(parseISO(item.modifieddate), "yyyy-MM")
      );
      return {
        ...item,
        simulated: trendItem ? trendItem.simulated : 0,
      };
    });
    setData(combinedData);
  }, [chartData, trendData]);

  return (
    <Paper className="cmpBarChart_container">
      <Typography className="cmpBarChart_heading">
        Total Bill Cost Vs Simulated PayGO
      </Typography>
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 20, left: 5, bottom: 20 }}
        >
          <CartesianGrid
            horizontal={true}
            vertical={false}
            strokeDasharray="3 3"
          />
          <XAxis
            dataKey="modifieddate"
            tick={{ fontSize: 10 }}
            tickFormatter={(tick) => format(parseISO(tick), "yyyy-MM")}
          />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
          <Tooltip />
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="left"
            wrapperStyle={{
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
            }}
            iconSize={10}
            contentStyle={{ fontSize: 10 }}
          />
          <Bar
            dataKey="costsPAYGO"
            fill="rgba(95, 36, 159, 0.8)"
            name="Pay as you go"
          />
          <Bar
            dataKey="savingsRI"
            fill="rgba(0, 150, 143, 0.8)"
            name="Reservations"
          />
          <Line
            type="monotone"
            dataKey="simulated"
            stroke="rgba(0, 153, 198, 0.8)"
            strokeWidth={2}
            dot={false}
            name="Simulated PAYGO"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default BarChartContainer;
