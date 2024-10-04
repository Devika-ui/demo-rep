import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../css/customProgressBar.scss";

const CustomProgressBar = ({ title, percentage, gradientColor }) => {
  const rotation = percentage > 50 ? 0.25 : 0.75;
  return (
    <div className="progress-bar">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          className="progress-bar-title"
          style={{ color: "#5f249f", fontSize: "16px" }}
        >
          {title}
        </div>
        <div className="progress-bar-graph"
          style={{
            // position: "relative",
            // width: "150px", // Increased width
            // height: "75px", // Increased height
            // overflow: "hidden",
          }}
        >
          <CircularProgressbar
            value={percentage}
            text={""}
            styles={buildStyles({
              rotation: rotation,
              strokeLinecap: "butt",
              textSize: "16px",
              pathTransitionDuration: 0.5,
              pathColor: gradientColor,
              textColor: "black",
              trailColor: "rgba(0, 0, 0, 0.1)",
              backgroundColor: "#3e98c7",
              trail: { strokeLinecap: "butt" },
              path: { strokeLinecap: "butt" },
            })}
            strokeWidth={12} // Increased stroke width for thicker progress bar
          />
          <div
            className="progress-bar-text"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-54%, -50%)",
              textAlign: "center",
            }}
          >
            <div className="bar-text">
              {" "}
              {/* Increased font size */}
              {percentage}%
            </div>
            <div style={{ fontSize: "14px", color: "grey",marginTop:"-8px" }}>
              {" "}
              {/* Increased font size */}
              Completed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomProgressBar;