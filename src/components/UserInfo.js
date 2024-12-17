import React from "react";
import Header from "./Header";
import NavigationBar from "./NavigationBar";
import "../css/components/UserInfo.css";
import "../css/components/ServiceCategory.css";

const UserInfo = ({ userInfo }) => {
  return (
    <div className="user-info-container">
      <Header />
      <NavigationBar />
      <div className="form-container">
        <h2>Personal Info</h2>
        <p style={{ marginTop: "20px" }}>Manage your basic information</p>
        <form className="user-info-form">
          <fieldset>
            <h3>General</h3>

            <div className="form-group inline">
              <label htmlFor="username" className="fixed-label">
                UserId <span className="required">*</span>
              </label>
              <input
                type="text"
                id="userid"
                name="userid"
                value={userInfo.sub}
                readOnly
              />
            </div>
            <div className="form-group inline">
              <label htmlFor="username" className="fixed-label">
                Username <span className="required">*</span>
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={userInfo.preferred_username}
                readOnly
              />
            </div>

            <div className="form-group inline">
              <label htmlFor="email" className="fixed-label">
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={userInfo.email}
                readOnly
              />
            </div>

            <div className="form-group inline">
              <label htmlFor="firstName" className="fixed-label">
                First name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={userInfo.given_name}
                readOnly
              />
            </div>

            <div className="form-group inline">
              <label htmlFor="lastName" className="fixed-label">
                Last name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={userInfo.family_name}
                readOnly
              />
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default UserInfo;
