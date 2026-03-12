// import { useEffect, useState } from "react";
// import API from "../services/api";
// import { toast } from "react-toastify";
// function Transactions() {

//   const [orders, setOrders] = useState([]);

//   const fetchOrders = async () => {

//     try {

//       const res = await API.get("/orders/vendor");

//       setOrders(res.data);

//     } catch (error) {

//       console.log(error);

//     }

//   };

//   const updateStatus = async (id, status) => {

//     try {

//       await API.put(`/orders/${id}`, { status });

//       fetchOrders();

//     } catch (error) {

//       console.log(error);

//     }

//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   return (

//     <div className="min-h-screen bg-gray-100 p-20">

//       <h2 className="text-3xl font-bold mb-6">
//         Vendor Transactions
//       </h2>

//       <div className="bg-white shadow rounded-lg overflow-hidden">

//         <table className="w-full">

//           <thead className="bg-gray-200">

//             <tr>

//               <th className="p-4 text-left">
//                 User
//               </th>

//               <th className="p-4 text-left">
//                 Total
//               </th>

//               <th className="p-4 text-left">
//                 Status
//               </th>

//               <th className="p-4 text-left">
//                 Update Status
//               </th>

//             </tr>

//           </thead>

//           <tbody>

//             {orders.length === 0 ? (

//               <tr>
//                 <td colSpan="4" className="p-6 text-center text-gray-500">
//                   No Orders Found
//                 </td>
//               </tr>

//             ) : (

//               orders.map(order => (

//                 <tr 
//                   key={order._id}
//                   className="border-t hover:bg-gray-50"
//                 >

//                   <td className="p-4">
//                     {order.user?.email || "Unknown User"}
//                   </td>

//                   <td className="p-4 text-blue-600 font-semibold">
//                     ₹{order.total || 0}
//                   </td>

//                   <td className="p-4">

//                     <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">

//                       {order.status}

//                     </span>

//                   </td>

//                   <td className="p-4 space-x-2">

//                     <button
//                       onClick={() => updateStatus(order._id, "Received")}
//                       className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                     >
//                       Received
//                     </button>

//                     <button
//                       onClick={() => updateStatus(order._id, "Ready for Shipping")}
//                       className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
//                     >
//                       Ready
//                     </button>

//                     <button
//                       onClick={() => updateStatus(order._id, "Out for Delivery")}
//                       className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
//                     >
//                       Deliver
//                     </button>

//                   </td>

//                 </tr>

//               ))

//             )}

//           </tbody>

//         </table>

//       </div>

//     </div>

//   )

// }

// export default Transactions;

