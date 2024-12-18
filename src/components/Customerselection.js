import React, { useEffect, useState } from "react";
import Header from "./Header";
import "../css/components/Customerselection.css";
import { useNavigate } from "react-router-dom";
import api from "../api";

const CustomerSelection = ({ flag }) => {
  console.log("Flag value:", flag);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        // Fetch customer data from the API
        const response = await api.getAssignedCustomerIds({
          flag: flag ? "yes" : "no",
        });

        // Format the customers list based on API response
        const formattedCustomers = response.map((customer) => ({
          name: customer.customerName || `Customer ${customer.customerId}`, // Default name if missing
          logo: customer.image || "default-logo.png", // Fallback to default image
          currencySymbol: customer.currencySymbol,
          currencyPreference: customer.currencyPreference,
        }));
        setCustomers(formattedCustomers);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, [flag]);

  const handleSelection = async (customerName) => {
    setSelectedCustomer(customerName);
    setIsNavigating(true);

    try {
      // Find customer data by name
      const customerData = customers.find((c) => c.name === customerName);
      if (customerData) {
        await api.setSelectedCustomerName(customerData.name);
        await api.setCurrencySymbol(customerData.currencySymbol);
        await api.setCurrencyPreference(customerData.currencyPreference);
      }
    } catch (error) {
      console.error("Error handling customer selection:", error);
    }

    // Redirect to dashboard after a delay
    setTimeout(() => {
      navigate("/dashboard");
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
                onClick={() => handleSelection(customer.name)}
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
