import moment from "moment";
import componentUtil from "./componentUtil";

const domainUrl = process.env.REACT_APP_API_DOMAIN;
const apiUrl = `${domainUrl}/api/v1`;

// Get the start date of the current previous and next months
// FinOps - Current month is previous month and previous month is older than current month
// on Nov-24 - Current Month - Oct, Previous Month - Sept
const lastPreviousMonthStart = moment()
  .subtract(5, "month")
  .startOf("month")
  .format("YYYY-MM-DD");

const previousMonthStart = moment()
  .subtract(4, "month")
  .startOf("month")
  .format("YYYY-MM-DD");

const currentMonthStart = moment()
  .subtract(3, "month")
  .startOf("month")
  .format("YYYY-MM-DD");

const nextMonthStart = moment()
  .add(1, "month")
  .startOf("month")
  .format("YYYY-MM-DD");

const currentMonthEnd = moment()
  .subtract(2, "months")
  .endOf("month")
  .format("YYYY-MM-DD");

console.log("Moment JS Date", previousMonthStart, currentMonthStart);
const selectedCSP = componentUtil.getSelectedCSP();
const api = {
  getCloudProviderList: async () => {
    const requestBody = {
      customerId: await componentUtil.getSelectedCustomerID(),
    };
    try {
      const response = await fetch(
        `${apiUrl}/csp_customers/cloudproviderslist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await componentUtil.getAccessToken()),
          },
          body: JSON.stringify(requestBody),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to ");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Error data:", error);
      throw error;
    }
  },

  getMonthlyActualSpend: async (selectedFilters, billingMonth) => {
    const requestBody = {
      CloudServiceProvider: componentUtil.getSelectedCSP(),
      filters: {
        BillingMonthStartDate: billingMonth,
        ...selectedFilters,
      },
      customerId: await componentUtil.getSelectedCustomerID(),
    };
    try {
      const response = await fetch(`${apiUrl}/overview/monthly/spend/actual`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await componentUtil.getAccessToken()),
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

  getMonthlyForecastSpend: async (selectedFilters, billingMonth) => {
    const requestBody = {
      CloudServiceProvider: componentUtil.getSelectedCSP(),
      filters: {
        BillingMonthStartDate: billingMonth,
        ...selectedFilters,
      },
      customerId: await componentUtil.getSelectedCustomerID(),
    };
    try {
      const response = await fetch(`${apiUrl}/overview/monthly/forecast`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await componentUtil.getAccessToken()),
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
          Authorization: "Bearer " + (await componentUtil.getAccessToken()),
        },
        body: JSON.stringify({
          customerId: await componentUtil.getSelectedCustomerID(),
          CloudServiceProvider: componentUtil.getSelectedCSP(),
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
          Authorization: "Bearer " + (await componentUtil.getAccessToken()),
        },
        body: JSON.stringify({
          customerId: await componentUtil.getSelectedCustomerID(),
          CloudServiceProvider: componentUtil.getSelectedCSP(),
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

  getDiscountKPICoverage: async (selectedFilters, billingMonth) => {
    const requestBody = {
      CloudServiceProvider: componentUtil.getSelectedCSP(),
      filters: {
        BillingMonthStartDate: billingMonth,
        ...selectedFilters,
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
            Authorization: "Bearer " + (await componentUtil.getAccessToken()),
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

  getDiscountKPIUsage: async (startDate, endDate) => {
    try {
      const response = await fetch(
        `${apiUrl}/overview/KPI/discounts/comittmentbased/usage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await componentUtil.getAccessToken()),
          },
          body: JSON.stringify({
            CloudServiceProvider: componentUtil.getSelectedCSP(),
            filters: {
              Startdate: startDate,
              Enddate: endDate,
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

  getOverallSavingsRI: async (selectedFilters, billingMonth) => {
    const requestBody = {
      CloudServiceProvider: componentUtil.getSelectedCSP(),
      filters: {
        BillingMonthStartDate: billingMonth,
        ...selectedFilters,
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
            Authorization: "Bearer " + (await componentUtil.getAccessToken()),
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

  getOverallSavingsStimulated: async (selectedFilters, billingMonth) => {
    const requestBody = {
      CloudServiceProvider: componentUtil.getSelectedCSP(),
      filters: {
        BillingMonthStartDate: billingMonth,
        ...selectedFilters,
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
            Authorization: "Bearer " + (await componentUtil.getAccessToken()),
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
          Authorization: "Bearer " + (await componentUtil.getAccessToken()),
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
          Authorization: "Bearer " + (await componentUtil.getAccessToken()),
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

  getMapData: async (selectedFilters, billingMonth) => {
    const requestBody = {
      CloudServiceProvider: componentUtil.getSelectedCSP(),
      filters: {
        BillingMonthStartDate: billingMonth,
        ...selectedFilters,
      },
      customerId: await componentUtil.getSelectedCustomerID(),
    };
    try {
      const response = await fetch(`${apiUrl}/overview/locations/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await componentUtil.getAccessToken()),
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
          Authorization: "Bearer " + (await componentUtil.getAccessToken()),
        },
        body: JSON.stringify({
          customerId: await componentUtil.getSelectedCustomerID(),
        }),
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

  getBillingCostEachDay: async (selectedFilters, startDate, endDate) => {
    const requestBody = {
      CloudServiceProvider: componentUtil.getSelectedCSP(),
      filters: {
        StartDate: startDate,
        EndDate: endDate,
        ...selectedFilters,
      },
      customerId: await componentUtil.getSelectedCustomerID(),
    };

    try {
      const response = await fetch(`${apiUrl}/overview/billcost/total`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await componentUtil.getAccessToken()),
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
  getOverallConsumptionForSubscription: async (
    selectedFilters,
    billingMonth
  ) => {
    const requestBody = {
      CloudServiceProvider: componentUtil.getSelectedCSP(),
      filters: {
        BillingMonthStartDate: billingMonth,
        ...selectedFilters,
      },
      customerId: await componentUtil.getSelectedCustomerID(),
    };
    try {
      const response = await fetch(`${apiUrl}/overview/subscriptions/top/3`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await componentUtil.getAccessToken()),
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
  getOverallConsumptionForApplication: async (
    selectedFilters,
    billingMonth
  ) => {
    const requestBody = {
      CloudServiceProvider: componentUtil.getSelectedCSP(),
      filters: {
        BillingMonthStartDate: billingMonth,
        ...selectedFilters,
      },
      customerId: await componentUtil.getSelectedCustomerID(),
    };
    try {
      const response = await fetch(`${apiUrl}/common/topapplications/3`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await componentUtil.getAccessToken()),
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
  getOverallConsumptionForServies: async (selectedFilters, billingMonth) => {
    const requestBody = {
      CloudServiceProvider: componentUtil.getSelectedCSP(),
      filters: {
        BillingMonthStartDate: billingMonth,
        ...selectedFilters,
      },
      customerId: await componentUtil.getSelectedCustomerID(),
    };
    try {
      const response = await fetch(`${apiUrl}/common/topservices/3`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await componentUtil.getAccessToken()),
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

  getOverallConsumptionForTagCompliance: async (
    selectedFilters,
    billingMonth
  ) => {
    const requestBody = {
      CloudServiceProvider: componentUtil.getSelectedCSP(),
      filters: {
        BillingMonthStartDate: billingMonth,
        ...selectedFilters,
      },
      customerId: await componentUtil.getSelectedCustomerID(),
    };
    try {
      const response = await fetch(`${apiUrl}/overview/compliance/tag`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await componentUtil.getAccessToken()),
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
          Authorization: "Bearer " + (await componentUtil.getAccessToken()),
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
          Authorization: "Bearer " + (await componentUtil.getAccessToken()),
        },
        body: JSON.stringify({
          CloudServiceProvider: componentUtil.getSelectedCSP(),
          filters: {
            BillingMonthStartDate: [previousMonthStart, currentMonthStart],
            ...selectedFilters,
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
          Authorization: "Bearer " + (await componentUtil.getAccessToken()),
        },
        body: JSON.stringify({
          CloudServiceProvider: componentUtil.getSelectedCSP(),
          filters: {
            BillingMonthStartDate: [
              previousMonthStart,
              currentMonthStart,
              nextMonthStart,
            ],
          },
          datesOnly: true,
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

  getSavings: async (selectedFilters, billingMonth) => {
    const requestBody = {
      CloudServiceProvider: componentUtil.getSelectedCSP(),
      filters: {
        BillingMonthStartDate: billingMonth,
        ...selectedFilters,
      },
      customerId: await componentUtil.getSelectedCustomerID(),
    };
    try {
      const response = await fetch(`${apiUrl}/billoverview/header`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await componentUtil.getAccessToken()),
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

  getNormalizedVariation: async (selectedFilters, billingMonth) => {
    const requestBody = {
      CloudServiceProvider: componentUtil.getSelectedCSP(),
      filters: {
        BillingMonthStartDate: billingMonth,
        ...selectedFilters,
      },
      customerId: await componentUtil.getSelectedCustomerID(),
    };
    try {
      const response = await fetch(`${apiUrl}/normalized-variation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await componentUtil.getAccessToken()),
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

  getInvoiceView: async (selectedFilters, billingMonth) => {
    const requestBody = {
      CloudServiceProvider: componentUtil.getSelectedCSP(),
      filters: {
        BillingMonthStartDate: billingMonth,
        ...selectedFilters,
      },
      customerId: await componentUtil.getSelectedCustomerID(),
    };
    try {
      const response = await fetch(`${apiUrl}/billoverview/invoice_view`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await componentUtil.getAccessToken()),
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

  getTotalBillVsSimulatedPaygo: async (selectedFilters, billingMonth) => {
    const requestBody = {
      CloudServiceProvider: componentUtil.getSelectedCSP(),
      filters: {
        BillingMonthStartDate: billingMonth,
        ...selectedFilters,
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
            Authorization: "Bearer " + (await componentUtil.getAccessToken()),
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
  getTopServies: async (selectedFilters, billingMonth) => {
    const requestBody = {
      CloudServiceProvider: componentUtil.getSelectedCSP(),
      filters: {
        BillingMonthStartDate: billingMonth,
        ...selectedFilters,
      },
      customerId: await componentUtil.getSelectedCustomerID(),
    };
    try {
      const response = await fetch(`${apiUrl}/common/topservices/5`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await componentUtil.getAccessToken()),
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
  getTopApplications: async (selectedFilters, billingMonth) => {
    const requestBody = {
      CloudServiceProvider: componentUtil.getSelectedCSP(),
      filters: {
        BillingMonthStartDate: billingMonth,
        ...selectedFilters,
      },
      customerId: await componentUtil.getSelectedCustomerID(),
    };
    try {
      const response = await fetch(`${apiUrl}/common/topapplications/5`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await componentUtil.getAccessToken()),
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

  getApplicationWithTags: async (selectedFilters, billingMonth) => {
    const requestBody = {
      CloudServiceProvider: componentUtil.getSelectedCSP(),
      filters: {
        BillingMonthStartDate: billingMonth,
        ...selectedFilters,
      },
      customerId: await componentUtil.getSelectedCustomerID(),
    };

    try {
      const response = await fetch(
        `${apiUrl}/buisnesscostsplit/header/applicationwithtags`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await componentUtil.getAccessToken()),
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

  getApplicationWithoutTags: async (selectedFilters, billingMonth) => {
    const requestBody = {
      CloudServiceProvider: componentUtil.getSelectedCSP(),
      filters: {
        BillingMonthStartDate: billingMonth,
        ...selectedFilters,
      },
      customerId: await componentUtil.getSelectedCustomerID(),
    };

    try {
      const response = await fetch(
        `${apiUrl}/buisnesscostsplit/header/applicationwithouttags`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await componentUtil.getAccessToken()),
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

  getProjectWithTags: async (selectedFilters, billingMonth) => {
    const requestBody = {
      CloudServiceProvider: componentUtil.getSelectedCSP(),
      filters: {
        BillingMonthStartDate: billingMonth,
        ...selectedFilters,
      },
      customerId: await componentUtil.getSelectedCustomerID(),
    };

    try {
      const response = await fetch(
        `${apiUrl}/buisnesscostsplit/header/projectwithtags`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await componentUtil.getAccessToken()),
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

  getProjectWithoutTags: async (selectedFilters, billingMonth) => {
    const requestBody = {
      CloudServiceProvider: componentUtil.getSelectedCSP(),
      filters: {
        BillingMonthStartDate: billingMonth,
        ...selectedFilters,
      },
      customerId: await componentUtil.getSelectedCustomerID(),
    };

    try {
      const response = await fetch(
        `${apiUrl}/buisnesscostsplit/header/projectwithouttags`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await componentUtil.getAccessToken()),
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

  getBillAllocation: async (selectedFilters, billingMonth) => {
    const requestBody = {
      CloudServiceProvider: componentUtil.getSelectedCSP(),
      filters: {
        BillingMonthStartDate: billingMonth,
        ...selectedFilters,
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
            Authorization: "Bearer " + (await componentUtil.getAccessToken()),
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

  getDataForAnomaly: async (selectedFilters, billingMonth) => {
    const requestBody = {
      CloudServiceProvider: componentUtil.getSelectedCSP(),
      filters: {
        BillingMonthStartDate: billingMonth,
        ...selectedFilters,
      },
      customerId: await componentUtil.getSelectedCustomerID(),
    };
    try {
      const response = await fetch(`${apiUrl}/businesscostsplit/anomaly`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await componentUtil.getAccessToken()),
        },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        throw new Error("Failed to data");
      }
      //return await response.json();
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  getServiceCategoryCost: async (selectedFilters, billingMonth) => {
    const requestBody = {
      CloudServiceProvider: componentUtil.getSelectedCSP(),
      filters: {
        BillingMonthStartDate: billingMonth,
        ...selectedFilters,
      },
      customerId: await componentUtil.getSelectedCustomerID(),
    };

    try {
      const response = await fetch(
        `${apiUrl}/buisnesscostsplit/servicecategorycost`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await componentUtil.getAccessToken()),
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

  getMonthBillAndIncreasedPercentage: async (selectedFilters, billingMonth) => {
    try {
      const response = await fetch(`${apiUrl}/overview/monthly/spend/actual`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await componentUtil.getAccessToken()),
        },
        body: JSON.stringify({
          CloudServiceProvider: componentUtil.getSelectedCSP(),
          filters: {
            BillingMonthStartDate: billingMonth,
            ...selectedFilters,
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

  getTotalResouces: async (selectedFilters, billingMonth) => {
    try {
      const response = await fetch(
        `${apiUrl}/inventorycostsplit/header/totalresources`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await componentUtil.getAccessToken()),
          },
          body: JSON.stringify({
            CloudServiceProvider: componentUtil.getSelectedCSP(),
            filters: {
              BillingMonthStartDate: billingMonth,
              ...selectedFilters,
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
            Authorization: "Bearer " + (await componentUtil.getAccessToken()),
          },
          body: JSON.stringify({
            CloudServiceProvider: componentUtil.getSelectedCSP(),
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

  getCloudInventory: async (
    subscription,
    page,
    selectedCSP,
    billingMonth,
    selectedFilters
  ) => {
    try {
      let keyName = "SubscriptionName";
      if (selectedCSP == 110) {
        keyName = "BillingAccountName";
      }

      const response = await fetch(
        `${apiUrl}/inventorycostsplit/cloudinventory`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await componentUtil.getAccessToken()),
          },
          body: JSON.stringify({
            CloudServiceProvider: componentUtil.getSelectedCSP(),
            filters: {
              ...selectedFilters,
              BillingMonthStartDate: billingMonth,
              [keyName]: [subscription],
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

  getTotalRecommendations: async () => {
    try {
      const response = await fetch(
        `${apiUrl}/costoptimization/advisor/totalrecommendations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await componentUtil.getAccessToken()),
          },
          body: JSON.stringify({
            CloudServiceProvider: 110,
            filters: {
              BillingAccountName: ["550262613464"],
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch total recommendations");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching total recommendations:", error);
      throw error;
    }
  },

  getMonthlySavings: async () => {
    try {
      const response = await fetch(
        `${apiUrl}/costoptimization/advisor/highimpactrecommendations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await componentUtil.getAccessToken()),
          },
          body: JSON.stringify({
            CloudServiceProvider: 110,
            filters: {
              BillingAccountName: ["550262613464"],
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Monthly Savings");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching Monthly Savings:", error);
      throw error;
    }
  },

  getServicemonthlysavings: async () => {
    try {
      const response = await fetch(
        `${apiUrl}/costoptimization/advisor/servicecatwithhighimpact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await componentUtil.getAccessToken()),
          },
          body: JSON.stringify({
            CloudServiceProvider: 110,
            filters: {
              BillingAccountName: ["550262613464"],
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Monthly Savings");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching Monthly Savings:", error);
      throw error;
    }
  },

  getapplicationswithhighimpact: async () => {
    try {
      const response = await fetch(
        `${apiUrl}/costoptimization/advisor/applicationswithhighimpact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await componentUtil.getAccessToken()),
          },
          body: JSON.stringify({
            CloudServiceProvider: 110,
            filters: {
              BillingAccountName: ["550262613464"],
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Monthly Savings");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching Monthly Savings:", error);
      throw error;
    }
  },

  getRightsizingRecommendations: async () => {
    try {
      const response = await fetch(
        `${apiUrl}/costoptimization/advisor/costallocation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await componentUtil.getAccessToken()),
          },
          body: JSON.stringify({
            CloudServiceProvider: 110,
            filters: {
              BillingAccountName: ["550262613464"],
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Monthly Savings");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching Monthly Savings:", error);
      throw error;
    }
  },

  getCosttrend: async () => {
    try {
      const response = await fetch(
        `${apiUrl}/costoptimization/advisor/costvssubandimpact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await componentUtil.getAccessToken()),
          },
          body: JSON.stringify({
            CloudServiceProvider: 110,
            filters: {
              BillingAccountName: ["550262613464"],
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Monthly Savings");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching Monthly Savings:", error);
      throw error;
    }
  },

  getCountUnattachedDisk1: async (selectedFilters) => {
    try {
      const response = await fetch(
        `${apiUrl}/costoptimization/manageddisk/totalcount`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await componentUtil.getAccessToken()),
          },
          body: JSON.stringify({
            CloudServiceProvider: componentUtil.getSelectedCSP(),
            filters: {
              ...selectedFilters,
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

  getTotalOnDemandCost: async (selectedFilters) => {
    try {
      const response = await fetch(
        `${apiUrl}/costoptimization/manageddisk/cost`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await componentUtil.getAccessToken()),
          },
          body: JSON.stringify({
            CloudServiceProvider: componentUtil.getSelectedCSP(),
            filters: {
              ...selectedFilters,
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
  getImpactedApplications: async (selectedFilters) => {
    try {
      const response = await fetch(
        `${apiUrl}/costoptimization/manageddisk/impcatedapplications`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await componentUtil.getAccessToken()),
          },
          body: JSON.stringify({
            CloudServiceProvider: componentUtil.getSelectedCSP(),
            filters: {
              ...selectedFilters,
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

  getSubscriptionOnDemandConsumedMeter: async (selectedFilters) => {
    try {
      const response = await fetch(
        `${apiUrl}/costoptimization/manageddisk/ondemandvsconsumed`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await componentUtil.getAccessToken()),
          },
          body: JSON.stringify({
            CloudServiceProvider: componentUtil.getSelectedCSP(),
            filters: {
              ...selectedFilters,
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
  getDisktypevsCost: async (selectedFilters) => {
    try {
      const response = await fetch(
        `${apiUrl}/costoptimization/manageddisk/disktypevscost`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await componentUtil.getAccessToken()),
          },
          body: JSON.stringify({
            CloudServiceProvider: componentUtil.getSelectedCSP(),
            filters: {
              ...selectedFilters,
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
  getDisktypevsConsumedMeter: async (selectedFilters) => {
    try {
      const response = await fetch(
        `${apiUrl}/costoptimization/manageddisk/diskvscosumedmeter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await componentUtil.getAccessToken()),
          },
          body: JSON.stringify({
            CloudServiceProvider: componentUtil.getSelectedCSP(),
            filters: {
              ...selectedFilters,
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
  getDiskAcrossLocations: async (selectedFilters) => {
    try {
      const response = await fetch(
        `${apiUrl}/costoptimization/manageddisk/locations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await componentUtil.getAccessToken()),
          },
          body: JSON.stringify({
            CloudServiceProvider: componentUtil.getSelectedCSP(),
            filters: {
              ...selectedFilters,
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
  getCostAllocations: async (selectedFilters) => {
    try {
      const response = await fetch(
        `${apiUrl}/costoptimization/manageddisk/costallocation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await componentUtil.getAccessToken()),
          },
          body: JSON.stringify({
            CloudServiceProvider: componentUtil.getSelectedCSP(),
            filters: {
              ...selectedFilters,
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
  getAssignedCustomerIds: async (flag) => {
    try {
      const response = await fetch(`${apiUrl}/csp_customers/customerIdList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await componentUtil.getAccessToken()),
        },
        body: JSON.stringify({
          flag: flag,
          customerId: await componentUtil.getSelectedCustomerID(),
        }),
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
