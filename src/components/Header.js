import React, { useState, useEffect } from "react";
import "../css/styles.scss";
import OpticLogo from "../images/OpticsFinopslogo.png";
import DXCLogo from "../images/DXCLogo.jpg";
import api from "../api.js";
import { Link } from "react-router-dom";
import componentUtil from "../componentUtil.js";

const Header = ({ onButtonClick }) => {
  const [isNavOpen, setNavOpen] = useState(false);
  const logoImg = componentUtil.getCustomerImage();
  

  const siteIdentityStyle = {
    float: "right",
  };

  const clientLogoStyle = {
    width: "13vh",
    height: "auto",
    marginTop: "8px",
  };

  const lineStyle = {
    height: "34px",
    borderRight: "1px solid #5f249f",
    marginRight: "10px",
    marginTop: "8px",
  };

  const logoImageStyle = {
    imageRendering: "auto", 
    width: "13vh",
    height: "5vh",
  };

  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };

  return (
    <header className="site-header">
      <div className="site-identity">
        <Link to="/dashboard">
          <img src={OpticLogo} alt="Site Name" />
        </Link>
      </div>

      <div>
        <nav className={`site-navigation ${isNavOpen ? "open" : ""}`}>
          <ul className="nav" style={{ display: "flex", alignItems: "center" }}>
            <li>
              <div className="site-identity" style={siteIdentityStyle}>
                {logoImg && <Link to="/dashboard">
                  <img
                    src={logoImg}
                    alt="DXC Logo"
                    style={{ ...clientLogoStyle, ...logoImageStyle }}
                  />
                </Link>}
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
