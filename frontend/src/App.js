import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import VendorDashboard from "./pages/VendorDashboard";
import UserDashboard from "./pages/UserDashboard";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import GuestList from "./pages/GuestList";
import OrderStatus from "./pages/OrderStatus";
import VendorProducts from "./pages/VendorProducts";
import AddProduct from "./pages/AddProduct";
import Transactions from "./pages/Transactions";
import UpdateProduct from "./pages/UpdateProduct";
import UserOrders from "./pages/UserOrders";
import AdminUsers from "./pages/AdminUsers";
import AdminVendors from "./pages/AdminVendors";
import Membership from "./pages/Membership";
import Navbar from "./components/Navbar";
function App() {

    return (

        <Router>
            <Navbar />
            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/admin" element={<AdminDashboard />} />

                <Route path="/vendor" element={<VendorDashboard />} />

                <Route path="/user" element={<UserDashboard />} />

                <Route path="/cart" element={<Cart />} />

                <Route path="/checkout" element={<Checkout />} />

                <Route path="/guests" element={<GuestList />} />

                <Route path="/orders" element={<OrderStatus />} />
                <Route path="/vendor/products" element={<VendorProducts />} />
                <Route path="/vendor/add-product" element={<AddProduct />} />
                <Route path="/vendor/transactions" element={<Transactions />} />
                <Route path="/vendor/update/:id" element={<UpdateProduct />} />
                <Route path="/user/orders" element={<UserOrders />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/vendors" element={<AdminVendors />} />
                <Route path="/admin/membership" element={<Membership />} />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                theme="colored"
            />
        </Router>
    );

}

export default App;
// function App() {
//   return (
//     <div className="bg-red-500 text-white text-4xl p-10">
//       Tailwind Test
//     </div>
//   );
// }

// export default App;