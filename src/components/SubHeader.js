import React, { useState } from "react";
import PropTypes from "prop-types";
import AzureBox from "../images/Azure box.png";
import AWSBox from "../images/AWS box.png";
import FilterIcon from "../images/filter.png";
import LIcon from "../images/Iicon.png";
import "../css/Subheader.scss";
import AzureFilter from "./AzureFilter";
import AWSFilter from "./AWSFilter";
import { Tooltip } from "@mui/material";
// import { useState } from "react";

// const SubHeader = ({ title, additionalFilters }) => {
//   return (
//     <div className="Subheader-Container">
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           backgroundColor: "white",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             paddingRight: "10px",
//             marginTop: "5px",
//           }}
//         >
//           <div
//             style={{
//               paddingLeft: "20px",
//               fontSize: "20px",
//               color: "#63666A",
//               fontWeight: "bold",
//             }}
//           >
//             {title}
//           </div>
//           <Tooltip title={title}>
//             <img
//               src={LIcon}
//               alt="LIcon"
//               style={{
//                 width: "20px",
//                 height: "17px",
//                 marginLeft: "5px",
//                 cursor: "pointer",
//                 marginTop: "2px",
//               }}
//             />
//           </Tooltip>
//         </div>
//         <div
//           className="AzureBox"
//           style={{
//             display: "flex",
//             alignItems: "center",
//             marginLeft: "280px",
//             marginRight: "-150px",
//           }}
//         >
//           <img
//             src={AzureBox}
//             alt="Azure"
//             style={{ width: "30px", height: "34px", marginRight: "5px" }}
//           />
//           <div
//             style={{
//               fontWeight: "bold",
//               fontSize: "18px",
//               paddingRight: "5px",
//               marginTop: "5px",
//             }}
//           >
//             Azure
//           </div>
//           <img
//             src={FilterIcon}
//             alt="Filter"
//             style={{
//               width: "20px",
//               height: "20px",
//               marginRight: "5px",
//               marginTop: "5px",
//             }}
//           />
//           <AzureFilter additionalFilters={additionalFilters} />
//         </div>
//         <div
//           className="AWSBox"
//           style={{ display: "flex", alignItems: "center", marginLeft: "20px" }}
//         >
//           <img
//             src={AWSBox}
//             alt="AWS"
//             style={{ width: "30px", height: "34px", marginRight: "5px" }}
//           />
//           <div
//             style={{
//               fontWeight: "bold",
//               fontSize: "18px",
//               paddingRight: "5px",
//               marginTop: "5px",
//             }}
//           >
//             AWS
//           </div>
//           <img
//             src={FilterIcon}
//             alt="Filter"
//             style={{
//               width: "20px",
//               height: "20px",
//               marginRight: "5px",
//               marginTop: "5px",
//             }}
//           />
//           <AWSFilter additionalFilters={additionalFilters} />
//         </div>
//       </div>
//     </div>
//   );
// };

// const SubHeader = ({ title, additionalFilters }) => {
//   return (
//     <div className="Subheader-Container">
//       <div className="Subheader-TitleContainer">
//         <div className="Subheader-Title">{title}</div>
//         <Tooltip title={title}>
//           <img src={LIcon} alt="LIcon" className="Subheader-Icon" />
//         </Tooltip>
//       </div>
//       <div className="Subheader-Boxes">
// <div className="AzureBox">
//   <img src={AzureBox} alt="Azure" className="Subheader-BoxIcon" />
//   <div className="Subheader-BoxTitle">Azure</div>
//   <img src={FilterIcon} alt="Filter" className="Subheader-FilterIcon" />
//   <AzureFilter additionalFilters={additionalFilters} />
// </div>
// <div className="AWSBox">
//   <img src={AWSBox} alt="AWS" className="Subheader-BoxIcon" />
//   <div className="Subheader-BoxTitle">AWS</div>
//   <img src={FilterIcon} alt="Filter" className="Subheader-FilterIcon" />
//   <AWSFilter additionalFilters={additionalFilters} />
// </div>
//       </div>
//     </div>
//   );
// };

import ExpandMoreIcon from "@material-ui/icons/ExpandMore"; // Import the expand more icon
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
const SubHeader = ({ title, additionalFilters }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  return (
    <div className="Subheader-Container">
      <div className="Subheader-TitleContainer">
        <div className="Subheader-Title">{title}</div>
        <Tooltip title={title}>
          <img src={LIcon} alt="LIcon" className="Subheader-Icon" />
        </Tooltip>
      </div>
      <div className="Subheader-Boxes">
        <div className="FilterBox" onClick={toggleDropdown}>
          <span className="FilterText">Filters</span>
          {isDropdownOpen ? (
            <ExpandLessIcon className="Dropdown-Icon" />
          ) : (
            <ExpandMoreIcon className="Dropdown-Icon" />
          )}
        </div>
        {isDropdownOpen && (
          <div className="Dropdown-Content">
            <div className="Dropdown-Box">
              <img src={AzureBox} alt="Azure" className="Subheader-BoxIcon" />
              <div className="Subheader-BoxTitle">Azure</div>
              <img
                src={FilterIcon}
                alt="Filter"
                className="Subheader-FilterIcon"
              />
              <AzureFilter additionalFilters={additionalFilters} />
            </div>
            <div className="Dropdown-Box">
              <img src={AWSBox} alt="AWS" className="Subheader-BoxIcon" />
              <div className="Subheader-BoxTitle">AWS</div>
              <img
                src={FilterIcon}
                alt="Filter"
                className="Subheader-FilterIcon"
              />
              <AWSFilter additionalFilters={additionalFilters} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

SubHeader.propTypes = {
  title: PropTypes.node.isRequired,
  additionalFilters: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ),
};

SubHeader.defaultProps = {
  additionalFilters: [],
};

export default SubHeader;
