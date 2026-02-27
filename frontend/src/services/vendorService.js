import api from './api';

const vendorService = {
  // Dashboard
  getDashboard: async () => {
    const response = await api.get('/vendor/dashboard');
    return response.data;
  },

  // Products
  getMyProducts: async () => {
    const response = await api.get('/vendor/products');
    return response.data;
  },

  addProduct: async (productData) => {
    const response = await api.post('/vendor/products', productData);
    return response.data;
  },

  updateProduct: async (productId, productData) => {
    const response = await api.put(`/vendor/products/${productId}`, productData);
    return response.data;
  },

  deleteProduct: async (productId) => {
    const response = await api.delete(`/vendor/products/${productId}`);
    return response.data;
  },

  // Membership
  getMyMembership: async () => {
    const response = await api.get('/vendor/membership');
    return response.data;
  },

  requestMembershipUpgrade: async (membershipId) => {
    const response = await api.post('/vendor/membership/request', { membershipId });
    return response.data;
  },

  // Transactions
  getTransactions: async () => {
    const response = await api.get('/vendor/transactions');
    return response.data;
  }
};

export default vendorService;