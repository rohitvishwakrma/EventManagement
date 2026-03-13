
import { useEffect, useState } from "react";
import API from "../services/api";

function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/user");
      setOrders(res.data || []);
    } catch (error) {
      console.log("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Received":
        return "bg-yellow-100 text-yellow-600 border border-yellow-200";
      case "Ready for Shipping":
        return "bg-blue-100 text-blue-600 border border-blue-200";
      case "Out for Delivery":
        return "bg-green-100 text-green-600 border border-green-200";
      default:
        return "bg-gray-100 text-gray-600 border border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Received":
        return <i className="ri-checkbox-circle-line"></i>;
      case "Ready for Shipping":
        return <i className="ri-truck-line"></i>;
      case "Out for Delivery":
        return <i className="ri-motorbike-line"></i>;
      default:
        return <i className="ri-time-line"></i>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="text-center">
          <i className="ri-loader-4-line text-4xl text-orange-500 animate-spin mb-4"></i>
          <p className="text-gray-500">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3">
            <i className="ri-file-list-3-line text-3xl"></i>
            <div>
              <h1 className="text-3xl font-bold">Your Orders</h1>
              <p className="text-orange-100 mt-1">Track and manage your orders</p>
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20">
        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
              <i className="ri-shopping-bag-line text-4xl text-orange-500"></i>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Orders Found</h3>
            <p className="text-gray-500">You haven't placed any orders yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <i className="ri-shopping-bag-line text-orange-500"></i>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Order ID</p>
                        <p className="font-mono text-sm font-semibold text-gray-700">
                          #{order._id.slice(-8).toUpperCase()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Total Amount</p>
                        <p className="text-xl font-bold text-orange-500">₹{order.total ?? 0}</p>
                      </div>
                      
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${getStatusStyle(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status || "Pending"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                {order.items?.length > 0 && (
                  <div className="px-6 py-4">
                    <div className="flex items-center gap-2 mb-3">
                      <i className="ri-cake-3-line text-orange-400"></i>
                      <h3 className="font-semibold text-gray-700">Order Items</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {order.items.map((item, index) => (
                        <div 
                          key={index} 
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-orange-50/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                              <span className="text-sm font-bold text-orange-500">
                                {item.quantity}
                              </span>
                            </div>
                            <span className="text-gray-700">{item.product?.name || "Product"}</span>
                          </div>
                          <span className="text-sm font-semibold text-orange-500">
                            ₹{item.product?.price * item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Order Footer */}
                <div className="bg-gray-50/50 px-6 py-3 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-500">
                      <i className="ri-time-line"></i>
                      <span>Ordered on {new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>
                    <button className="text-orange-500 hover:text-orange-600 font-medium flex items-center gap-1">
                      <span>View Details</span>
                      <i className="ri-arrow-right-s-line"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserOrders;