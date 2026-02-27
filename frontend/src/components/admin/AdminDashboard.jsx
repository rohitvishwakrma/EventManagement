import React, { useEffect, useState } from 'react';
import adminService from '../../services/adminService';
import { Link } from 'react-router-dom';
import { 
  FiUsers, 
  FiBriefcase, 
  FiPackage, 
  FiClipboard,
  FiDollarSign,
  FiTrendingUp
} from 'react-icons/fi';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await adminService.getDashboardStats();
      setStats(response.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
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
    {
      title: 'Maintenance Menu',
      items: [
        { name: 'Add/Update Memberships', path: '/admin/memberships', icon: FiBriefcase },
        { name: 'Add/Update User', path: '/admin/users', icon: FiUsers },
        { name: 'Add/Update Vendor', path: '/admin/vendors', icon: FiBriefcase },
        { name: 'Users Management', path: '/admin/users', icon: FiUsers },
        { name: 'Vendor Management', path: '/admin/vendors', icon: FiBriefcase },
        { name: 'View Product', path: '/admin/products', icon: FiPackage },
        { name: 'Add Membership for Vendor', path: '/admin/memberships/add', icon: FiBriefcase },
        { name: 'Update Membership for Vendor', path: '/admin/memberships', icon: FiBriefcase },
        { name: 'Insert Product Status', path: '/admin/products/status', icon: FiClipboard },
        { name: 'Delete Request Item', path: '/admin/requests', icon: FiClipboard },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <FiUsers className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-2xl font-semibold">{stats?.users || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <FiBriefcase className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Vendors</p>
              <p className="text-2xl font-semibold">{stats?.vendors || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <FiPackage className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Products</p>
              <p className="text-2xl font-semibold">{stats?.products || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full">
              <FiClipboard className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Pending Requests</p>
              <p className="text-2xl font-semibold">{stats?.pendingRequests || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Maintenance Menu */}
      {menuItems.map((section, idx) => (
        <div key={idx} className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
            <p className="text-sm text-gray-500 mt-1">(Admin access only)</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.items.map((item, itemIdx) => (
                <Link
                  key={itemIdx}
                  to={item.path}
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
                >
                  <item.icon className="h-5 w-5 text-primary-600 mr-3" />
                  <span className="text-gray-700">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Recent Users</h3>
          </div>
          <div className="p-6">
            {/* Add recent users list here */}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Recent Requests</h3>
          </div>
          <div className="p-6">
            {/* Add recent requests list here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;