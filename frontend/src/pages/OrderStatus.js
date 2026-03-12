// import { useEffect, useState } from "react";
// import API from "../services/api";

// function OrderStatus() {

//   const [orders, setOrders] = useState([]);

//   const fetchOrders = async () => {

//     try {

//       const res = await API.get("/orders/user");

//       setOrders(res.data);

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
//         Your Orders
//       </h2>

//       <div className="bg-white shadow rounded-lg overflow-hidden">

//         <table className="w-full">

//           <thead className="bg-gray-200">

//             <tr>

//               <th className="p-4 text-left">
//                 Order ID
//               </th>

//               <th className="p-4 text-left">
//                 Total Amount
//               </th>

//               <th className="p-4 text-left">
//                 Status
//               </th>

//             </tr>

//           </thead>

//           <tbody>

//             {orders.length === 0 ? (

//               <tr>
//                 <td colSpan="3" className="p-6 text-center text-gray-500">
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
//                     {order._id}
//                   </td>

//                   <td className="p-4 text-blue-600 font-semibold">
//                     ₹ {order.total}
//                   </td>

//                   <td className="p-4">

//                     <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">

//                       {order.status}

//                     </span>

//                   </td>

//                 </tr>

//               ))

//             )}

//           </tbody>

//         </table>

//       </div>

//     </div>

//   );

// }

// export default OrderStatus;
import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function OrderStatus() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/user");
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter orders based on status
  const filteredOrders = orders.filter(order => 
    filter === "all" ? true : order.status.toLowerCase() === filter.toLowerCase()
  );

  // Get status badge color
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
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
      case 'confirmed':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-600',
          border: 'border-blue-200',
          icon: (
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        };
      case 'preparing':
        return {
          bg: 'bg-purple-100',
          text: 'text-purple-600',
          border: 'border-purple-200',
          icon: (
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          )
        };
      case 'out for delivery':
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
      case 'delivered':
        return {
          bg: 'bg-green-100',
          text: 'text-green-600',
          border: 'border-green-200',
          icon: (
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )
        };
      case 'cancelled':
        return {
          bg: 'bg-red-100',
          text: 'text-red-600',
          border: 'border-red-200',
          icon: (
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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

  // Format order ID to be more readable
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100/30 to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg mt-2 p-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20">
          <div className="flex items-center gap-3 mb-2">
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Your Orders
            </h1>
          </div>
          <p className="text-orange-100 ml-12">Track and manage your food orders</p>
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
            onClick={() => setFilter("pending")}
            className={`bg-white rounded-xl shadow-md p-4 cursor-pointer transition-all hover:shadow-lg ${filter === 'pending' ? 'ring-2 ring-yellow-500 border-yellow-500' : ''}`}
          >
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {orders.filter(o => o.status?.toLowerCase() === 'pending').length}
            </p>
          </div>
          <div 
            onClick={() => setFilter("preparing")}
            className={`bg-white rounded-xl shadow-md p-4 cursor-pointer transition-all hover:shadow-lg ${filter === 'preparing' ? 'ring-2 ring-purple-500 border-purple-500' : ''}`}
          >
            <p className="text-sm text-gray-500">Preparing</p>
            <p className="text-2xl font-bold text-purple-600">
              {orders.filter(o => o.status?.toLowerCase() === 'preparing').length}
            </p>
          </div>
          <div 
            onClick={() => setFilter("out for delivery")}
            className={`bg-white rounded-xl shadow-md p-4 cursor-pointer transition-all hover:shadow-lg ${filter === 'out for delivery' ? 'ring-2 ring-orange-500 border-orange-500' : ''}`}
          >
            <p className="text-sm text-gray-500">Out for Delivery</p>
            <p className="text-2xl font-bold text-orange-600">
              {orders.filter(o => o.status?.toLowerCase() === 'out for delivery').length}
            </p>
          </div>
          <div 
            onClick={() => setFilter("delivered")}
            className={`bg-white rounded-xl shadow-md p-4 cursor-pointer transition-all hover:shadow-lg ${filter === 'delivered' ? 'ring-2 ring-green-500 border-green-500' : ''}`}
          >
            <p className="text-sm text-gray-500">Delivered</p>
            <p className="text-2xl font-bold text-green-600">
              {orders.filter(o => o.status?.toLowerCase() === 'delivered').length}
            </p>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-32 h-32 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center">
                <svg className="w-16 h-16 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-3">No Orders Found</h3>
              <p className="text-gray-500 mb-8">
                {filter !== 'all' ? `No ${filter} orders at the moment` : 'You haven\'t placed any orders yet'}
              </p>
              <button
                onClick={() => navigate("/dashboard")}
                className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Browse Restaurants
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {/* Header - Hidden on mobile */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200">
                <div className="col-span-3 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Order ID
                </div>
                <div className="col-span-2 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </div>
                <div className="col-span-2 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Total
                </div>
                <div className="col-span-3 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </div>
                <div className="col-span-2 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Action
                </div>
              </div>

              {/* Orders */}
              {filteredOrders.map((order) => {
                const statusBadge = getStatusBadge(order.status);
                return (
                  <div
                    key={order._id}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-5 hover:bg-orange-50/50 transition-colors duration-200"
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
                    <div className="md:col-span-2 flex items-center">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-lg font-bold text-orange-600">₹ {order.total}</span>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="md:col-span-3 flex items-center">
                      <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border ${statusBadge.bg} ${statusBadge.text} ${statusBadge.border}`}>
                        {statusBadge.icon}
                        {order.status}
                      </span>
                    </div>

                    {/* Action */}
                    <div className="md:col-span-2 flex items-center">
                      <button
                        onClick={() => setSelectedOrder(selectedOrder === order._id ? null : order._id)}
                        className="group inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
                      >
                        <span>View Details</span>
                        <svg className={`w-4 h-4 transition-transform ${selectedOrder === order._id ? 'rotate-90' : 'group-hover:translate-x-1'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>

                    {/* Expanded Details */}
                    {selectedOrder === order._id && (
                      <div className="col-span-12 mt-4 p-4 bg-orange-50/50 rounded-xl border border-orange-200">
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
                              <span className="font-semibold text-orange-600">₹ {item.product?.price * item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderStatus;