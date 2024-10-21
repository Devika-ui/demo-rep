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
import "../css/components/BarChartContainer.css";

const BarChartContainer = ({ chartData, trendData, legendData }) => {
  const [data, setData] = useState([]);
  const [legendFontSize, setLegendFontSize] = useState(12); // Default legend font size

  // Function to set the legend font size dynamically based on screen width
  const updateLegendFontSize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 600) {
      setLegendFontSize(8); // Smaller font size for small screens
    } else if (screenWidth < 900) {
      setLegendFontSize(10); // Medium font size for mid-sized screens
    } else {
      setLegendFontSize(16); // Default font size for larger screens
    }
  };

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

    // Call the function initially and add an event listener for window resize
    updateLegendFontSize();
    window.addEventListener("resize", updateLegendFontSize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateLegendFontSize);
    };
  }, [chartData, trendData]);

  return (
    <Paper className="cmpBarChart_container">
      <Typography className="cmpBarChart_heading">
        Total Bill Cost Vs Simulated PayGO
      </Typography>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 0, right: 30, left: 20, bottom: 15 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              dataKey="modifieddate"
              tick={{ fontSize: 12 }}
              tickFormatter={(tick) => format(parseISO(tick), "yyyy-MM")}
            />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
            <Tooltip />
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="right"
              wrapperStyle={{
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: `${legendFontSize}px`, // Dynamically set font size
              }}
              iconSize={10}
            />
            {legendData.map((legendItem) =>
              legendItem.type === "Bar" ? (
                <Bar
                  key={legendItem.dataKey}
                  dataKey={legendItem.dataKey}
                  fill={legendItem.color}
                  name={legendItem.name}
                />
              ) : (
                <Line
                  key={legendItem.dataKey}
                  type="monotone"
                  dataKey={legendItem.dataKey}
                  stroke={legendItem.color}
                  strokeWidth={2}
                  dot={false}
                  name={legendItem.name}
                />
              )
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  );
};

export default BarChartContainer;
