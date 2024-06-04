import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Box from "./Box";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
    marginLeft: "87px",
    marginRight: "20px",
    alignItems: "center",
    justifyContent: "center",
    width: "1130px", // Adjust the width as needed
    height: "75px", // Adjust the height as needed
  },
}));

const OrphanedSnapshotsContainer = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <Box number="$75.4K" text="Total On Demand Cost" />
      <Box number="12" text="Count Of Snapshots" />
      <Box number="10" text="Impacted Applications" />
    </Paper>
  );
};

export default OrphanedSnapshotsContainer;
