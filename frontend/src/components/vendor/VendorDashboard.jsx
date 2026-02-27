import React, { useEffect, useState } from 'react';
import vendorService from '../../services/vendorService';
import { Link } from 'react-router-dom';
import { 
  FiPackage, 
  FiShoppingBag, 
  FiDollarSign, 
  FiClock,
  FiPlusCircle,
  FiList
} from 'react-icons/fi';

const VendorDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await vendorService.getDashboard();
      setDashboard(response);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const menuItems = [
    { name: 'Main Page', path: '/vendor/dashboard', icon: FiList },
    { name: 'Transaction', path: '/vendor/transactions', icon: FiDollarSign },
    { name: 'Add New Item', path: '/vendor/products/add', icon: FiPlusCircle },
  ];

  return (
    <div className="space-y-6">
      {/* Vendor Info */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {dashboard?.vendor?.businessName}
        </h1>
        <p className="text-gray-600">
          Membership: {dashboard?.vendor?.membershipId?.name} | 
          Expires: {new Date(dashboard?.vendor?.membershipExpiry).toLocaleDateString()}
        </p>
      </div>

      {/* Menu Items */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
            >
              <item.icon className="h-6 w-6 text-primary-600 mr-3" />
              <span className="text-gray-700 font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <FiPackage className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Products</p>
              <p className="text-2xl font-semibold">{dashboard?.stats?.products?.total || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <FiShoppingBag className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Active Products</p>
              <p className="text-2xl font-semibold">{dashboard?.stats?.products?.active || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full">
              <FiClock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Pending Products</p>
              <p className="text-2xl font-semibold">{dashboard?.stats?.products?.pending || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <FiDollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-semibold">₹{dashboard?.stats?.orders?.revenue || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
        </div>
        <div className="p-6">
          {dashboard?.recentOrders?.length > 0 ? (
            <div className="space-y-4">
              {dashboard.recentOrders.map((order) => (
                <div key={order._id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Order #{order.orderId}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    order.orderStatus === 'delivered' ? 'bg-green-100 text-green-800' :
                    order.orderStatus === 'shipped' ? 'bg-blue-100 text-blue-800' :
                    order.orderStatus === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.orderStatus}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No recent orders</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;