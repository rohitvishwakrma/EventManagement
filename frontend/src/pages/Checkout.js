
import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      setCartItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const handleOrder = async () => {
    try {
      await API.post("/orders/create", {
        items: cartItems.map(item => ({ product: item.product._id, quantity: item.quantity })),
        total: getTotal()
      });
      toast.success("Order Placed Successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Error placing order");
    }
  };

  return (
    <div className="min-h-screen bg-orange-50">
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <i className="ri-file-list-3-line"></i>
            Checkout
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20">
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <i className="ri-shopping-cart-line text-5xl text-orange-500 mb-4"></i>
            <p className="text-gray-500 mb-4">No items to checkout</p>
            <button onClick={() => navigate("/dashboard")} className="bg-orange-500 text-white px-6 py-2 rounded-lg">
              Browse Restaurants
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2">
              <div className="bg-white rounded-xl shadow-lg">
                <div className="p-4 border-b bg-gray-50">
                  <h2 className="font-semibold flex items-center gap-2">
                    <i className="ri-shopping-bag-line text-orange-500"></i>
                    Order Items ({cartItems.length})
                  </h2>
                </div>
                {cartItems.map((item) => (
                  <div key={item._id} className="p-4 border-b flex justify-between">
                    <div className="flex items-center gap-3">
                      <i className="ri-cake-3-line text-orange-500"></i>
                      <span>{item.product.name}</span>
                    </div>
                    <div className="flex gap-6">
                      <span>Qty: {item.quantity}</span>
                      <span className="text-orange-500 font-bold">₹{item.product.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="font-semibold mb-4 flex items-center gap-2">
                  <i className="ri-file-list-3-line text-orange-500"></i>
                  Order Summary
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{getTotal()}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Delivery Fee</span>
                    <span>FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span className="text-xl font-bold text-orange-500">₹{getTotal() + Math.round(getTotal() * 0.05)}</span>
                  </div>
                  <button onClick={handleOrder} className="w-full bg-orange-500 text-white py-3 rounded-lg mt-4 flex items-center justify-center gap-2">
                    <i className="ri-checkbox-circle-line"></i>
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;