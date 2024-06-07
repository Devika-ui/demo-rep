import React, { useState} from "react";
import { makeStyles} from "@material-ui/core/styles";
import Header from "./Header";
import Subheader from "./SubHeader";
import NavigationBar from "./NavigationBar";
import ContainerBox from "./ContainerBox";

const OrphanedRSVBackups = () => {
    //const classes = useStyles();
    const [showStackBars, setShowStackBars] = useState(true);
    const [groupBy, setGroupBy] = useState("");
  
    // Callback function to receive value from HeaderButton
    const handleButtonClick = (value) => {
      if (value === "Azure") {
        setShowStackBars(false); // Hide StackBars and show AzureBars
      } else {
        setShowStackBars(true); // Show StackBars
      }
    };
  
    // Handle change for the dropdown
    const handleGroupByChange = (event) => {
      setGroupBy(event.target.value);
    };
    const dataSet1 = [
        { number: "50", text: "Count of Unhealthy Backups" },
        { number: "10", text: "Count of Orphan Backups" },
      ];
 return (
    <div>
      <Header onButtonClick={handleButtonClick} />
      <Subheader
        title={
          <div>
            <span style={{ fontSize: "15px" }}>Recommendations/</span>
            <span style={{ color: "#0070C0", fontSize: "15px" }}>
              Orphaned RSV Backups
            </span>
          </div>
        }
      />
      <NavigationBar />
      <div style={{ display: "flex", justifyContent: "center", paddingRight:'15px' }}>
        <ContainerBox data={dataSet1} />
      </div>
      </div>
 );
};

export default OrphanedRSVBackups;