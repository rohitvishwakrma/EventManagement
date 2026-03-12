// import { useEffect, useState } from "react";
// import API from "../services/api";

// function AdminUsers(){

//   const [users,setUsers] = useState([]);

//   const fetchUsers = async()=>{

//     try{

//       const res = await API.get("/admin/users");

//       setUsers(res.data);

//     }catch(error){

//       console.log(error);

//     }

//   };

//   useEffect(()=>{
//     fetchUsers();
//   },[]);

//   return(

//     <div className="min-h-screen bg-gray-100 p-20">

//       {/* <h2 className="text-3xl font-bold mb-6">
//         User Management
//       </h2> */}

//       <div className="bg-white shadow rounded-lg overflow-hidden">

//         {users.length === 0 ? (

//           <p className="p-6 text-gray-500">
//             No Users Found
//           </p>

//         ) : (

//           <table className="w-full">

//             <thead className="bg-gray-200">

//               <tr>

//                 <th className="p-4 text-left">
//                   Email
//                 </th>

//                 <th className="p-4 text-left">
//                   Role
//                 </th>

//               </tr>

//             </thead>

//             <tbody>

//               {users.map(user=>(

//                 <tr 
//                   key={user._id}
//                   className="border-t hover:bg-gray-50"
//                 >

//                   <td className="p-4">
//                     {user.email}
//                   </td>

//                   <td className="p-4">

//                     <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">

//                       {user.role}

//                     </span>

//                   </td>

//                 </tr>

//               ))}

//             </tbody>

//           </table>

//         )}

//       </div>

//     </div>

//   );

// }

// export default AdminUsers;

import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users based on search and role
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Get role badge color
  const getRoleBadgeColor = (role) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'bg-purple-100 text-purple-600 border-purple-200';
      case 'vendor':
        return 'bg-orange-100 text-orange-600 border-orange-200';
      case 'user':
        return 'bg-green-100 text-green-600 border-green-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100/30 to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg p-4 mt-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  py-8 mt-20">
          <div className="flex items-center gap-3 ">
            <button
              onClick={() => navigate("/admin")}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              User Management
            </h1>
          </div>
          <p className="text-orange-100 ml-12">View and manage all system users</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-orange-500">
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-2xl font-bold text-gray-800">{users.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-purple-500">
            <p className="text-sm text-gray-500">Admins</p>
            <p className="text-2xl font-bold text-gray-800">
              {users.filter(u => u.role === 'admin').length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-orange-500">
            <p className="text-sm text-gray-500">Vendors</p>
            <p className="text-2xl font-bold text-gray-800">
              {users.filter(u => u.role === 'vendor').length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-green-500">
            <p className="text-sm text-gray-500">Regular Users</p>
            <p className="text-2xl font-bold text-gray-800">
              {users.filter(u => u.role === 'user').length}
            </p>
          </div>
        </div>

        {/* Search and Filter Bar */}
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
                placeholder="Search by email..."
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-64">
              <select
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="vendor">Vendor</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {filteredUsers.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Users Found</h3>
              <p className="text-gray-500">
                {searchTerm || roleFilter !== 'all' ? 'Try adjusting your search or filters' : 'No users have been added yet'}
              </p>
            </div>
          ) : (
            <>
              {/* Table Header - Desktop */}
              <div className="hidden md:block bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <div className="grid grid-cols-12 gap-4 px-6 py-4">
                  <div className="col-span-8 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Email Address
                  </div>
                  <div className="col-span-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Role
                  </div>
                </div>
              </div>

              {/* Users List */}
              <div className="divide-y divide-gray-200">
                {filteredUsers.map((user, index) => (
                  <div
                    key={user._id}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-5 hover:bg-orange-50/50 transition-colors duration-200"
                  >
                    {/* User Info */}
                    <div className="md:col-span-8 flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl flex items-center justify-center shadow-sm border-2 border-orange-200">
                        <span className="text-lg font-bold text-orange-500">
                          {user.email.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 break-all">{user.email}</h3>
                        <p className="text-xs text-gray-400 mt-1">User ID: {user._id.slice(-8)}</p>
                      </div>
                    </div>

                    {/* Role */}
                    <div className="md:col-span-4 flex items-center">
                      <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border ${getRoleBadgeColor(user.role)}`}>
                        {user.role === 'admin' && (
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        )}
                        {user.role === 'vendor' && (
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        )}
                        {user.role === 'user' && (
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        )}
                        {user.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Table Footer */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Showing <span className="font-semibold">{filteredUsers.length}</span> of <span className="font-semibold">{users.length}</span> users
                  </p>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-100">
                      Previous
                    </button>
                    <button className="px-3 py-1 bg-orange-500 text-white rounded-lg text-sm hover:bg-orange-600">
                      1
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-100">
                      2
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-100">
                      3
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-100">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;