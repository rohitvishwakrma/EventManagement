import { useNavigate } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (

    <div className="w-64 h-screen bg-gray-900 text-white fixed left-0 top-0 p-6">

      <h2 className="text-xl font-bold mb-8">
        Event Manager
      </h2>

      <div className="space-y-4">

        {/* Admin Links */}

        {role === "admin" && (
          <>
            <button
              onClick={()=>navigate("/admin")}
              className="block w-full text-left hover:text-blue-400"
            >
              Dashboard
            </button>

            <button
              onClick={()=>navigate("/admin/users")}
              className="block w-full text-left hover:text-blue-400"
            >
              Users
            </button>

            <button
              onClick={()=>navigate("/admin/vendors")}
              className="block w-full text-left hover:text-blue-400"
            >
              Vendors
            </button>

            <button
              onClick={()=>navigate("/admin/membership")}
              className="block w-full text-left hover:text-blue-400"
            >
              Membership
            </button>
          </>
        )}

        {/* Vendor Links */}

        {role === "vendor" && (
          <>
            <button
              onClick={()=>navigate("/vendor")}
              className="block w-full text-left hover:text-blue-400"
            >
              Dashboard
            </button>

            <button
              onClick={()=>navigate("/vendor/products")}
              className="block w-full text-left hover:text-blue-400"
            >
              Your Products
            </button>

            <button
              onClick={()=>navigate("/vendor/add-product")}
              className="block w-full text-left hover:text-blue-400"
            >
              Add Product
            </button>

            <button
              onClick={()=>navigate("/vendor/transactions")}
              className="block w-full text-left hover:text-blue-400"
            >
              Transactions
            </button>
          </>
        )}

        {/* User Links */}

        {role === "user" && (
          <>
            <button
              onClick={()=>navigate("/user")}
              className="block w-full text-left hover:text-blue-400"
            >
              Dashboard
            </button>

            <button
              onClick={()=>navigate("/cart")}
              className="block w-full text-left hover:text-blue-400"
            >
              Cart
            </button>

            <button
              onClick={()=>navigate("/user/orders")}
              className="block w-full text-left hover:text-blue-400"
            >
              Orders
            </button>

            <button
              onClick={()=>navigate("/guest-list")}
              className="block w-full text-left hover:text-blue-400"
            >
              Guest List
            </button>
          </>
        )}

      </div>

      <div className="mt-10">

        <button
          onClick={logout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>

      </div>

    </div>

  );

}

export default Sidebar;