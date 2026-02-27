import React, { useEffect, useState } from 'react';
import adminService from '../../services/adminService';
import toast from 'react-hot-toast';
import { FiCheck, FiX, FiEye } from 'react-icons/fi';

const ManageVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVendor, setSelectedVendor] = useState(null);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await adminService.getAllVendors();
      setVendors(response.vendors);
    } catch (error) {
      toast.error('Failed to fetch vendors');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveVendor = async (vendorId, status) => {
    try {
      await adminService.approveVendor(vendorId, status);
      toast.success(`Vendor ${status} successfully`);
      fetchVendors();
    } catch (error) {
      toast.error('Failed to update vendor status');
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
      <h1 className="text-2xl font-bold text-gray-900">Vendor Management</h1>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Business Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Owner
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Products
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vendors.map((vendor) => (
              <tr key={vendor._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{vendor.businessName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{vendor.userId?.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{vendor.businessEmail}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{vendor.businessPhone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    vendor.status === 'approved' ? 'bg-green-100 text-green-800' :
                    vendor.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    vendor.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {vendor.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {vendor.productCount || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => setSelectedVendor(vendor)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <FiEye size={18} />
                  </button>
                  
                  {vendor.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApproveVendor(vendor._id, 'approved')}
                        className="text-green-600 hover:text-green-900 mr-3"
                      >
                        <FiCheck size={18} />
                      </button>
                      <button
                        onClick={() => handleApproveVendor(vendor._id, 'rejected')}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FiX size={18} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vendor Details Modal */}
      {selectedVendor && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Vendor Details</h3>
              <div className="space-y-3">
                <p><span className="font-medium">Business:</span> {selectedVendor.businessName}</p>
                <p><span className="font-medium">Owner:</span> {selectedVendor.userId?.name}</p>
                <p><span className="font-medium">Email:</span> {selectedVendor.businessEmail}</p>
                <p><span className="font-medium">Phone:</span> {selectedVendor.businessPhone}</p>
                <p><span className="font-medium">Address:</span> {selectedVendor.businessAddress?.street}, {selectedVendor.businessAddress?.city}</p>
                <p><span className="font-medium">GST:</span> {selectedVendor.gstNumber}</p>
                <p><span className="font-medium">PAN:</span> {selectedVendor.panNumber}</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => setSelectedVendor(null)}
                  className="btn-secondary w-full"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageVendors;