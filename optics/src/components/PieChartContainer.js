import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    width: "1300px",
    maxWidth: 550, // Adjust the maxWidth to your desired value
    margin: theme.spacing(2, "auto"),
    marginBottom: "30px",
  },
  chartContainer: {
    width: "50%", // Adjust as needed
  },
  chart: {
    width: "100%",
    height: 200, // Adjust the height of the pie charts
    position: "relative",
  },
  legend: {
    position: "absolute",
    right: 0,
    top: "50%",
    transform: "translateY(-50%)",
  },
  title: {
    fontFamily: "Inter, sans-serif",
    fontSize: "15px",
    fontWeight: 700,
    color: "#63666A",
    marginBottom: theme.spacing(2),
    marginLeft: "15px",
  },
}));

const PieChartContainer = ({
  title1,
  data1,
  title2,
  data2,
  containerStyle,
  chartStyle,
}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.container} style={containerStyle}>
      <div className={classes.chartContainer} style={chartStyle}>
        <Typography variant="subtitle1" gutterBottom className={classes.title}>
          {title1}
        </Typography>
        <div className={classes.chart}>
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
                wrapperStyle={{ right: 0, fontSize: "7px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className={classes.chartContainer} style={chartStyle}>
        <Typography variant="subtitle1" gutterBottom className={classes.title}>
          {title2}
        </Typography>
        <div className={classes.chart}>
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
                wrapperStyle={{ right: 0, fontSize: "7px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Paper>
  );
};

export default PieChartContainer;
