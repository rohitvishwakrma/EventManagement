// import { useNavigate } from "react-router-dom";

// function VendorDashboard() {

//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     navigate("/");
//   };

//   return (

//     <div className="min-h-screen bg-gray-100 p-20">

//       <h1 className="text-3xl font-bold mb-8">
//         Vendor Dashboard
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

//         <div
//           onClick={()=>navigate("/vendor/products")}
//           className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-xl transition"
//         >
//           <h2 className="text-xl font-semibold mb-2">
//             Your Items
//           </h2>

//           <p className="text-gray-500">
//             View and manage your products
//           </p>
//         </div>

//         <div
//           onClick={()=>navigate("/vendor/add-product")}
//           className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-xl transition"
//         >
//           <h2 className="text-xl font-semibold mb-2">
//             Add New Item
//           </h2>

//           <p className="text-gray-500">
//             Add new product to your catalog
//           </p>
//         </div>

//         <div
//           onClick={()=>navigate("/vendor/transactions")}
//           className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-xl transition"
//         >
//           <h2 className="text-xl font-semibold mb-2">
//             Transactions
//           </h2>

//           <p className="text-gray-500">
//             Manage orders and update status
//           </p>
//         </div>

//       </div>

//       <div className="mt-10">

//         <button
//           onClick={logout}
//           className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600"
//         >
//           Logout
//         </button>

//       </div>

//     </div>

//   );
// }

// export default VendorDashboard;

import { useNavigate } from "react-router-dom";

function VendorDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100/30 to-orange-50 ">
      {/* Header with Gradient - Matching Admin Dashboard */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg p-3 mt-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20 ">
          <div className="flex items-center justify-between ">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <i className="ri-store-3-line text-3xl"></i>
                Vendor Dashboard
              </h1>
              <p className="text-orange-100 mt-1">Welcome back! Manage your products and orders</p>
            </div>

            {/* Date Display - Matching Admin Dashboard */}
            <div className="hidden md:block bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
              <p className="text-sm text-orange-100">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats - Matching Admin Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Total Products</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">12</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <i className="ri-shopping-bag-line text-2xl text-orange-500"></i>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <i className="ri-arrow-up-line mr-1"></i>
              <span>+3 this month</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Active Orders</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">8</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <i className="ri-truck-line text-2xl text-orange-500"></i>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-orange-600">
              <i className="ri-time-line mr-1"></i>
              <span>3 ready for delivery</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">₹12,450</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <i className="ri-money-rupee-circle-line text-2xl text-orange-500"></i>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <i className="ri-arrow-up-line mr-1"></i>
              <span>+₹2,100 from last month</span>
            </div>
          </div>
        </div>

        {/* Management Cards - Matching Admin Dashboard */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <i className="ri-store-2-line text-orange-500"></i>
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Your Items Card */}
          <div
            onClick={() => navigate("/vendor/products")}
            className="group relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
            <div className="relative p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                <i className="ri-shopping-bag-3-line text-3xl text-white"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-orange-500 transition-colors">
                Your Items
              </h2>
              <p className="text-gray-500 mb-4">
                View and manage your products
              </p>
              <div className="flex items-center text-orange-500 font-semibold">
                <span>Manage Items</span>
                <i className="ri-arrow-right-s-line text-2xl ml-2 group-hover:translate-x-2 transition-transform"></i>
              </div>
            </div>
          </div>

          {/* Add New Item Card */}
          <div
            onClick={() => navigate("/vendor/add-product")}
            className="group relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
            <div className="relative p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                <i className="ri-add-circle-line text-3xl text-white"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-orange-500 transition-colors">
                Add New Item
              </h2>
              <p className="text-gray-500 mb-4">
                Add new product to your catalog
              </p>
              <div className="flex items-center text-orange-500 font-semibold">
                <span>Add Product</span>
                <i className="ri-arrow-right-s-line text-2xl ml-2 group-hover:translate-x-2 transition-transform"></i>
              </div>
            </div>
          </div>

          {/* Transactions Card */}
          <div
            onClick={() => navigate("/vendor/transactions")}
            className="group relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
            <div className="relative p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                <i className="ri-file-list-3-line text-3xl text-white"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-orange-500 transition-colors">
                Transactions
              </h2>
              <p className="text-gray-500 mb-4">
                Manage orders and update status
              </p>
              <div className="flex items-center text-orange-500 font-semibold">
                <span>View Orders</span>
                <i className="ri-arrow-right-s-line text-2xl ml-2 group-hover:translate-x-2 transition-transform"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Logout Button Section */}
        <div className="flex justify-end">
          <button
            onClick={logout}
            className="bg-red-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3 group"
          >
            <i className="ri-logout-box-line text-xl group-hover:translate-x-1 transition-transform"></i>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default VendorDashboard;