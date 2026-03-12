// import { useNavigate } from "react-router-dom";

// function Sidebar() {

//   const navigate = useNavigate();
//   const role = localStorage.getItem("role");

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     navigate("/");
//   };

//   return (

//     <div className="w-64 h-screen bg-gray-900 text-white fixed left-0 top-0 p-6">

//       <h2 className="text-xl font-bold mb-8">
//         Event Manager
//       </h2>

//       <div className="space-y-4">

//         {/* Admin Links */}

//         {role === "admin" && (
//           <>
//             <button
//               onClick={()=>navigate("/admin")}
//               className="block w-full text-left hover:text-blue-400"
//             >
//               Dashboard
//             </button>

//             <button
//               onClick={()=>navigate("/admin/users")}
//               className="block w-full text-left hover:text-blue-400"
//             >
//               Users
//             </button>

//             <button
//               onClick={()=>navigate("/admin/vendors")}
//               className="block w-full text-left hover:text-blue-400"
//             >
//               Vendors
//             </button>

//             <button
//               onClick={()=>navigate("/admin/membership")}
//               className="block w-full text-left hover:text-blue-400"
//             >
//               Membership
//             </button>
//           </>
//         )}

//         {/* Vendor Links */}

//         {role === "vendor" && (
//           <>
//             <button
//               onClick={()=>navigate("/vendor")}
//               className="block w-full text-left hover:text-blue-400"
//             >
//               Dashboard
//             </button>

//             <button
//               onClick={()=>navigate("/vendor/products")}
//               className="block w-full text-left hover:text-blue-400"
//             >
//               Your Products
//             </button>

//             <button
//               onClick={()=>navigate("/vendor/add-product")}
//               className="block w-full text-left hover:text-blue-400"
//             >
//               Add Product
//             </button>

//             <button
//               onClick={()=>navigate("/vendor/transactions")}
//               className="block w-full text-left hover:text-blue-400"
//             >
//               Transactions
//             </button>
//           </>
//         )}

//         {/* User Links */}

//         {role === "user" && (
//           <>
//             <button
//               onClick={()=>navigate("/user")}
//               className="block w-full text-left hover:text-blue-400"
//             >
//               Dashboard
//             </button>

//             <button
//               onClick={()=>navigate("/cart")}
//               className="block w-full text-left hover:text-blue-400"
//             >
//               Cart
//             </button>

//             <button
//               onClick={()=>navigate("/user/orders")}
//               className="block w-full text-left hover:text-blue-400"
//             >
//               Orders
//             </button>

//             <button
//               onClick={()=>navigate("/guest-list")}
//               className="block w-full text-left hover:text-blue-400"
//             >
//               Guest List
//             </button>
//           </>
//         )}

//       </div>

//       <div className="mt-10">

//         <button
//           onClick={logout}
//           className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
//         >
//           Logout
//         </button>

//       </div>

//     </div>

//   );

// }

// export default Sidebar;

import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/");
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = user.name || "User";

  return (
    <div className="w-64 h-screen bg-white shadow-lg fixed left-0 top-0 flex flex-col border-r border-gray-100">
      {/* Simple Logo */}
      <div className="p-5 border-b">
        <div className="flex items-center gap-2">
          <i className="ri-restaurant-2-line text-2xl text-orange-500"></i>
          <h2 className="text-xl font-bold text-gray-800">Foodie<span className="text-orange-500">Hub</span></h2>
        </div>
      </div>

      {/* Simple User Info */}
      <div className="p-5 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <span className="text-lg font-bold text-orange-500">{userName.charAt(0).toUpperCase()}</span>
          </div>
          <div>
            <p className="font-medium text-gray-800">{userName}</p>
            <p className="text-xs text-gray-500 capitalize flex items-center gap-1">
              <i className="ri-shield-user-line"></i>
              {role}
            </p>
          </div>
        </div>
      </div>

      {/* Simple Navigation */}
      <div className="flex-1 p-4">
        <p className="text-xs text-gray-400 mb-3">MENU</p>
        <div className="space-y-1">
          {/* Admin Links */}
          {role === "admin" && (
            <>
              <button onClick={() => navigate("/admin")} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-600">
                <i className="ri-dashboard-line"></i>
                <span>Dashboard</span>
              </button>
              <button onClick={() => navigate("/admin/users")} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-600">
                <i className="ri-user-line"></i>
                <span>Users</span>
              </button>
              <button onClick={() => navigate("/admin/vendors")} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-600">
                <i className="ri-store-line"></i>
                <span>Vendors</span>
              </button>
              <button onClick={() => navigate("/admin/membership")} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-600">
                <i className="ri-vip-crown-line"></i>
                <span>Membership</span>
              </button>
            </>
          )}

          {/* Vendor Links */}
          {role === "vendor" && (
            <>
              <button onClick={() => navigate("/vendor")} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-600">
                <i className="ri-dashboard-line"></i>
                <span>Dashboard</span>
              </button>
              <button onClick={() => navigate("/vendor/products")} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-600">
                <i className="ri-shopping-bag-line"></i>
                <span>Products</span>
              </button>
              <button onClick={() => navigate("/vendor/add-product")} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-600">
                <i className="ri-add-line"></i>
                <span>Add Product</span>
              </button>
              <button onClick={() => navigate("/vendor/transactions")} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-600">
                <i className="ri-file-list-line"></i>
                <span>Orders</span>
              </button>
            </>
          )}

          {/* User Links */}
          {role === "user" && (
            <>
              <button onClick={() => navigate("/user")} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-600">
                <i className="ri-dashboard-line"></i>
                <span>Dashboard</span>
              </button>
              <button onClick={() => navigate("/cart")} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-600">
                <i className="ri-shopping-cart-line"></i>
                <span>Cart</span>
              </button>
              <button onClick={() => navigate("/user/orders")} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-600">
                <i className="ri-truck-line"></i>
                <span>Orders</span>
              </button>
              <button onClick={() => navigate("/guest-list")} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-600">
                <i className="ri-team-line"></i>
                <span>Guest List</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Simple Logout */}
      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="w-full bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-red-50 hover:text-red-600 flex items-center justify-center gap-2"
        >
          <i className="ri-logout-box-line"></i>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;