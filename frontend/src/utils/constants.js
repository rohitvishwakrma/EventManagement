export const USER_ROLES = {
  ADMIN: 'admin',
  VENDOR: 'vendor',
  USER: 'user'
};

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

export const PAYMENT_METHODS = {
  CASH: 'cash',
  UPI: 'upi',
  CARD: 'card',
  NETBANKING: 'netbanking'
};

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded'
};

export const PRODUCT_STATUS = {
  ACTIVE: 'active',
  PENDING: 'pending',
  REJECTED: 'rejected',
  OUT_OF_STOCK: 'out_of_stock'
};

export const REQUEST_TYPES = {
  VENDOR_APPLICATION: 'vendor_application',
  PRODUCT_APPROVAL: 'product_approval',
  MEMBERSHIP: 'membership',
  SUPPORT: 'support',
  WITHDRAWAL: 'withdrawal',
  REFUND: 'refund'
};

export const REQUEST_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  COMPLETED: 'completed'
};

export const CATEGORIES = [
  'Electronics',
  'Clothing',
  'Books',
  'Home & Garden',
  'Sports',
  'Toys',
  'Automotive',
  'Health & Beauty',
  'Food & Beverages',
  'Other'
];

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/me',
    CHANGE_PASSWORD: '/auth/change-password'
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    VENDORS: '/admin/vendors',
    MEMBERSHIPS: '/admin/memberships',
    PRODUCTS: '/admin/products',
    REQUESTS: '/admin/requests'
  },
  VENDOR: {
    DASHBOARD: '/vendor/dashboard',
    PRODUCTS: '/vendor/products',
    ORDERS: '/vendor/orders',
    TRANSACTIONS: '/vendor/transactions',
    MEMBERSHIP: '/vendor/membership'
  },
  USER: {
    DASHBOARD: '/user/dashboard',
    REQUESTS: '/user/requests',
    APPLY_VENDOR: '/user/apply-vendor'
  },
  PRODUCTS: {
    LIST: '/products',
    DETAIL: (id) => `/products/${id}`,
    SEARCH: '/products/search'
  },
  ORDERS: {
    CART: '/orders/cart',
    CREATE: '/orders/create',
    MY_ORDERS: '/orders/my-orders',
    DETAIL: (id) => `/orders/my-orders/${id}`
  }
};