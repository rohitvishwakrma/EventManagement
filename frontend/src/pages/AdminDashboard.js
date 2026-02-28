import { useNavigate } from "react-router-dom";
// import Layout from "../components/Layout";

function AdminDashboard(){

  const navigate = useNavigate();

  return(

    <div className="min-h-screen bg-gray-100 p-20">

      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div 
          onClick={()=>navigate("/admin/users")}
          className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-xl transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            Maintain Users
          </h2>

          <p className="text-gray-500">
            View and manage all system users
          </p>
        </div>

        <div 
          onClick={()=>navigate("/admin/vendors")}
          className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-xl transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            Maintain Vendors
          </h2>

          <p className="text-gray-500">
            Manage vendor accounts and data
          </p>
        </div>

        <div 
          onClick={()=>navigate("/admin/membership")}
          className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-xl transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            Membership
          </h2>

          <p className="text-gray-500">
            Assign or update vendor memberships
          </p>
        </div>

      </div>

    </div>

  )

}

export default AdminDashboard;