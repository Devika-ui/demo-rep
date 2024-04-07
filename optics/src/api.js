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
  }
};

export default api;