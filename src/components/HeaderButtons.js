import React, { useState } from "react";
import "../css/HeaderButtons.scss";
import Azurelogo from "../images/Azure-Logo-PNG-Images.png";
import AWSlogo from "../images/aws-logo.png";
// import AWSlogo from '../images/Amazon_Web_Services-Logo.png';
// import NewAWSlogo from '../images/icons8-amazon-web-services-32.png';
import NewAzurelogo from "../images/azure-logo-svg.svg";
import Awslogo from "../images/aws logo1.png";

const HeaderButtons = ({ onButtonClick }) => {
  const [previousState, setPreviousState] = useState(null);
  const [currentState, setCurrentState] = useState(null);

  const handleClick = (value) => {
    if (currentState === value) {
      // Reverting to previous state
      setCurrentState(previousState);
      onButtonClick(previousState);
    } else {
      // Saving the current state and setting the new state
      setPreviousState(currentState);
      setCurrentState(value);
      onButtonClick(value);
    }
  };

  // const HeaderButtons = ({ onButtonClick }) => {
  //   const handleClick = (value) => {
  //     onButtonClick(value);
  //   };

  //   const [buttonStates, setButtonStates] = useState({
  //     cut: false,
  //     copy: false,
  //     paste: false,
  //   });

  //   const generateElements = (type, count) => {
  //     const elements = [];

  //     for (let i = 0; i < count; i++) {
  //       const element = document.createElement('SPAN');
  //       element.classList.add('fas');
  //       element.classList.add(fa-${type});
  //       element.classList.add(type);

  //       elements.push(element);
  //     }

  //     return elements;
  //   };

  //   const animateElements = (elements) => {
  //     elements.forEach((element) => {
  //       document.body.appendChild(element);
  //       element.classList.add('animated');
  //     });

  //     setTimeout(() => {
  //       elements.forEach((element) => {
  //         element.classList.remove('animated');
  //         element.remove();
  //       });
  //     }, 3500);
  //   };

  //   const handleButtonClick = (type) => {
  //     const count = 15; // Number of elements to generate
  //     const elements = generateElements(type, count);

  //     // Disable the button to prevent repeated clicks
  //     setButtonStates((prevStates) => ({
  //       ...prevStates,
  //       [type]: true,
  //     }));

  //     // Add animation class and create elements
  //     animateElements(elements);
  //   };

  //   return (
  //     <div className="button-container"> {/* Wrapper container for buttons */}
  //       <div className="button-box">
  //         <button
  //           id="cut-btn"
  //           onClick={() => handleClick('Azure')}
  //           disabled={buttonStates.cut}
  //           className="logo-button"
  //           style={{ width: '36px', height: '36px' }} // Decrease button size
  //         >
  //           {/* <img src={Azurelogo} alt="Azure Logo" /> */}
  //           <img src={NewAWSlogo} alt="Azure Logo" />
  //         </button>
  //         {/* <div className="separator"></div> {/* Add the separator */}
  //         {/* <button
  //           id="copy-btn"
  //           onClick={() => handleButtonClick('CommonView')}
  //           disabled={buttonStates.copy}
  //           className="icon-button"
  //           style={{ width: '30px', height: '30px' }} // Decrease button size
  //         >
  //           <i className="fas fa-copy"></i>
  //         </button> */}
  //         <div className="separator"></div> {/* Add the separator */}
  //         <button
  //           id="paste-btn"
  //           onClick={() => handleClick('AWS')}
  //           disabled={buttonStates.paste}
  //           className="logo-button"
  //           style={{ width: '36px', height: '36px' }} // Decrease button size
  //         >
  //           <img src={AWSlogo} alt="AWS Logo" />
  //         </button>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div className="button-container">
      {" "}
      {/* Wrapper container for buttons */}
      <div className="button-box">
        <button
          id="cut-btn"
          onClick={() => handleClick("Azure")}
          className="logo-button"
          style={{ width: "36px", height: "36px" }} // Decrease button size
        >
          <img src={NewAzurelogo} alt="Azure Logo" />
        </button>
        <div className="separator"></div> {/* Add the separator */}
        <button
          id="paste-btn"
          onClick={() => handleClick("AWS")}
          className="logo-button"
          style={{
            width: "36px",
            height: "36px",
            paddingTop: "6px",
            paddingLeft: "2px",
          }} // Decrease button size
        >
          <img src={Awslogo} alt="AWS Logo" />
        </button>
      </div>
    </div>
  );
};

export default HeaderButtons;
