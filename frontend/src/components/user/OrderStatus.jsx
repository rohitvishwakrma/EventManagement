import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { FiPackage, FiCheckCircle, FiTruck, FiHome } from 'react-icons/fi';

const OrderStatus = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const response = await api.get(`/orders/my-orders/${id}`);
      setOrder(response.data.order);
    } catch (error) {
      toast.error('Failed to fetch order details');
    } finally {
      setLoading(false);
    }
  };

  const getStatusStep = (status) => {
    const steps = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];
    return steps.indexOf(status);
  };

  const getStatusIcon = (step, currentStep) => {
    if (step < currentStep) return <FiCheckCircle className="text-green-500" />;
    if (step === currentStep) {
      switch(step) {
        case 0: return <FiPackage className="text-yellow-500" />;
        case 1: return <FiCheckCircle className="text-blue-500" />;
        case 2: return <FiPackage className="text-purple-500" />;
        case 3: return <FiTruck className="text-indigo-500" />;
        case 4: return <FiHome className="text-green-500" />;
        default: return <FiPackage />;
      }
    }
    return <FiPackage className="text-gray-300" />;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Order not found</h2>
      </div>
    );
  }

  const currentStep = getStatusStep(order.orderStatus);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Order Status</h1>

      {/* Order Info */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="text-lg font-semibold">{order.orderId}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Order Date</p>
            <p className="text-lg">{new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Total Amount:</span>
            <span className="text-xl font-bold text-primary-600">₹{order.totalAmount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Payment Status:</span>
            <span className={`font-semibold ${
              order.paymentStatus === 'completed' ? 'text-green-600' : 'text-yellow-600'
            }`}>
              {order.paymentStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Order Status Timeline */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-6">Order Progress</h2>
        
        <div className="relative">
          {/* Progress Bar */}
          <div className="absolute top-5 left-0 w-full h-1 bg-gray-200">
            <div 
              className="h-full bg-primary-600 transition-all duration-500"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            ></div>
          </div>

          {/* Status Steps */}
          <div className="relative flex justify-between">
            {['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered'].map((status, index) => (
              <div key={status} className="text-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-white border-2 ${
                  index <= currentStep ? 'border-primary-600' : 'border-gray-300'
                }`}>
                  {getStatusIcon(index, currentStep)}
                </div>
                <p className={`mt-2 text-sm font-medium ${
                  index <= currentStep ? 'text-primary-600' : 'text-gray-400'
                }`}>
                  {status}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Status History */}
        {order.statusHistory && order.statusHistory.length > 0 && (
          <div className="mt-8">
            <h3 className="font-semibold mb-4">Status History</h3>
            <div className="space-y-3">
              {order.statusHistory.map((history, index) => (
                <div key={index} className="flex items-start space-x-3 text-sm">
                  <div className="w-2 h-2 mt-2 rounded-full bg-primary-600"></div>
                  <div>
                    <p className="font-medium">{history.status}</p>
                    <p className="text-gray-500">{history.note}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(history.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Shipping Address */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
        <div className="space-y-1 text-gray-700">
          <p>{order.shippingAddress?.street}</p>
          <p>{order.shippingAddress?.city}, {order.shippingAddress?.state}</p>
          <p>Pincode: {order.shippingAddress?.pincode}</p>
          <p>Phone: {order.shippingAddress?.phone}</p>
        </div>

        {order.trackingNumber && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              Tracking Number: <span className="font-semibold">{order.trackingNumber}</span>
            </p>
          </div>
        )}
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Order Items</h2>
        <div className="space-y-4">
          {order.items.map((item, index) => (
            <div key={index} className="flex items-center space-x-4 border-b last:border-0 pb-4">
              <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                {item.productId?.images?.[0] && (
                  <img
                    src={item.productId.images[0].url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              </div>
              <p className="font-semibold">₹{item.total}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;