import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function UserDashboard() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await API.post("/cart/add", {
        product: productId,
        quantity: 1
      });
      toast.success("Added to Cart");

      const res = await API.get("/cart");
      if (res.data.length === 1) {
        navigate("/cart");
      }
    } catch (error) {
      toast.error("Error adding to cart");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100/30 to-orange-50 ">
      {/* Header with Gradient - Matching Admin Dashboard */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg p-3 mt-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20 ">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <i className="ri-user-3-line text-3xl"></i>
                User Dashboard
              </h1>
              <p className="text-orange-100 mt-1">Welcome back! Discover delicious food</p>
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
                <p className="text-3xl font-bold text-gray-800 mt-2">{products.length}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <i className="ri-store-3-line text-2xl text-orange-500"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider">In Your Cart</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">0</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <i className="ri-shopping-cart-line text-2xl text-orange-500"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Quick Action</p>
                <p className="text-lg font-bold text-gray-800 mt-2">View Cart</p>
              </div>
              <button
                onClick={() => navigate("/cart")}
                className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center hover:bg-orange-200 transition-colors"
              >
                <i className="ri-arrow-right-s-line text-2xl text-orange-500"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Section Title - Matching Admin Dashboard */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <i className="ri-restaurant-2-line text-orange-500"></i>
          Available Services
        </h2>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-16 text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
              <i className="ri-restaurant-line text-4xl text-orange-500"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Products Available</h3>
            <p className="text-gray-500">Check back later for new items</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
              >
                {/* Card Header with Pattern - Matching Admin Dashboard Cards */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
                
                <div className="relative p-8">
                  {/* Product Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    <i className="ri-cake-3-line text-3xl text-white"></i>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-orange-500 transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-gray-500 mb-4">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-orange-500 flex items-center gap-1">
                      <i className="ri-price-tag-3-line text-xl"></i>
                      ₹{product.price}
                    </span>
                    <span className="text-sm text-gray-400 flex items-center gap-1">
                      <i className="ri-time-line"></i>
                      30 min
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product._id)}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <i className="ri-shopping-cart-line"></i>
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;