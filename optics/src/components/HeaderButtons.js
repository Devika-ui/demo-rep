import React, { useState } from 'react';
import '../css/HeaderButtons.scss';
import Azurelogo from '../images/Azure-Logo-PNG-Images.png';
import AWSlogo from '../images/aws-logo.png';
// import AWSlogo from '../images/Amazon_Web_Services-Logo.png';
//import NewAWSlogo from '../images/icons8-amazon-web-services-32.png';
 import NewAWSlogo from '../images/azure-logo-svg.svg';


const HeaderButtons = ({ onButtonClick }) => {
  const handleClick = (value) => {
    onButtonClick(value);
  };

  const [buttonStates, setButtonStates] = useState({
    cut: false,
    copy: false,
    paste: false,
  });

  const generateElements = (type, count) => {
    const elements = [];

    for (let i = 0; i < count; i++) {
      const element = document.createElement('SPAN');
      element.classList.add('fas');
      element.classList.add(`fa-${type}`);
      element.classList.add(type);

      elements.push(element);
    }

    return elements;
  };

  const animateElements = (elements) => {
    elements.forEach((element) => {
      document.body.appendChild(element);
      element.classList.add('animated');
    });

    setTimeout(() => {
      elements.forEach((element) => {
        element.classList.remove('animated');
        element.remove();
      });
    }, 3500);
  };

  const handleButtonClick = (type) => {
    const count = 15; // Number of elements to generate
    const elements = generateElements(type, count);

    // Disable the button to prevent repeated clicks
    setButtonStates((prevStates) => ({
      ...prevStates,
      [type]: true,
    }));

    // Add animation class and create elements
    animateElements(elements);
  };

  return (
    <div className="button-container"> {/* Wrapper container for buttons */}
      <div className="button-box">
        <button
          id="cut-btn"
          onClick={() => handleClick('Azure')}
          disabled={buttonStates.cut}
          className="logo-button"
          style={{ width: '36px', height: '36px' }} // Decrease button size
        >
          {/* <img src={Azurelogo} alt="Azure Logo" /> */}
          <img src={NewAWSlogo} alt="Azure Logo" />
        </button>
        {/* <div className="separator"></div> {/* Add the separator */}
        {/* <button
          id="copy-btn"
          onClick={() => handleButtonClick('CommonView')}
          disabled={buttonStates.copy}
          className="icon-button"
          style={{ width: '30px', height: '30px' }} // Decrease button size
        >
          <i className="fas fa-copy"></i>
        </button> */} 
        <div className="separator"></div> {/* Add the separator */}
        <button
          id="paste-btn"
          onClick={() => handleClick('AWS')}
          disabled={buttonStates.paste}
          className="logo-button"
          style={{ width: '36px', height: '36px' }} // Decrease button size
        >
          <img src={AWSlogo} alt="AWS Logo" />
        </button>
      </div>
    </div>
  );
};

export default HeaderButtons;