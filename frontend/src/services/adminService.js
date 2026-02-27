import api from './api';

const adminService = {
  // Dashboard
  getDashboardStats: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },

  // User Management
  getAllUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },

  updateUserStatus: async (userId, isActive) => {
    const response = await api.patch(`/admin/users/${userId}/status`, { isActive });
    return response.data;
  },

  // Vendor Management
  getAllVendors: async () => {
    const response = await api.get('/admin/vendors');
    return response.data;
  },

  approveVendor: async (vendorId, status) => {
    const response = await api.patch(`/admin/vendors/${vendorId}/status`, { status });
    return response.data;
  },

  // Membership Management
  getAllMemberships: async () => {
    const response = await api.get('/admin/memberships');
    return response.data;
  },

  addMembership: async (membershipData) => {
    const response = await api.post('/admin/memberships', membershipData);
    return response.data;
  },

  updateMembership: async (membershipId, membershipData) => {
    const response = await api.put(`/admin/memberships/${membershipId}`, membershipData);
    return response.data;
  },

  // Product Status
  getProductStatus: async () => {
    const response = await api.get('/admin/products/status');
    return response.data;
  },

  updateProductStatus: async (statusData) => {
    const response = await api.post('/admin/products/status', statusData);
    return response.data;
  },

  // Requests
  getAllRequests: async () => {
    const response = await api.get('/admin/requests');
    return response.data;
  },

  processRequest: async (requestId, status, notes) => {
    const response = await api.patch(`/admin/requests/${requestId}/process`, { status, notes });
    return response.data;
  }
};

export default adminService;