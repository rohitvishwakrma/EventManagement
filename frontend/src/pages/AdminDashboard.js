

import { useNavigate } from "react-router-dom";
// import Layout from "../components/Layout";

function AdminDashboard() {
  const navigate = useNavigate();

  // Stats data (mock - you can replace with real data from props/API)
  const stats = {
    users: 12453,
    vendors: 342,
    memberships: 89
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100/30 to-orange-50">
      {/* Header with Gradient */ }
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-2 h-16">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-1">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Admin Dashboard
              </h1>
              <p className="text-orange-100 mt-2">Welcome back! Manage your platform efficiently</p>
            </div>

            {/* Date Display */ }
            <div className="hidden md:block bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
              <p className="text-sm text-orange-100">{ new Date().toLocaleDateString( 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } ) }</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */ }
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Total Users</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{ stats.users.toLocaleString() }</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span>+12% this month</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Active Vendors</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{ stats.vendors.toLocaleString() }</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span>+5 new this week</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Active Memberships</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{ stats.memberships.toLocaleString() }</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-orange-600">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span>15 expiring soon</span>
            </div>
          </div>
        </div>

        {/* Management Cards */ }
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Users Card */ }
          <div
            onClick={ () => navigate( "/admin/users" ) }
            className="group relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
            <div className="relative p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-orange-500 transition-colors">
                Maintain Users
              </h2>
              <p className="text-gray-500 mb-4 ">
                View and manage all system users, their roles, and permissions
              </p>
              <div className="flex items-center text-orange-500 font-semibold">
                <span>Manage Users</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Vendors Card */ }
          <div
            onClick={ () => navigate( "/admin/vendors" ) }
            className="group relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
            <div className="relative p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-orange-500 transition-colors">
                Maintain Vendors
              </h2>
              <p className="text-gray-500 mb-4">
                Manage vendor accounts, approve new vendors, and monitor activity
              </p>
              <div className="flex items-center text-orange-500 font-semibold">
                <span>Manage Vendors</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Membership Card */ }
          <div
            onClick={ () => navigate( "/admin/membership" ) }
            className="group relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
            <div className="relative p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-orange-500 transition-colors">
                Membership
              </h2>
              <p className="text-gray-500 mb-4">
                Assign or update vendor memberships, track subscriptions
              </p>
              <div className="flex items-center text-orange-500 font-semibold">
                <span>Manage Memberships</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */ }
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Recent Activity
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-3 hover:bg-orange-50 rounded-lg transition-colors">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-sm text-gray-600">New vendor registered: "Spicy Kitchen"</p>
              <span className="text-xs text-gray-400 ml-auto">5 min ago</span>
            </div>
            <div className="flex items-center gap-4 p-3 hover:bg-orange-50 rounded-lg transition-colors">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <p className="text-sm text-gray-600">Membership updated for "Fresh Eats"</p>
              <span className="text-xs text-gray-400 ml-auto">2 hours ago</span>
            </div>
            <div className="flex items-center gap-4 p-3 hover:bg-orange-50 rounded-lg transition-colors">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-sm text-gray-600">3 new user accounts created</p>
              <span className="text-xs text-gray-400 ml-auto">1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

// import { useNavigate } from "react-router-dom";
// // import Layout from "../components/Layout";

// function AdminDashboard(){

//   const navigate = useNavigate();

//   return(

//     <div className="min-h-screen bg-gray-100 p-20">

//       <h1 className="text-3xl font-bold mb-8">
//         Admin Dashboard
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

//         <div 
//           onClick={()=>navigate("/admin/users")}
//           className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-xl transition"
//         >
//           <h2 className="text-xl font-semibold mb-2">
//             Maintain Users
//           </h2>

//           <p className="text-gray-500">
//             View and manage all system users
//           </p>
//         </div>

//         <div 
//           onClick={()=>navigate("/admin/vendors")}
//           className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-xl transition"
//         >
//           <h2 className="text-xl font-semibold mb-2">
//             Maintain Vendors
//           </h2>

//           <p className="text-gray-500">
//             Manage vendor accounts and data
//           </p>
//         </div>

//         <div 
//           onClick={()=>navigate("/admin/membership")}
//           className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-xl transition"
//         >
//           <h2 className="text-xl font-semibold mb-2">
//             Membership
//           </h2>

//           <p className="text-gray-500">
//             Assign or update vendor memberships
//           </p>
//         </div>

//       </div>

//     </div>

//   )

// }

// export default AdminDashboard;