import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Transactions() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [updatingOrder, setUpdatingOrder] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/vendor");
      setOrders(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch orders");
    }
  };

  const updateStatus = async (id, status) => {
    setUpdatingOrder(id);
    try {
      await API.put(`/orders/${id}`, { status });
      toast.success(`Order status updated to ${status}`);
      fetchOrders();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    } finally {
      setUpdatingOrder(null);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter orders based on status and search
  const filteredOrders = orders.filter(order => {
    const matchesStatus = filter === "all" || order.status === filter;
    const matchesSearch = order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order._id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Get status badge color and icon
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-600',
          border: 'border-yellow-200',
          icon: (
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        };
      case 'Received':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-600',
          border: 'border-blue-200',
          icon: (
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )
        };
      case 'Ready for Shipping':
        return {
          bg: 'bg-purple-100',
          text: 'text-purple-600',
          border: 'border-purple-200',
          icon: (
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          )
        };
      case 'Out for Delivery':
        return {
          bg: 'bg-orange-100',
          text: 'text-orange-600',
          border: 'border-orange-200',
          icon: (
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        };
      case 'Delivered':
        return {
          bg: 'bg-green-100',
          text: 'text-green-600',
          border: 'border-green-200',
          icon: (
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-600',
          border: 'border-gray-200',
          icon: null
        };
    }
  };

  // Format order ID
  const formatOrderId = (id) => {
    return `#${id.slice(-8).toUpperCase()}`;
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status counts
  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100/30 to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg p-3 mt-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8  mt-20">
          <div className="flex items-center gap-3 mb-2 h-5">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Vendor Transactions
            </h1>
          </div>
          <p className="text-orange-100 ml-12">Manage and track your order transactions</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div 
            onClick={() => setFilter("all")}
            className={`bg-white rounded-xl shadow-md p-4 cursor-pointer transition-all hover:shadow-lg ${filter === 'all' ? 'ring-2 ring-orange-500 border-orange-500' : ''}`}
          >
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-2xl font-bold text-gray-800">{orders.length}</p>
          </div>
          <div 
            onClick={() => setFilter("Pending")}
            className={`bg-white rounded-xl shadow-md p-4 cursor-pointer transition-all hover:shadow-lg ${filter === 'Pending' ? 'ring-2 ring-yellow-500 border-yellow-500' : ''}`}
          >
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{statusCounts['Pending'] || 0}</p>
          </div>
          <div 
            onClick={() => setFilter("Received")}
            className={`bg-white rounded-xl shadow-md p-4 cursor-pointer transition-all hover:shadow-lg ${filter === 'Received' ? 'ring-2 ring-blue-500 border-blue-500' : ''}`}
          >
            <p className="text-sm text-gray-500">Received</p>
            <p className="text-2xl font-bold text-blue-600">{statusCounts['Received'] || 0}</p>
          </div>
          <div 
            onClick={() => setFilter("Ready for Shipping")}
            className={`bg-white rounded-xl shadow-md p-4 cursor-pointer transition-all hover:shadow-lg ${filter === 'Ready for Shipping' ? 'ring-2 ring-purple-500 border-purple-500' : ''}`}
          >
            <p className="text-sm text-gray-500">Ready</p>
            <p className="text-2xl font-bold text-purple-600">{statusCounts['Ready for Shipping'] || 0}</p>
          </div>
          <div 
            onClick={() => setFilter("Out for Delivery")}
            className={`bg-white rounded-xl shadow-md p-4 cursor-pointer transition-all hover:shadow-lg ${filter === 'Out for Delivery' ? 'ring-2 ring-orange-500 border-orange-500' : ''}`}
          >
            <p className="text-sm text-gray-500">Out for Delivery</p>
            <p className="text-2xl font-bold text-orange-600">{statusCounts['Out for Delivery'] || 0}</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by order ID or customer email..."
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Orders Found</h3>
              <p className="text-gray-500">
                {searchTerm || filter !== 'all' ? 'Try adjusting your search or filters' : 'No orders have been placed yet'}
              </p>
            </div>
          ) : (
            <>
              {/* Table Header - Desktop */}
              <div className="hidden md:block bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <div className="grid grid-cols-12 gap-4 px-6 py-4">
                  <div className="col-span-3 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Order ID
                  </div>
                  <div className="col-span-2 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Customer
                  </div>
                  <div className="col-span-2 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </div>
                  <div className="col-span-1 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Total
                  </div>
                  <div className="col-span-2 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </div>
                  <div className="col-span-2 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </div>
                </div>
              </div>

              {/* Orders List */}
              <div className="divide-y divide-gray-200">
                {filteredOrders.map((order) => {
                  const statusBadge = getStatusBadge(order.status);
                  return (
                    <div key={order._id}>
                      <div
                        className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-5 hover:bg-orange-50/50 transition-colors duration-200 cursor-pointer"
                        onClick={() => setSelectedOrder(selectedOrder === order._id ? null : order._id)}
                      >
                        {/* Order ID */}
                        <div className="md:col-span-3 flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-50 rounded-lg flex items-center justify-center shadow-sm border-2 border-orange-200">
                            <span className="text-sm font-bold text-orange-500">#</span>
                          </div>
                          <div>
                            <span className="font-mono font-semibold text-gray-800">
                              {formatOrderId(order._id)}
                            </span>
                          </div>
                        </div>

                        {/* Customer */}
                        <div className="md:col-span-2 flex items-center">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                              <span className="text-sm font-semibold text-gray-600">
                                {order.user?.email?.charAt(0).toUpperCase() || 'U'}
                              </span>
                            </div>
                            <span className="text-sm text-gray-600 truncate max-w-[120px]">
                              {order.user?.email?.split('@')[0] || 'Unknown'}
                            </span>
                          </div>
                        </div>

                        {/* Date */}
                        <div className="md:col-span-2 flex items-center">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm text-gray-600">{formatDate(order.createdAt)}</span>
                          </div>
                        </div>

                        {/* Total */}
                        <div className="md:col-span-1 flex items-center">
                          <span className="text-lg font-bold text-orange-600">₹{order.total || 0}</span>
                        </div>

                        {/* Status */}
                        <div className="md:col-span-2 flex items-center">
                          <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${statusBadge.bg} ${statusBadge.text} ${statusBadge.border}`}>
                            {statusBadge.icon}
                            {order.status}
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="md:col-span-2 flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateStatus(order._id, "Received");
                            }}
                            disabled={updatingOrder === order._id || order.status === "Received"}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              order.status === "Received" 
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white'
                            }`}
                          >
                            Received
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateStatus(order._id, "Ready for Shipping");
                            }}
                            disabled={updatingOrder === order._id || order.status === "Ready for Shipping"}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              order.status === "Ready for Shipping"
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-purple-100 text-purple-600 hover:bg-purple-600 hover:text-white'
                            }`}
                          >
                            Ready
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateStatus(order._id, "Out for Delivery");
                            }}
                            disabled={updatingOrder === order._id || order.status === "Out for Delivery"}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              order.status === "Out for Delivery"
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-orange-100 text-orange-600 hover:bg-orange-600 hover:text-white'
                            }`}
                          >
                            Deliver
                          </button>
                        </div>
                      </div>

                      {/* Expanded Order Details */}
                      {selectedOrder === order._id && (
                        <div className="bg-orange-50/50 px-6 py-4 border-t border-orange-200">
                          <div className="grid md:grid-cols-2 gap-6">
                            {/* Order Items */}
                            <div>
                              <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                Order Items
                              </h4>
                              <div className="space-y-2">
                                {order.items?.map((item, idx) => (
                                  <div key={idx} className="flex justify-between items-center py-2 border-b border-orange-200 last:border-0">
                                    <div className="flex items-center gap-3">
                                      <span className="text-sm font-medium text-gray-600">{item.quantity}x</span>
                                      <span className="text-gray-800">{item.product?.name || 'Product'}</span>
                                    </div>
                                    <span className="font-semibold text-orange-600">₹{item.product?.price * item.quantity}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Order Summary */}
                            <div>
                              <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                Order Summary
                              </h4>
                              <div className="bg-white rounded-xl p-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">Order ID:</span>
                                  <span className="font-mono font-semibold text-gray-800">{order._id}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">Customer Email:</span>
                                  <span className="text-gray-800">{order.user?.email || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">Order Date:</span>
                                  <span className="text-gray-800">{new Date(order.createdAt).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">Last Updated:</span>
                                  <span className="text-gray-800">{new Date(order.updatedAt).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm font-semibold pt-2 border-t border-gray-200">
                                  <span className="text-gray-700">Total Amount:</span>
                                  <span className="text-orange-600">₹{order.total || 0}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Transactions;