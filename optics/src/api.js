const apiUrl = 'http://localhost:3001/api/v1';

const api = {
  getMonthlyActualSpend: async () => {
    try {
      const response = await fetch(`${apiUrl}/monthlyactualspend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customerId: '2100',
          provider: '0',
          startdate: '2024-02-01',
          enddate: '2024-02-29'
        })
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


  getMonthlyForecastSpend: async () => {
    try {
      const response = await fetch(`${apiUrl}/monthlyforecast`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customerId: '2100',
          provider: '0',
          startdate: '2024-02-01',
          enddate: '2024-02-29'
        })
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


  getTotalSubscription: async () => {
    try {
      const response = await fetch(`${apiUrl}/suboracccountcount`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customerId: '1600',
          provider: '0',
        })
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


  getRecommendations: async () => {
    try {
      const response = await fetch(`${apiUrl}/recommendations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_customer: '1200',
          provider: '0',
          startdate: '2024-02-01',
          enddate: '2024-02-29'
        })
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

  getDiscountKPI: async () => {
    try {
      const response = await fetch(`${apiUrl}/discountKPI`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customerId: '1200',
          provider: '0',
          startdate: '2024-02-01',
          enddate: '2024-02-29'
        })
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


  getOverallSavings: async () => {
    try {
      const response = await fetch(`${apiUrl}/overall-savings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customerId: '1200',
          provider: '0',
          startdate: '2024-02-01',
          enddate: '2024-02-29'
        })
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
 
  getMenuItemsByCustomerId: async (customerId) => {
    try {
      const response = await fetch(`${apiUrl}/menuitems/${customerId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch menuitems for customer ${customerId}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching menuitems for customer ${customerId}:`, error);
      throw error;
    }
  },

  getMapData: async () => {
    try {
      const response = await fetch(`${apiUrl}/locations/`);
      if (!response.ok) {
        throw new Error(`Failed to fetch menuitems for customer`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching menuitems for customer :`, error);
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
      const response = await fetch(`${apiUrl}/Billingcosteachday`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_customer: '1200',
          startdate: '2024-01-01',
          enddate: '2024-02-29'
        })
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
  getOverallConsumption: async () => {
    try {
      const response = await fetch(`${apiUrl}/overall-consumtion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_customer: '1900',
          provider: '0',
          startdate: '2024-01-01',
          enddate: '2024-01-31'
        })
      });
      if (!response.ok) {
        throw new Error('Failed to fetch overall consumption data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching overall consumption data:', error)
      throw error;
    }
  }

};

export default api;