import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const handleLogout = () => {

    // remove all login data
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    // OR use this
    // localStorage.clear();

    navigate("/");
  };

  return (

    <div className="fixed top-0 left-0 w-full bg-blue-600 text-white flex justify-between items-center px-6 py-4 shadow-md z-50">

      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Event Management System
      </h1>

      <div className="flex items-center gap-4">

        {role && (
          <span className="capitalize bg-blue-500 px-3 py-1 rounded text-sm">
            {role}
          </span>
        )}

        <button
          onClick={handleLogout}
          className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-200 transition"
        >
          Logout
        </button>

      </div>

    </div>

  );

}

export default Navbar;