const apiUrl = 'http://localhost:3001/api/v1';

const api = {
  getMonthlyActualSpend: async () => {
    try {
      const response = await fetch(`${apiUrl}/overview/monthly/spend/actual`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          CloudServiceProvider: "1",
          filters: {
            BillingMonthStartDate: ["2024-04-01", "2024-05-01"],
            Subscription: ["Subscription1"],
          },
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch actual spend data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching actual spend data:', error);
      throw error;
    }
  },


  getMonthlyForecastSpend: async () => {
    try {
      const response = await fetch(`${apiUrl}/overview/monthly/forecast`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          CloudServiceProvider: "1",
          filters: {
            BillingMonthStartDate: ["2024-04-01", "2024-05-01"],
            Subscription: ["Subscription2"],
          },
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch actual spend data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching actual spend data:', error);
      throw error;
    }
  },



  getTotalSubscription: async () => {
    try {
      const response = await fetch(`${apiUrl}/overview/suboraccount/count`);
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
      const response = await fetch(`${apiUrl}/recommendations/top3`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      throw error;
    }
  },

  getDiscountKPICoverage: async () => {
    try {
      const response = await fetch(`${apiUrl}/overview/KPI/discounts/comittmentbased/coverage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          CloudServiceProvider: "1",
          filters: {
            BillingMonthStartDate: ["2024-04-01", "2024-05-01"],
            Subscription: ["Subscription2"],
          },
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      throw error;
    }
  },

  getDiscountKPIUsage: async () => {
    try {
      const response = await fetch(`${apiUrl}/overview/KPI/discounts/comittmentbased/usage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          CloudServiceProvider: "1",
          filters: {
            Startdate: '2024-03-01',
            Enddate: '2024-05-31'
          },
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      throw error;
    }
  },


  getOverallSavingsRI: async () => {
    try {
      const response = await fetch(`${apiUrl}/overview/monthly/realized/savings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          CloudServiceProvider: "1",
          filters: {
            BillingMonthStartDate: ["2024-04-01", "2024-05-01"],
            Subscription: ["Subscription2"],
          },
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      throw error;
    }
  },

  getOverallSavingsStimulated: async () => {
    try {
      const response = await fetch(`${apiUrl}/overview/monthly/realized/simulatedri`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          CloudServiceProvider: "1",
          filters: {
            BillingMonthStartDate: ["2024-04-01", "2024-05-01"],
            Subscription: ["Subscription2"],
          },
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      throw error;
    }
  },



  getSubscriptionsByCustomerId: async (customerId) => {
    try {
      const response = await fetch(`${apiUrl}/subscription/${customerId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch subscriptions for customer ${customerId}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching subscriptions for customer ${customerId}:`, error);
      throw error;
    }
  },

  getMenuItems: async () => {
    try {
      const response = await fetch(`${apiUrl}/overview/menuitems/`);
      if (!response.ok) {
        throw new Error(`Failed to fetch menuitems for customer `);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching menuitems for customer :`, error);
      throw error;
    }
  },

  getMapData: async () => {
    try {
      const response = await fetch(
        `${apiUrl}/overview/locations/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            CloudServiceProvider: "1",
            filters: {
              BillingMonthStartDate: ["2024-05-01"],
              Location: [],
              
            },
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
  
  getClientData: async (customerId) => {
    try {
      const response = await fetch(`${apiUrl}/client`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ customerId })
      });
 
      if (!response.ok) {
        throw new Error('Failed to fetch client data');
      }
 
      return await response.json();
    } catch (error) {
      console.error('Error fetching client data:', error);
      throw error;
    }
  },

  getBillingCostEachDay: async () => {
    try {
      const response = await fetch(`${apiUrl}/overview/billcost/total`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          CloudServiceProvider: "1",
          filters: {
            BillingMonthStartDate: ["2024-04-01", "2024-05-01"],
            Subscription: ["Subscription2"],
          },
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      throw error;
    }
  },


  
  getOverallConsumptionForSubscription: async () => {
    try {
      const response = await fetch(`${apiUrl}/overview/subscriptions/top/2`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          CloudServiceProvider: "1",
          filters: {
            Subscription: ["Subscription2"],
          },
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch overall  consumption subscription data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching overall consumption subscription data:', error)
      throw error;
    }
  },
  getOverallConsumptionForApplication: async () => {
    try {
      const response = await fetch(`${apiUrl}/common/topapplications/2`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          CloudServiceProvider: "1",
          filters: {
            Subscription: ["Subscription2"],
          },
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch overall consumption application data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching overall consumption application data:', error)
      throw error;
    }
  }
,
getOverallConsumptionForServies: async () => {
  try {
    const response = await fetch(`${apiUrl}/common/topservices/2`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        CloudServiceProvider: "1",
        filters: {
          Subscription: ["Subscription2"],
        },
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch overall consumption services data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching overall consumption services data:', error)
    throw error;
  }
},
getOverallConsumptionForTagCompliance: async () => {
  try {
    const response = await fetch(`${apiUrl}/overview/compliance/tag`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        CloudServiceProvider: "1",
        filters: {
          Subscription: ["Subscription2"],
        },
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch overall consumption tag compliance data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching overall consumption tag compliance data:', error)
    throw error;
  }
},
getAllFilters: async () => {
  try {
    const response = await fetch(`${apiUrl}/filters`);
    if (!response.ok) {
      throw new Error(`Failed to fetch filters `);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching filters :`, error);
    throw error;
  }
},
getFilterBasedOnSelection: async () => {
  try {
    const response = await fetch(`${apiUrl}/filters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        CloudServiceProvider: "1",
        filters: {
          BillingMonthStartDate: ["2024-04-01", "2024-05-01"],
          Subscription: ["Subscription2"],
        },
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch filter');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching filter:', error);
    throw error;
  }
},



};

export default api;