// CustomProgressBar.js
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../css/customProgressBar.scss";

const CustomProgressBar = ({ title, percentage, gradientColor }) => {
  return (
    <div className="progress-bar">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="progress-bar-title" style={{ color: "#5f249f", fontSize: "16px" }}>
          {title}
        </div>
        <div
          style={{
            position: "relative",
            width: "200px", // Increased width
            height: "120px", // Increased height
            overflow: "hidden",
          }}
        >
          <CircularProgressbar
            value={percentage}
            text={""}
            styles={buildStyles({
              rotation: 0.5,
              strokeLinecap: "butt",
              textSize: "16px",
              pathTransitionDuration: 0.5,
              pathColor: gradientColor,
              textColor: "black",
              trailColor: "transparent",
              backgroundColor: "#3e98c7",
              trail: { strokeLinecap: "butt" },
              path: { strokeLinecap: "butt" },
            })}
            strokeWidth={15} // Increased stroke width for thicker progress bar
          />
          <div
            className="progress-bar-text"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "32px", fontWeight: "bold" }}> {/* Increased font size */}
              {percentage}%
            </div>
            <div style={{ fontSize: "18px", color: "grey" }}> {/* Increased font size */}
              Completed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomProgressBar;
