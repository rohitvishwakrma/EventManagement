import { useNavigate } from "react-router-dom";

function VendorDashboard() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (

    <div className="min-h-screen bg-gray-100 p-20">

      <h1 className="text-3xl font-bold mb-8">
        Vendor Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div
          onClick={()=>navigate("/vendor/products")}
          className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-xl transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            Your Items
          </h2>

          <p className="text-gray-500">
            View and manage your products
          </p>
        </div>

        <div
          onClick={()=>navigate("/vendor/add-product")}
          className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-xl transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            Add New Item
          </h2>

          <p className="text-gray-500">
            Add new product to your catalog
          </p>
        </div>

        <div
          onClick={()=>navigate("/vendor/transactions")}
          className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-xl transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            Transactions
          </h2>

          <p className="text-gray-500">
            Manage orders and update status
          </p>
        </div>

      </div>

      <div className="mt-10">

        <button
          onClick={logout}
          className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>

      </div>

    </div>

  );
}

export default VendorDashboard;