// import { useNavigate } from "react-router-dom";

// function Navbar() {

//   const navigate = useNavigate();

//   const role = localStorage.getItem("role");

//   const handleLogout = () => {

//     // remove all login data
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     localStorage.removeItem("user");

//     // OR use this
//     // localStorage.clear();

//     navigate("/");
//   };

//   return (

//     <div className="fixed top-0 left-0 w-full bg-blue-600 text-white flex justify-between items-center px-6 py-10 shadow-md z-50">

//       <h1
//         className="text-xl font-bold cursor-pointer"
//         onClick={() => navigate("/")}
//       >
//         Event Management System
//       </h1>

//       <div className="flex items-center gap-4">

//         {role && (
//           <span className="capitalize bg-blue-500 px-3 py-1 rounded text-sm">
//             {role}
//           </span>
//         )}

//         <button
//           onClick={handleLogout}
//           className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-200 transition"
//         >
//           Logout
//         </button>

//       </div>

//     </div>

//   );

// }

// export default Navbar;

import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = user.name || "User";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md border-b border-gray-100 flex justify-between items-center px-6 py-3 z-50">
      {/* Logo Section */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <i className="ri-restaurant-2-line text-2xl text-orange-500"></i>
        <h1 className="text-xl font-bold text-gray-800">
          Foodie<span className="text-orange-500">Hub</span>
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Role Badge */}
        {role && (
          <div className="flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-full">
            <i className="ri-shield-user-line text-orange-500 text-sm"></i>
            <span className="capitalize text-sm font-medium text-orange-600">
              {role}
            </span>
          </div>
        )}

        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-orange-500">
              {userName.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="text-sm font-medium text-gray-700 hidden md:block">
            {userName}
          </span>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-gray-50 text-gray-700 px-4 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all duration-300"
        >
          <i className="ri-logout-box-line"></i>
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Navbar;