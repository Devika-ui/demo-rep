import axios from 'axios';

const apiUrl = 'http://localhost:8080'; 

const api = {
  getSubscriptions: async () => {
    try {
      const response = await axios.get(`${apiUrl}/subscription`);
      return response.data;
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      throw error;
    }
  },

  getSubscriptionsByCustomerId: async (customerId) => {
    try {
      const response = await axios.get(`${apiUrl}/subscription/${customerId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching subscriptions for customer ${customerId}:`, error);
      throw error;
    }
  },

  // Add similar functions for other subscription retrieval methods (by agreement, by domain, etc.)
};

export default api;
