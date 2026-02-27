import React, { useEffect, useState } from 'react';
import userService from '../../services/userService';
import toast from 'react-hot-toast';
import { FiTrash2, FiClock } from 'react-icons/fi';

const UserRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await userService.getMyRequests();
      setRequests(response.requests);
    } catch (error) {
      toast.error('Failed to fetch requests');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRequest = async (requestId) => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      try {
        await userService.deleteRequest(requestId);
        toast.success('Request deleted successfully');
        fetchRequests();
      } catch (error) {
        toast.error('Failed to delete request');
      }
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
      <h1 className="text-2xl font-bold text-gray-900">My Requests</h1>

      {requests.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">No requests found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((request) => (
            <div
              key={request._id}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-3xl mr-3">{getRequestIcon(request.type)}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">
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

              <div className="space-y-2 mb-4">
                {request.type === 'vendor_application' && (
                  <p className="text-sm text-gray-600">
                    Business: {request.details?.businessName}
                  </p>
                )}
                {request.type === 'product_approval' && (
                  <p className="text-sm text-gray-600">
                    Product: {request.details?.productName}
                  </p>
                )}
                {request.type === 'membership' && (
                  <p className="text-sm text-gray-600">
                    Membership: {request.details?.membershipName}
                  </p>
                )}
                <p className="text-xs text-gray-400 flex items-center">
                  <FiClock className="mr-1" />
                  {new Date(request.createdAt).toLocaleString()}
                </p>
              </div>

              {request.adminNotes && request.adminNotes.length > 0 && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">Admin Note:</p>
                  <p className="text-sm text-gray-700">{request.adminNotes[0]?.note}</p>
                </div>
              )}

              {request.status === 'pending' && (
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => handleDeleteRequest(request._id)}
                    className="text-red-600 hover:text-red-800 flex items-center text-sm"
                  >
                    <FiTrash2 className="mr-1" /> Delete Request
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserRequests;