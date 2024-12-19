import React, { useEffect, useState } from "react";
import Header from "./Header";
import "../css/components/Customerselection.css";
import api from "../api";
import componentUtil from "../componentUtil";
import { useNavigate } from "react-router-dom";
const CustomerSelection = ({ selectionHandler }) => {
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [customers, setCustomers] = useState([]);
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        
        const response = await api.getAssignedCustomerIds(true);
        const formattedCustomers = response.map((customer) => ({
          name: customer.customerName || `Customer ${customer.customerId}`, 
          logo: customer.image || "default-logo.png", 
          currencySymbol: customer.currencySymbol,
          currencyPreference: customer.currencyPreference,
          customerId: customer.customerId
        }));
        setCustomers(formattedCustomers);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  const handleSelection = async (customer) => {
    setSelectedCustomer(customer.name);
    setIsNavigating(true);
    await componentUtil.setSelectedCustomerID(customer.customerId);
    await componentUtil.setCurrencySymbol(customer.currencySymbol);
    await componentUtil.setCurrencyPreference(customer.currencyPreference);
    console.log("customerId:::", await componentUtil.getSelectedCustomerID());
    // Redirect to dashboard after a delay
    setTimeout(() => {
      selectionHandler();
      navigate("/");
    }, 2000);
  };

  return (
    <div>
      <Header />
      <div className="customer-selection-container">
        <h2>OPTICS FinOps – Welcome Practitioner, Select a Customer</h2>
        {isNavigating && (
          <p className="navigation-message">
            Redirecting to the Dashboard
          </p>
        )}
        <div className="customer-list">
          {customers.length > 0 ? (
            customers.map((customer) => (
              <div
                key={customer.name}
                className="customer-card"
                onClick={() => handleSelection(customer)}
              >
                <div className="customer-details">
                  <img
                    src={customer.logo}
                    alt={customer.name}
                    className="customer-logo"
                  />
                  <span className="customer-name">{customer.name}</span>
                </div>
                <div
                  className={`round-button ${
                    selectedCustomer === customer.name ? "selected" : ""
                  }`}
                ></div>
              </div>
            ))
          ) : (
            <p>Loading customers...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerSelection;