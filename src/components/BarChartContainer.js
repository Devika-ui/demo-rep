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
import { CircularProgress } from "@mui/material";

const BarChartContainer = ({
  chartData,
  trendData,
  legendData,
  currencySymbol,
  currencyPreference,
  loading = false,
}) => {
  const [data, setData] = useState([]);
  const [legendFontSize, setLegendFontSize] = useState(12); // Default legend font size

  const updateLegendFontSize = () => {
    const screenWidth = window.innerWidth;
    setLegendFontSize(screenWidth < 600 ? 8 : screenWidth < 900 ? 10 : 14);
  };

  useEffect(() => {
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

    // Format the data by adding the currency symbol and rounding the numbers
    const formattedData = combinedData.map((item) => ({
      ...item,
      costsPAYGO: item.costsPAYGO.toFixed(2),
      savingsRI: item.savingsRI.toFixed(2),
      simulated: item.simulated.toFixed(2),
    }));

    setData(formattedData);

    const sortedData = formattedData.sort((a, b) => {
      return new Date(a.modifieddate) - new Date(b.modifieddate); 
    });
 
    setData(sortedData);

    // Call the function initially and add an event listener for window resize
    updateLegendFontSize();
    window.addEventListener("resize", updateLegendFontSize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateLegendFontSize);
    };
  }, [chartData, trendData]);

  const CustomTooltip = ({ payload, label }) => {
    if (payload && payload.length) {
      const { costsPAYGO, savingsRI, simulated, dataKey } = payload[0].payload;

      // Get the color dynamically based on dataKey from legendData
      const colorMap = {
        costsPAYGO: "rgba(95, 36, 159, 0.8)",
        savingsRI: "rgba(0, 150, 143, 0.8)",
        simulated: "rgba(0, 153, 198, 0.8)",
      };

      const tooltipTextStyle = {
        color: colorMap[dataKey] || "#000000", // Default to black if no color is available
      };

      return (
        <div
          className="custom-tooltip"
          style={{ ...tooltipTextStyle, backgroundColor: "white" }}
        >
          <p>{`Date: ${label}`}</p>
          <p style={{ color: colorMap.costsPAYGO }}>
            {" "}
            {`Pay as you go: ${
              currencyPreference === "start"
                ? `${currencySymbol}${Number(costsPAYGO).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                : `${Number(costsPAYGO).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}${currencySymbol}`
            }`}
          </p>
          <p style={{ color: colorMap.savingsRI }}>{`Reservations: ${
            currencyPreference === "start"
                 ? `${currencySymbol}${Number(savingsRI).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                : `${Number(savingsRI).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}${currencySymbol}`
          }`}</p>
          <p style={{ color: colorMap.simulated }}>
            {" "}
            {`Simulated PAYGO: ${
              currencyPreference === "start"
                ? `${currencySymbol}${Number(simulated).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                : `${Number(simulated).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}${currencySymbol}`
            }`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Paper className="cmpBarChart_container">
      <Typography className="cmpBarChart_heading">
        Total Bill Cost Vs Simulated PayGO
      </Typography>
      {loading ? (
        <div className="loading-container">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="chart-wrapper1">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={data}
                margin={{ top: 0, right: 30, left: 20, bottom: 0 }}
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
                <YAxis domain={[0, "dataMax + 2000"]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10 }}
                />
                <Tooltip content={<CustomTooltip />} />
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
                      connectNulls={true}
                    />
                  )
                )}
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </Paper>
  );
};

export default BarChartContainer;
