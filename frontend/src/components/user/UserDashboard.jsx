import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../services/userService';
import { useAuth } from '../../context/AuthContext';
import { FiPackage, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const UserDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await userService.getDashboard();
      setStats(response.stats);
      setRecentOrders(response.recentOrders);
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

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">
        Welcome back, {user?.name}!
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <FiPackage className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-2xl font-semibold">{stats?.totalOrders || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <FiCheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-2xl font-semibold">0</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full">
              <FiClock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-semibold">0</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <FiXCircle className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Cancelled</p>
              <p className="text-2xl font-semibold">0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/products"
            className="text-center p-4 border rounded-lg hover:bg-gray-50 transition"
          >
            <FiPackage className="mx-auto h-8 w-8 text-primary-600 mb-2" />
            <span className="text-gray-700">Browse Products</span>
          </Link>
          <Link
            to="/cart"
            className="text-center p-4 border rounded-lg hover:bg-gray-50 transition"
          >
            <FiPackage className="mx-auto h-8 w-8 text-primary-600 mb-2" />
            <span className="text-gray-700">View Cart</span>
          </Link>
          <Link
            to="/user/requests"
            className="text-center p-4 border rounded-lg hover:bg-gray-50 transition"
          >
            <FiPackage className="mx-auto h-8 w-8 text-primary-600 mb-2" />
            <span className="text-gray-700">My Requests</span>
          </Link>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
        </div>
        <div className="p-6">
          {recentOrders.length > 0 ? (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <Link
                  key={order._id}
                  to={`/orders/${order._id}`}
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Order #{order.orderId}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary-600">₹{order.totalAmount}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.orderStatus === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.orderStatus === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No orders yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;