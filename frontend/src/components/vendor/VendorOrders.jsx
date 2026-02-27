import React, { useEffect, useState } from 'react';
import vendorService from '../../services/vendorService';
import toast from 'react-hot-toast';
import { 
  FiPackage, 
  FiTruck, 
  FiCheckCircle, 
  FiXCircle,
  FiClock,
  FiEye,
  FiChevronDown,
  FiSearch
} from 'react-icons/fi';

const VendorOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, statusFilter, searchTerm]);

  const fetchOrders = async () => {
    try {
      const response = await vendorService.getOrders();
      setOrders(response.orders || []);
      setFilteredOrders(response.orders || []);
    } catch (error) {
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = [...orders];

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.orderStatus === statusFilter);
    }

    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(order => 
        order.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredOrders(filtered);
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    setUpdatingStatus(true);
    try {
      await vendorService.updateOrderStatus(orderId, newStatus);
      toast.success(`Order status updated to ${newStatus}`);
      fetchOrders();
      setSelectedOrder(null);
    } catch (error) {
      toast.error('Failed to update order status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      processing: 'bg-purple-100 text-purple-800',
      shipped: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return <FiClock className="mr-1" />;
      case 'confirmed': return <FiCheckCircle className="mr-1" />;
      case 'processing': return <FiPackage className="mr-1" />;
      case 'shipped': return <FiTruck className="mr-1" />;
      case 'delivered': return <FiCheckCircle className="mr-1" />;
      case 'cancelled': return <FiXCircle className="mr-1" />;
      default: return null;
    }
  };

  const getNextStatusOptions = (currentStatus) => {
    const statusFlow = {
      pending: ['confirmed', 'cancelled'],
      confirmed: ['processing', 'cancelled'],
      processing: ['shipped', 'cancelled'],
      shipped: ['delivered', 'cancelled'],
      delivered: [],
      cancelled: []
    };
    return statusFlow[currentStatus] || [];
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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Vendor Orders</h1>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field appearance-none"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-end space-x-4">
            <div className="text-sm">
              <span className="text-gray-500">Total:</span>
              <span className="ml-2 font-semibold">{filteredOrders.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order._id} className="bg-white rounded-lg shadow overflow-hidden">
            {/* Order Header */}
            <div className="px-6 py-4 bg-gray-50 border-b flex flex-wrap justify-between items-center">
              <div className="flex items-center space-x-4">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-semibold">{order.orderId}</p>
                </div>
                <div className="border-l pl-4">
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="border-l pl-4">
                  <p className="text-sm text-gray-500">Customer</p>
                  <p className="font-medium">{order.userId?.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 text-sm font-semibold rounded-full flex items-center ${getStatusColor(order.orderStatus)}`}>
                  {getStatusIcon(order.orderStatus)}
                  {order.orderStatus}
                </span>
                <button
                  onClick={() => setSelectedOrder(selectedOrder?._id === order._id ? null : order)}
                  className="text-primary-600 hover:text-primary-800"
                >
                  <FiEye size={20} />
                </button>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-6">
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex items-center space-x-4">
                      {item.productId?.images?.[0] && (
                        <img
                          src={item.productId.images[0].url}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-semibold">₹{item.total}</p>
                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div className="mt-4 flex justify-between items-center pt-4 border-t">
                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="font-medium">{order.paymentMethod}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="text-xl font-bold text-primary-600">₹{order.totalAmount}</p>
                </div>
              </div>
            </div>

            {/* Expanded Details */}
            {selectedOrder?._id === order._id && (
              <div className="border-t bg-gray-50 p-6">
                <h3 className="font-semibold mb-4">Order Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Shipping Address */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Shipping Address</h4>
                    <div className="bg-white p-4 rounded-lg text-sm">
                      <p>{order.shippingAddress?.street}</p>
                      <p>{order.shippingAddress?.city}, {order.shippingAddress?.state}</p>
                      <p>Pincode: {order.shippingAddress?.pincode}</p>
                      <p>Phone: {order.shippingAddress?.phone}</p>
                    </div>
                  </div>

                  {/* Status History */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Status History</h4>
                    <div className="bg-white p-4 rounded-lg space-y-2">
                      {order.statusHistory?.map((history, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-sm">
                          <div className="w-2 h-2 mt-2 rounded-full bg-primary-600"></div>
                          <div>
                            <p className="font-medium">{history.status}</p>
                            <p className="text-gray-500 text-xs">{history.note}</p>
                            <p className="text-gray-400 text-xs">
                              {new Date(history.updatedAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Update Status */}
                {getNextStatusOptions(order.orderStatus).length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Update Order Status</h4>
                    <div className="flex space-x-3">
                      {getNextStatusOptions(order.orderStatus).map((status) => (
                        <button
                          key={status}
                          onClick={() => handleStatusUpdate(order._id, status)}
                          disabled={updatingStatus}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                            status === 'cancelled'
                              ? 'bg-red-600 text-white hover:bg-red-700'
                              : 'bg-primary-600 text-white hover:bg-primary-700'
                          } disabled:opacity-50`}
                        >
                          Mark as {status}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tracking Information */}
                {order.trackingNumber && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      Tracking Number: <span className="font-semibold">{order.trackingNumber}</span>
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No orders found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your filters' 
                : 'You haven\'t received any orders yet'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorOrders;