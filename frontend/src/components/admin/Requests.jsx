import React, { useEffect, useState } from 'react';
import adminService from '../../services/adminService';
import toast from 'react-hot-toast';
import { FiCheck, FiX, FiClock } from 'react-icons/fi';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await adminService.getAllRequests();
      setRequests(response.requests);
    } catch (error) {
      toast.error('Failed to fetch requests');
    } finally {
      setLoading(false);
    }
  };

  const handleProcessRequest = async (requestId, status) => {
    try {
      await adminService.processRequest(requestId, status, adminNotes);
      toast.success(`Request ${status} successfully`);
      setSelectedRequest(null);
      setAdminNotes('');
      fetchRequests();
    } catch (error) {
      toast.error('Failed to process request');
    }
  };

  const getRequestIcon = (type) => {
    switch(type) {
      case 'vendor_application':
        return '👤';
      case 'product_approval':
        return '📦';
      case 'membership':
        return '⭐';
      default:
        return '📝';
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
      <h1 className="text-2xl font-bold text-gray-900">Request Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((request) => (
          <div
            key={request._id}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <span className="text-3xl mr-3">{getRequestIcon(request.type)}</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {request.type.split('_').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </h3>
                  <p className="text-sm text-gray-500">ID: {request.requestId}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                request.status === 'approved' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}>
                {request.status}
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">From:</span> {request.userId?.name}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Email:</span> {request.userId?.email}
              </p>
              {request.type === 'vendor_application' && (
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Business:</span> {request.details?.businessName}
                </p>
              )}
              {request.type === 'product_approval' && (
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Product:</span> {request.details?.productName}
                </p>
              )}
              <p className="text-xs text-gray-400">
                {new Date(request.createdAt).toLocaleString()}
              </p>
            </div>

            {request.status === 'pending' && (
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => setSelectedRequest(request)}
                  className="flex-1 btn-primary text-sm py-1"
                >
                  Process
                </button>
              </div>
            )}

            {request.adminNotes?.length > 0 && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Admin Note:</p>
                <p className="text-sm text-gray-700">{request.adminNotes[0]?.note}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Process Request Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Process Request
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admin Notes
                  </label>
                  <textarea
                    className="input-field"
                    rows="3"
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Add notes about this request..."
                  ></textarea>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleProcessRequest(selectedRequest._id, 'approved')}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleProcessRequest(selectedRequest._id, 'rejected')}
                    className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
                
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="w-full btn-secondary mt-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Requests;