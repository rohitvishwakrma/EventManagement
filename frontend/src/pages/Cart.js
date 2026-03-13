
import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      setItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = async (id) => {
    try {
      await API.delete(`/cart/${id}`);
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 ">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg  p-3 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Your Cart
          </h1>
          <p className="text-orange-100 mt-1">{items.length} item{items.length !== 1 ? 's' : ''} in your cart</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {items.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-2xl mx-auto">
            <div className="w-32 h-32 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center">
              <svg className="w-16 h-16 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Your cart is empty</h3>
            <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet</p>
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Add Item to cart
            </button>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Table Header - Hidden on mobile */}
              <div className="hidden md:block bg-gray-50 border-b border-gray-200">
                <div className="grid grid-cols-12 gap-4 px-6 py-4">
                  <div className="col-span-6 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Product
                  </div>
                  <div className="col-span-3 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Price
                  </div>
                  <div className="col-span-3 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Action
                  </div>
                </div>
              </div>

              {/* Cart Items */}
              <div className="divide-y divide-gray-200">
                {items.map((item, index) => (
                  <div
                    key={item._id}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-6 hover:bg-orange-50/50 transition-colors duration-200"
                  >
                    {/* Product Info */}
                    <div className="md:col-span-6 flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl flex items-center justify-center shadow-sm">
                        <span className="text-2xl font-bold text-orange-500">
                          {item.product.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">Item #{index + 1}</p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="md:col-span-3 flex items-center">
                      <div>
                        <span className="md:hidden text-sm text-gray-500 mr-2">Price:</span>
                        <span className="text-xl font-bold text-orange-500">₹ {item.product.price}</span>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="md:col-span-3 flex items-center">
                      <button
                        onClick={() => removeItem(item._id)}
                        className="group flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                      >
                        <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Footer */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-gray-600">Total Items: </span>
                    <span className="font-semibold text-gray-800">{items.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Total Amount: </span>
                    <span className="text-2xl font-bold text-orange-500">
                      ₹ {items.reduce((sum, item) => sum + item.product.price, 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => navigate("/checkout")}
                className="group bg-gradient-to-r from-green-500 to-green-600 text-white px-10 py-4 rounded-full font-semibold hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3"
              >
                <span>Proceed to Checkout</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;