import moment from "moment";
import componentUtil from "./componentUtil";

const domainUrl = process.env.REACT_APP_API_DOMAIN;
const apiUrl = `${domainUrl}/api/v1`;

// Get the start date of the current previous and next months
// FinOps - Current month is previous month and previous month is older than current month
// on Nov-24 - Current Month - Oct, Previous Month - Sept
const previousMonthStart = moment()
  .subtract(2, "month")
  .startOf("month")
  .format("YYYY-MM-DD");

const currentMonthStart = moment()
  .subtract(1, "month")
  .startOf("month")
  .format("YYYY-MM-DD");

const nextMonthStart = moment()
  .add(1, "month")
  .startOf("month")
  .format("YYYY-MM-DD");

const currentMonthEnd = moment()
  .subtract(1, "months")
  .endOf("month")
  .format("YYYY-MM-DD");
console.log("Moment JS Date", previousMonthStart, currentMonthStart);
const selectedCSP = await componentUtil.getSelectedCSP();
const api = {
  getMonthlyActualSpend: async (inputData) => {
    // Check if inputData is an array (initial data) or an object (filters)
    const isInitialData = Array.isArray(inputData);
    // Construct requestBody based on the type of input data
    const requestBody = {
      CloudServiceProvider: await componentUtil.getSelectedCSP(),
      filters: {
        BillingMonthStartDate: [previousMonthStart, currentMonthStart],
        Subscription: isInitialData ? inputData : inputData.Subscriptions || [],
        BusinessUnit: isInitialData ? [] : inputData.BusinessUnits || [],
        Location: isInitialData ? [] : inputData.Locations || [],
        Application: isInitialData ? [] : inputData.Applications || [],
        Project: isInitialData ? [] : inputData.Projects || [],
        Environment: isInitialData ? [] : inputData.Environments || [],
      },
      customerId: await componentUtil.getSelectedCustomerID(),
    };
    try {
      const response = await fetch(`${apiUrl}/overview/monthly/spend/actual`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + await componentUtil.getAccessToken(),
        },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch actual spend data");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Error fetching actual spend data:", error);
      throw error;
    }
  },

  getMonthlyForecastSpend: async (inputData) => {
    const isInitialData = Array.isArray(inputData);
    const requestBody = {
      CloudServiceProvider: await componentUtil.getSelectedCSP(),
      filters: {
        BillingMonthStartDate: [previousMonthStart, currentMonthStart],
        Subscription: isInitialData ? inputData : inputData.Subscriptions || [],
        BusinessUnit: isInitialData ? [] : inputData.BusinessUnits || [],
        Location: isInitialData ? [] : inputData.Locations || [],
        Application: isInitialData ? [] : inputData.Applications || [],
        Project: isInitialData ? [] : inputData.Projects || [],
        Environment: isInitialData ? [] : inputData.Environments || [],
      },
      customerId: await componentUtil.getSelectedCustomerID(),
    };
    try {
      const response = await fetch(`${apiUrl}/overview/monthly/forecast`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + await componentUtil.getAccessToken(),
        },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch forecast data");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw error;
    }
  },

  getTotalSubscription: async () => {
    try {
      const response = await fetch(`${apiUrl}/overview/suboraccount/count`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + await componentUtil.getAccessToken(),
        },
        body: JSON.stringify({ customerId: await componentUtil.getSelectedCustomerID(),
          CloudServiceProvider: await componentUtil.getSelectedCSP()
         }),
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch subscription for customer `);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching subscription for customer `, error);
      throw error;
    }
  },

  getRecommendations: async () => {
    try {
      const response = await fetch(`${apiUrl}/recommendations/top3`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + await componentUtil.getAccessToken(),
        },
        body: JSON.stringify({ customerId: await componentUtil.getSelectedCustomerID(),
          CloudServiceProvider: await componentUtil.getSelectedCSP()
         }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      throw error;
    }
  },

  getDiscountKPICoverage: async (inputData) => {
    const isInitialData = Array.isArray(inputData);
    const requestBody = {
      CloudServiceProvider: await componentUtil.getSelectedCSP(),
      filters: {
        BillingMonthStartDate: [previousMonthStart, currentMonthStart],
        Subscription: isInitialData ? inputData : inputData.Subscriptions || [],
        BusinessUnit: isInitialData ? [] : inputData.BusinessUnits || [],
        Location: isInitialData ? [] : inputData.Locations || [],
        Application: isInitialData ? [] : inputData.Applications || [],
        Project: isInitialData ? [] : inputData.Projects || [],
        Environment: isInitialData ? [] : inputData.Environments || [],
      },
      customerId: await componentUtil.getSelectedCustomerID(),
    };

    try {
      const response = await fetch(
        `${apiUrl}/overview/KPI/discounts/comittmentbased/coverage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + await componentUtil.getAccessToken(),
          },
          body: JSON.stringify(requestBody),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to kpi coverage data");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw error;
    }
  },

  getDiscountKPIUsage: async () => {
    try {
      const response = await fetch(
        `${apiUrl}/overview/KPI/discounts/comittmentbased/usage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + await componentUtil.getAccessToken(),
          },
          body: JSON.stringify({
            CloudServiceProvider: await componentUtil.getSelectedCSP(),
            filters: {
              Startdate: [previousMonthStart],
              Enddate: [currentMonthEnd],
            },
            customerId: await componentUtil.getSelectedCustomerID(),
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      throw error;
    }
  },

  getOverallSavingsRI: async (inputData) => {
    const isInitialData = Array.isArray(inputData);
    const requestBody = {
      CloudServiceProvider: await componentUtil.getSelectedCSP(),
      filters: {
        BillingMonthStartDate: [previousMonthStart, currentMonthStart],
        Subscription: isInitialData ? inputData : inputData.Subscriptions || [],
        BusinessUnit: isInitialData ? [] : inputData.BusinessUnits || [],
        Location: isInitialData ? [] : inputData.Locations || [],
        Application: isInitialData ? [] : inputData.Applications || [],
        Project: isInitialData ? [] : inputData.Projects || [],
        Environment: isInitialData ? [] : inputData.Environments || [],
      },
      customerId: await componentUtil.getSelectedCustomerID(),
    };
    try {
      const response = await fetch(
        `${apiUrl}/overview/monthly/realized/savings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + await componentUtil.getAccessToken(),
          },
          body: JSON.stringify(requestBody),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch savings ri data");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw error;
    }
  },

  getOverallSavingsStimulated: async (inputData) => {
    const isInitialData = Array.isArray(inputData);
    const requestBody = {
      CloudServiceProvider: await componentUtil.getSelectedCSP(),
      filters: {
        BillingMonthStartDate: [previousMonthStart, currentMonthStart],
        Subscription: isInitialData ? inputData : inputData.Subscriptions || [],
        BusinessUnit: isInitialData ? [] : inputData.BusinessUnits || [],
        Location: isInitialData ? [] : inputData.Locations || [],
        Application: isInitialData ? [] : inputData.Applications || [],
        Project: isInitialData ? [] : inputData.Projects || [],
        Environment: isInitialData ? [] : inputData.Environments || [],
      },
      customerId: await componentUtil.getSelectedCustomerID(),
    };
    try {
      const response = await fetch(
        `${apiUrl}/overview/monthly/realized/simulatedri`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + await componentUtil.getAccessToken(),
          },
          body: JSON.stringify(requestBody),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch savings stimulated data");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      throw error;
    }
  },

  getSubscriptionsByCustomerId: async (customerId) => {
    try {
      const response = await fetch(`${apiUrl}/subscription/${customerId}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + await componentUtil.getAccessToken(),
        },
      });
      if (!response.ok) {
        throw new Error(
          `Failed to fetch subscriptions for customer ${customerId}`
        );
      }
      return await response.json();
    } catch (error) {
      console.error(
        `Error fetching subscriptions for customer ${customerId}:`,
        error
      );
      throw error;
    }
  },

  getMenuItems: async () => {
    try {
      const response = await fetch(`${apiUrl}/overview/menuitems/`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + await componentUtil.getAccessToken(),
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch menuitems for customer `);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching menuitems for customer :`, error);
      throw error;
    }
  },

  getMapData: async (inputData) => {
    const isInitialData = Array.isArray(inputData);
    const requestBody = {
      CloudServiceProvider: await componentUtil.getSelectedCSP(),
      filters: {
        BillingMonthStartDate: [previousMonthStart, currentMonthStart],
        Subscription: isInitialData ? inputData : inputData.Subscriptions || [],
        BusinessUnit: isInitialData ? [] : inputData.BusinessUnits || [],
        Location: isInitialData ? [] : inputData.Locations || [],
        Application: isInitialData ? [] : inputData.Applications || [],
        Project: isInitialData ? [] : inputData.Projects || [],
        Environment: isInitialData ? [] : inputData.Environments || [],
      },
      customerId: await componentUtil.getSelectedCustomerID(),
    };
    try {
      const response = await fetch(`${apiUrl}/overview/locations/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + await componentUtil.getAccessToken(),
        },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch get map data");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  getClientData: async (customerId) => {
    try {
      const response = await fetch(`${apiUrl}/client`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + await componentUtil.getAccessToken(),
        },
        body: JSON.stringify({ customerId: await componentUtil.getSelectedCustomerID() }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch client data");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching client data:", error);
      throw error;
    }
  },

  getBillingCostEachDay: async (inputData) => {
    const isInitialData = Array.isArray(inputData);
    const requestBody = {
      CloudServiceProvider: await componentUtil.getSelectedCSP(),
      filters: {
        StartDate: [previousMonthStart],
        EndDate: [currentMonthEnd],
        Subscription: isInitialData ? inputData : inputData.Subscriptions || [],
        BusinessUnit: isInitialData ? [] : inputData.BusinessUnits || [],
        Location: isInitialData ? [] : inputData.Locations || [],
        Application: isInitialData ? [] : inputData.Applications || [],
        Project: isInitialData ? [] : inputData.Projects || [],
        Environment: isInitialData ? [] : inputData.Environments || [],
      },
      customerId: await componentUtil.getSelectedCustomerID(),
    };

    try {
      const response = await fetch(`${apiUrl}/overview/billcost/total`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + await componentUtil.getAccessToken(),
        },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch billing cost each day data");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      throw error;
    }
  },
  getOverallConsumptionForSubscription: async (inputData) => {
    const isInitialData = Array.isArray(inputData);
    const requestBody = {
      CloudServiceProvider: await componentUtil.getSelectedCSP(),
      filters: {
        BillingMonthStartDate: [previousMonthStart, currentMonthStart],
        Subscription: isInitialData ? inputData : inputData.Subscriptions || [],
        BusinessUnit: isInitialData ? [] : inputData.BusinessUnits || [],
        Location: isInitialData ? [] : inputData.Locations || [],
        Application: isInitialData ? [] : inputData.Applications || [],
        Project: isInitialData ? [] : inputData.Projects || [],
        Environment: isInitialData ? [] : inputData.Environments || [],
      },
      customerId: await componentUtil.getSelectedCustomerID(),
    };
    try {
      const response = await fetch(`${apiUrl}/overview/subscriptions/top/2`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + await componentUtil.getAccessToken(),
        },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch consumption for subscription data");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw error;
    }
  },
  getOverallConsumptionForApplication: async (inputData) => {
    const isInitialData = Array.isArray(inputData);
    const requestBody = {
      CloudServiceProvider: await componentUtil.getSelectedCSP(),
      filters: {
        BillingMonthStartDate: [previousMonthStart, currentMonthStart],
        Subscription: isInitialData ? inputData : inputData.Subscriptions || [],
        BusinessUnit: isInitialData ? [] : inputData.BusinessUnits || [],
        Location: isInitialData ? [] : inputData.Locations || [],
        Application: isInitialData ? [] : inputData.Applications || [],
        Project: isInitialData ? [] : inputData.Projects || [],
        Environment: isInitialData ? [] : inputData.Environments || [],
      },
      customerId: await componentUtil.getSelectedCustomerID(),
    };
    try {
      const response = await fetch(`${apiUrl}/common/topapplications/2`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + await componentUtil.getAccessToken(),
        },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch consumption for application data");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error(
        "Error fetching overall consumption application data:",
        error
      );
      throw error;
    }
  },
  getOverallConsumptionForServies: async (inputData) => {
    const isInitialData = Array.isArray(inputData);
    const requestBody = {
      CloudServiceProvider: await componentUtil.getSelectedCSP(),
      filters: {
        BillingMonthStartDate: [previousMonthStart, currentMonthStart],
        Subscription: isInitialData ? inputData : inputData.Subscriptions || [],
        BusinessUnit: isInitialData ? [] : inputData.BusinessUnits || [],
        Location: isInitialData ? [] : inputData.Locations || [],
        Application: isInitialData ? [] : inputData.Applications || [],
        Project: isInitialData ? [] : inputData.Projects || [],
        Environment: isInitialData ? [] : inputData.Environments || [],
      },
      customerId: await componentUtil.getSelectedCustomerID(),
    };
    try {
      const response = await fetch(`${apiUrl}/common/topservices/2`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + await componentUtil.getAccessToken(),
        },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch overall consumption services data");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Error fetching overall consumption services data:", error);
      throw error;
    }
  },

  getOverallConsumptionForTagCompliance: async (inputData) => {
    const isInitialData = Array.isArray(inputData);
    const requestBody = {
      CloudServiceProvider: await componentUtil.getSelectedCSP(),
      filters: {
        BillingMonthStartDate: [previousMonthStart, currentMonthStart],
        Subscription: isInitialData ? inputData : inputData.Subscriptions || [],
        BusinessUnit: isInitialData ? [] : inputData.BusinessUnits || [],
        Location: isInitialData ? [] : inputData.Locations || [],
        Application: isInitialData ? [] : inputData.Applications || [],
        Project: isInitialData ? [] : inputData.Projects || [],
        Environment: isInitialData ? [] : inputData.Environments || [],
      },
      customerId: await componentUtil.getSelectedCustomerID(),
    };
    try {
      const response = await fetch(`${apiUrl}/overview/compliance/tag`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + await componentUtil.getAccessToken(),
        },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        throw new Error(
          "Failed to fetch overall consumption tag compliance data"
        );
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw error;
    }
  },
  getAllFilters: async () => {
    try {
      const response = await fetch(`${apiUrl}/filters`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + await componentUtil.getAccessToken(),
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch filters `);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching filters :`, error);
      throw error;
    }
  },
  getFilterBasedOnSelection: async (selectedFilters) => {
    try {
      const response = await fetch(`${apiUrl}/filters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + await componentUtil.getAccessToken(),
        },
        body: JSON.stringify({
          CloudServiceProvider: selectedCSP,
          filters: {
            BillingMonthStartDate: [previousMonthStart, currentMonthStart],
            Subscription: selectedFilters.subscriptions || [],
            BusinessUnit: selectedFilters.businessUnits || [],
            Location: selectedFilters.locations || [],
            Application: selectedFilters.applications || [],
            Project: selectedFilters.projects || [],
            Environment: selectedFilters.environments || [],
          },
          customerId: await componentUtil.getSelectedCustomerID(),
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch filter on selection");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching filter on selection:", error);
      throw error;
    }
  },

  getFilterForDropDown: async () => {
    try {
      const response = await fetch(`${apiUrl}/filters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + await componentUtil.getAccessToken(),
        },
        body: JSON.stringify({
          CloudServiceProvider: selectedCSP,
          filters: {
            BillingMonthStartDate: [
              previousMonthStart,
              currentMonthStart,
              nextMonthStart,
            ],
          },
          customerId: await componentUtil.getSelectedCustomerID(),
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch filter on selection");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching filter on selection:", error);
      throw error;
    }
  },

  /* with bill overview page  */

  getSavings: async (inputData) => {
    const isInitialData = Array.isArray(inputData);
    const requestBody = {
      CloudServiceProvider: selectedCSP,
      filters: {
        billingStartDate: [
          previousMonthStart,
          currentMonthStart,
          nextMonthStart,
        ],
        Subscription: isInitialData ? inputData : inputData.Subscriptions || [],
        BusinessUnit: isInitialData ? [] : inputData.BusinessUnits || [],
        Location: isInitialData ? [] : inputData.Locations || [],
        Application: isInitialData ? [] : inputData.Applications || [],
        Project: isInitialData ? [] : inputData.Projects || [],
        Environment: isInitialData ? [] : inputData.Environments || [],
      },
      customerId: await componentUtil.getSelectedCustomerID(),
    };
    try {
      const response = await fetch(`${apiUrl}/billoverview/header`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + await componentUtil.getAccessToken(),
        },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        throw new Error("Failed to savings data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching savings data:", error);
      throw error;
    }
  },

  getNormalizedVariation: async (inputData) => {
    const isInitialData = Array.isArray(inputData);
    const requestBody = {
      CloudServiceProvider: selectedCSP,
      filters: {
        billingStartDate: [currentMonthStart],
        Subscription: isInitialData ? inputData : inputData.Subscriptions || [],
        BusinessUnit: isInitialData ? [] : inputData.BusinessUnits || [],
        Location: isInitialData ? [] : inputData.Locations || [],
        Application: isInitialData ? [] : inputData.Applications || [],
        Project: isInitialData ? [] : inputData.Projects || [],
        Environment: isInitialData ? [] : inputData.Environments || [],
      },
      customerId: await componentUtil.getSelectedCustomerID(),
    };
    try {
      const response = await fetch(`${apiUrl}/normalized-variation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + await componentUtil.getAccessToken(),
        },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        throw new Error("Failed to normalized-variation data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching normalized-variation data:", error);
      throw error;
    }
  },

  getInvoiceView: async (inputData) => {
    const isInitialData = Array.isArray(inputData);
    const requestBody = {
      CloudServiceProvider: selectedCSP,
      filters: {
        BillingMonthStartDate: [
          previousMonthStart,
          currentMonthStart,
          nextMonthStart,
        ],
        Subscription: isInitialData ? inputData : inputData.Subscriptions || [],
        BusinessUnit: isInitialData ? [] : inputData.BusinessUnits || [],
        Location: isInitialData ? [] : inputData.Locations || [],
        Application: isInitialData ? [] : inputData.Applications || [],
        Project: isInitialData ? [] : inputData.Projects || [],
        Environment: isInitialData ? [] : inputData.Environments || [],
      },
      customerId: await componentUtil.getSelectedCustomerID(),
    };
    try {
      const response = await fetch(`${apiUrl}/billoverview/invoice_view`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + await componentUtil.getAccessToken(),
        },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        throw new Error("Failed to data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  getTotalBillVsSimulatedPaygo: async (inputData) => {
    const isInitialData = Array.isArray(inputData);
    const requestBody = {
      CloudServiceProvider: selectedCSP,
      filters: {
        BillingMonthStartDate: [
          previousMonthStart,
          currentMonthStart,
          nextMonthStart,
        ],
        Subscription: isInitialData ? inputData : inputData.Subscriptions || [],
        BusinessUnit: isInitialData ? [] : inputData.BusinessUnits || [],
        Location: isInitialData ? [] : inputData.Locations || [],
        Application: isInitialData ? [] : inputData.Applications || [],
        Project: isInitialData ? [] : inputData.Projects || [],
        Environment: isInitialData ? [] : inputData.Environments || [],
      },
      customerId: await componentUtil.getSelectedCustomerID(),
    };
    try {
      const response = await fetch(
        `${apiUrl}/billoverview/total_bill_vs_simulated_paygo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + await componentUtil.getAccessToken(),
          },
          body: JSON.stringify(requestBody),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  getTopServies: async (inputData) => {
    const isInitialData = Array.isArray(inputData);
    const requestBody = {
      CloudServiceProvider: selectedCSP,
      filters: {
        BillingMonthStartDate: [
          previousMonthStart,
          currentMonthStart,
          nextMonthStart,
        ],
        Subscription: isInitialData ? inputData : inputData.Subscriptions || [],
        BusinessUnit: isInitialData ? [] : inputData.BusinessUnits || [],
        Location: isInitialData ? [] : inputData.Locations || [],
        Application: isInitialData ? [] : inputData.Applications || [],
        Project: isInitialData ? [] : inputData.Projects || [],
        Environment: isInitialData ? [] : inputData.Environments || [],
      },
      customerId: await componentUtil.getSelectedCustomerID(),
    };
    try {
      const response = await fetch(`${apiUrl}/common/topservices/5`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + await componentUtil.getAccessToken(),
        },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch  services data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching services data:", error);
      throw error;
    }
  },
  getTopApplications: async (inputData) => {
    const isInitialData = Array.isArray(inputData);
    const requestBody = {
      CloudServiceProvider: selectedCSP,
      filters: {
        BillingMonthStartDate: [
          previousMonthStart,
          currentMonthStart,
          nextMonthStart,
        ],
        Subscription: isInitialData ? inputData : inputData.Subscriptions || [],
        BusinessUnit: isInitialData ? [] : inputData.BusinessUnits || [],
        Location: isInitialData ? [] : inputData.Locations || [],
        Application: isInitialData ? [] : inputData.Applications || [],
        Project: isInitialData ? [] : inputData.Projects || [],
        Environment: isInitialData ? [] : inputData.Environments || [],
      },
      customerId: await componentUtil.getSelectedCustomerID(),
    };
    try {
      const response = await fetch(`${apiUrl}/common/topapplications/5`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + await componentUtil.getAccessToken(),
        },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch  application data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching  application data:", error);
      throw error;
    }
  },

  /* with business cost split page  */

  getApplicationWithTags: async () => {
    try {
      const response = await fetch(
        `${apiUrl}/buisnesscostsplit/header/applicationwithtags`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + await componentUtil.getAccessToken(),
          },
          body: JSON.stringify({
            CloudServiceProvider: selectedCSP,
            filters: {
              BillingMonthStartDate: [previousMonthStart, currentMonthStart],
              Subscription: ["Subscription2"],
            },
            customerId: await componentUtil.getSelectedCustomerID(),
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  getApplicationWithoutTags: async () => {
    try {
      const response = await fetch(
        `${apiUrl}/buisnesscostsplit/header/applicationwithouttags`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + await componentUtil.getAccessToken(),
          },
          body: JSON.stringify({
            CloudServiceProvider: selectedCSP,
            filters: {
              BillingMonthStartDate: [previousMonthStart, currentMonthStart],
              Subscription: ["Subscription2"],
            },
            customerId: await componentUtil.getSelectedCustomerID(),
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  getProjectWithTags: async () => {
    try {
      const response = await fetch(
        `${apiUrl}/buisnesscostsplit/header/projectwithtags`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + await componentUtil.getAccessToken(),
          },
          body: JSON.stringify({
            CloudServiceProvider: selectedCSP,
            filters: {
              BillingMonthStartDate: [previousMonthStart, currentMonthStart],
              Subscription: ["Subscription2"],
            },
            customerId: await componentUtil.getSelectedCustomerID(),
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  getProjectWithoutTags: async () => {
    try {
      const response = await fetch(
        `${apiUrl}/buisnesscostsplit/header/projectwithouttags`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + await componentUtil.getAccessToken(),
          },
          body: JSON.stringify({
            CloudServiceProvider: selectedCSP,
            filters: {
              BillingMonthStartDate: [previousMonthStart, currentMonthStart],
              Subscription: ["Subscription2"],
            },
            customerId: await componentUtil.getSelectedCustomerID(),
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  getBillAllocation: async (inputData) => {
    const isInitialData = Array.isArray(inputData);
    const requestBody = {
      CloudServiceProvider: selectedCSP,
      filters: {
        BillingMonthStartDate: [
          previousMonthStart,
          currentMonthStart,
          nextMonthStart,
        ],
        Subscription: isInitialData ? inputData : inputData.Subscriptions || [],
        BusinessUnit: isInitialData ? [] : inputData.BusinessUnits || [],
        Location: isInitialData ? [] : inputData.Locations || [],
        Application: isInitialData ? [] : inputData.Applications || [],
        Project: isInitialData ? [] : inputData.Projects || [],
        Environment: isInitialData ? [] : inputData.Environments || [],
      },
      customerId: await componentUtil.getSelectedCustomerID(),
    };
    try {
      const response = await fetch(
        `${apiUrl}/billoverview/billallocationapplication`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + await componentUtil.getAccessToken(),
          },
          body: JSON.stringify(requestBody),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  // getBillAllocation: async (inputData) => {
  //   const isInitialData = Array.isArray(inputData);
  //   const requestBody = {
  //     CloudServiceProvider: selectedCSP,
  //     filters: {
  //       BillingMonthStartDate: [
  //         previousMonthStart,
  //         currentMonthStart,
  //         nextMonthStart,
  //       ],
  //       Subscription: isInitialData ? inputData : inputData.Subscriptions || [],
  //       BusinessUnit: isInitialData ? [] : inputData.BusinessUnits || [],
  //       Location: isInitialData ? [] : inputData.Locations || [],
  //       Application: isInitialData ? [] : inputData.Applications || [],
  //       Project: isInitialData ? [] : inputData.Projects || [],
  //       Environment: isInitialData ? [] : inputData.Environments || [],
  //     },
  //     customerId: await componentUtil.getSelectedCustomerID(),
  //   };
  //   try {
  //     const response = await fetch(
  //       `${apiUrl}/billoverview/billallocationapplication`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer " + await componentUtil.getAccessToken(),
  //         },
  //         body: JSON.stringify(requestBody),
  //       }
  //     );
  //     if (!response.ok) {
  //       throw new Error("Failed to data");
  //     }
  //     return await response.json();
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     throw error;
  //   }
  // },

  getDataForAnomaly: async () => {
    try {
      const response = await fetch(`${apiUrl}/businesscostsplit/anomaly`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + await componentUtil.getAccessToken(),
        },
        body: JSON.stringify({
          CloudServiceProvider: selectedCSP,
          filters: {
            BillingMonthStartDate: ["2024-04-01", "2024-05-01", "2024-06-01"],
            Subscription: ["Subscription2"],
          },
          customerId: await componentUtil.getSelectedCustomerID(),
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to data");
      }
      //return await response.json();
      const data = await response.json();
      console.log("API Response Data:", data); // Log the response data
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  getServiceCategoryCost: async () => {
    try {
      const response = await fetch(
        `${apiUrl}/buisnesscostsplit/servicecategorycost`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + await componentUtil.getAccessToken(),
          },
          body: JSON.stringify({
            CloudServiceProvider: selectedCSP,
            filters: {
              BillingMonthStartDate: [previousMonthStart, currentMonthStart],
              Subscription: ["Subscription2", "Subscription1"],
            },
            customerId: await componentUtil.getSelectedCustomerID(),
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  getMonthBillAndIncreasedPercentage: async () => {
    try {
      const response = await fetch(`${apiUrl}/overview/monthly/spend/actual`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + await componentUtil.getAccessToken(),
        },
        body: JSON.stringify({
          CloudServiceProvider: selectedCSP,
          filters: {
            BillingMonthStartDate: [
              previousMonthStart,
              currentMonthStart,
              nextMonthStart,
            ],
          },
          customerId: await componentUtil.getSelectedCustomerID(),
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  getTotalResouces: async () => {
    try {
      const response = await fetch(
        `${apiUrl}/inventorycostsplit/header/totalresources`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + await componentUtil.getAccessToken(),
          },
          body: JSON.stringify({
            CloudServiceProvider: selectedCSP,
            filters: {
              BillingMonthStartDate: [
                previousMonthStart,
                currentMonthStart,
                nextMonthStart,
              ],
            },
            customerId: await componentUtil.getSelectedCustomerID(),
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  getCloudInventoryCount: async () => {
    try {
      const response = await fetch(
        `${apiUrl}/inventorycostsplit/cloudinventory/count`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + await componentUtil.getAccessToken(),
          },
          body: JSON.stringify({
            CloudServiceProvider: selectedCSP,
            filters: {},
            customerId: await componentUtil.getSelectedCustomerID(),
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  getCloudInventory: async (subscription, page) => {
    try {
      const response = await fetch(
        `${apiUrl}/inventorycostsplit/cloudinventory`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + await componentUtil.getAccessToken(),
          },
          body: JSON.stringify({
            CloudServiceProvider: selectedCSP,
            filters: {
              BillingMonthStartDate: ["2024-09-01"],
              Subscription: [subscription],
            },
            customerId: await componentUtil.getSelectedCustomerID(),
            page: page.toString(),
            pageSize: "1000",
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  getCountUnattachedDisk1: async () => {
    try {
      const response = await fetch(
        `${apiUrl}/costoptimization/manageddisk/totalcount`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + await componentUtil.getAccessToken(),
          },
          body: JSON.stringify({
            CloudServiceProvider: selectedCSP,
            filters: {
              Subscription: ["Subscription1"],
              BusinessUnit: [],
            },
            customerId: await componentUtil.getSelectedCustomerID(),
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch actual disk data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching actual spend data:", error);
      throw error;
    }
  },

  getTotalOnDemandCost: async () => {
    try {
      const response = await fetch(
        `${apiUrl}/costoptimization/manageddisk/cost`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + await componentUtil.getAccessToken(),
          },
          body: JSON.stringify({
            CloudServiceProvider: selectedCSP,
            filters: {
              Subscription: ["Subscription2"],
            },
            customerId: await componentUtil.getSelectedCustomerID(),
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  getImpactedApplications: async () => {
    try {
      const response = await fetch(
        `${apiUrl}/costoptimization/manageddisk/impcatedapplications`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + await componentUtil.getAccessToken(),
          },
          body: JSON.stringify({
            CloudServiceProvider: selectedCSP,
            filters: {
              Subscription: ["Subscription1"],
            },
            customerId: await componentUtil.getSelectedCustomerID(),
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  getSubscriptionOnDemandConsumedMeter: async () => {
    try {
      const response = await fetch(
        `${apiUrl}/costoptimization/manageddisk/ondemandvsconsumed`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + await componentUtil.getAccessToken(),
          },
          body: JSON.stringify({
            CloudServiceProvider: selectedCSP,
            filters: {
              Subscription: ["Subscription2", "Subscription1"],
            },
            customerId: await componentUtil.getSelectedCustomerID(),
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  getDisktypevsCost: async () => {
    try {
      const response = await fetch(
        `${apiUrl}/costoptimization/manageddisk/disktypevscost`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + await componentUtil.getAccessToken(),
          },
          body: JSON.stringify({
            CloudServiceProvider: selectedCSP,
            filters: {
              Subscription: ["Subscription2"],
              // BusinessUnit: ["BU574862", "BU425929"],
              // Application: ["Demo-Application199", "Demo-Application212"],
              // Owner: [
              //   "business.owner132@test.com",
              //   "business.owner128@test.com",
              // ],
              // Service: ["Storage"],
            },
            customerId: await componentUtil.getSelectedCustomerID(),
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  getDisktypevsConsumedMeter: async () => {
    try {
      const response = await fetch(
        `${apiUrl}/costoptimization/manageddisk/diskvscosumedmeter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + await componentUtil.getAccessToken(),
          },
          body: JSON.stringify({
            CloudServiceProvider: selectedCSP,
            filters: {
              Subscription: ["Subscription2"],
            },
            customerId: await componentUtil.getSelectedCustomerID(),
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  getDiskAcrossLocations: async () => {
    try {
      const response = await fetch(
        `${apiUrl}/costoptimization/manageddisk/locations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + await componentUtil.getAccessToken(),
          },
          body: JSON.stringify({
            CloudServiceProvider: selectedCSP,
            filters: {
              Subscription: ["Subscription2"],
            },
            customerId: await componentUtil.getSelectedCustomerID(),
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  getCostAllocations: async () => {
    try {
      const response = await fetch(
        `${apiUrl}/costoptimization/manageddisk/costallocation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + await componentUtil.getAccessToken(),
          },
          body: JSON.stringify({
            CloudServiceProvider: selectedCSP,
            filters: {
              Subscription: ["Subscription2", "Subscription1"],
            },
            customerId: await componentUtil.getSelectedCustomerID(),
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  getAssignedCustomerIds: async () => {
    try {
      const response = await fetch(`${apiUrl}/csp_customers/customerIdList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + await componentUtil.getAccessToken(),
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
};

export default api;
