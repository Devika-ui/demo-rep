import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Subheader from "./SubHeader";
import NavigationBar from "./NavigationBar";
import Ondemand from "./Ondemand";

const OnDemandCostStudy = () => {
    const [showStackBars, setShowStackBars] = useState(true);
    const [groupBy, setGroupBy] = useState("");
  
    
    const handleButtonClick = (value) => {
      if (value === 1) {
        setShowStackBars(false); // Hide StackBars and show AzureBars
      } else {
        setShowStackBars(true); // Show StackBars
      }
    };
  
    // Handle change for the dropdown
    const handleGroupByChange = (event) => {
      setGroupBy(event.target.value);
    };
    return (
        <div>
          <Header onButtonClick={handleButtonClick} />
          <div style={{ marginLeft: "-12px", width: "200%" }}>
            <Subheader
              title={
                <div>
                  <span style={{ fontSize: "15px" }}>Cost & Usage/</span>
                  <span style={{ color: "#5f249f", fontSize: "15px" }}>
                    OnDemandCostStudy
                  </span>
                </div>
              }
              
            />
          </div>
    
          <NavigationBar />
          </div>
    );
};

export default OnDemandCostStudy;