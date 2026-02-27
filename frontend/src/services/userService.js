import api from './api';

const userService = {
  // Products
  getAllProducts: async () => {
    const response = await api.get('/products');
    return response.data;
  },

  getProductById: async (productId) => {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  },

  // Requests
  getMyRequests: async () => {
    const response = await api.get('/user/requests');
    return response.data;
  },

  deleteRequest: async (requestId) => {
    const response = await api.delete(`/user/requests/${requestId}`);
    return response.data;
  },

  // Vendor Application
  applyForVendor: async (vendorData) => {
    const response = await api.post('/user/apply-vendor', vendorData);
    return response.data;
  }
};

export default userService;