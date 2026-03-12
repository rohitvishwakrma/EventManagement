// import { useEffect, useState } from "react";
// import API from "../services/api";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// function Checkout() {
//   const [cartItems, setCartItems] = useState([]);
//   const navigate = useNavigate();

//   const fetchCart = async () => {
//     try {
//       const res = await API.get("/cart");
//       setCartItems(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const getTotal = () => {
//     return cartItems.reduce((total, item) => {
//       return total + item.product.price * item.quantity;
//     }, 0);
//   };

//   const handleOrder = async () => {
//     try {
//       await API.post("/orders/create", {
//         items: cartItems.map(item => ({
//           product: item.product._id,
//           quantity: item.quantity
//         })),
//         total: getTotal()
//       });

//       toast.success("Order Placed Successfully");
//       navigate("/dashboard");
//     } catch (error) {
//       console.log(error);
//       toast.error("Error placing order");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-orange-50">
//       {/* Simple Header */}
//       <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg p-3 mt-2">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20">
//           <div className="flex items-center gap-3">
//             <i className="ri-file-list-3-line text-3xl"></i>
//             <div>
//               <h1 className="text-3xl font-bold">Checkout</h1>
//               <p className="text-orange-100 mt-1">Review your order and complete payment</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20">
//         {cartItems.length === 0 ? (
//           <div className="bg-white rounded-xl shadow-lg p-12 text-center max-w-2xl mx-auto">
//             <div className="w-24 h-24 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
//               <i className="ri-shopping-cart-line text-4xl text-orange-500"></i>
//             </div>
//             <h3 className="text-2xl font-semibold text-gray-800 mb-2">No items to checkout</h3>
//             <p className="text-gray-500 mb-6">Your cart is empty. Add some delicious items first!</p>
//             <button
//               onClick={() => navigate("/dashboard")}
//               className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 inline-flex items-center gap-2"
//             >
//               <i className="ri-restaurant-line"></i>
//               Browse Restaurants
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Order Items Section */}
//             <div className="lg:col-span-2">
//               <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//                 {/* Header */}
//                 <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
//                   <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//                     <i className="ri-shopping-bag-line text-orange-500"></i>
//                     Order Items ({cartItems.length})
//                   </h2>
//                 </div>

//                 {/* Items List */}
//                 <div className="divide-y divide-gray-200">
//                   {cartItems.map((item, index) => (
//                     <div key={item._id} className="px-6 py-4 hover:bg-orange-50/50 transition-colors">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-4 flex-1">
//                           {/* Item Icon */}
//                           <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
//                             <i className="ri-cake-3-line text-orange-500"></i>
//                           </div>
                          
//                           {/* Item Details */}
//                           <div>
//                             <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
//                             <p className="text-xs text-gray-400">Item #{index + 1}</p>
//                           </div>
//                         </div>

//                         <div className="flex items-center gap-6">
//                           {/* Quantity */}
//                           <div className="text-center">
//                             <p className="text-xs text-gray-400 mb-1">Qty</p>
//                             <span className="font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-lg">
//                               {item.quantity}
//                             </span>
//                           </div>

//                           {/* Price */}
//                           <div className="text-right min-w-[80px]">
//                             <p className="text-xs text-gray-400 mb-1">Price</p>
//                             <span className="text-lg font-bold text-orange-500">
//                               ₹{item.product.price}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Order Summary Section */}
//             <div className="lg:col-span-1">
//               <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-8">
//                 {/* Summary Header */}
//                 <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-4">
//                   <h2 className="text-lg font-semibold flex items-center gap-2">
//                     <i className="ri-file-list-3-line"></i>
//                     Order Summary
//                   </h2>
//                 </div>

//                 {/* Summary Details */}
//                 <div className="p-6">
//                   {/* Subtotal */}
//                   <div className="flex justify-between items-center py-3 border-b border-gray-200">
//                     <span className="text-gray-600">Subtotal</span>
//                     <span className="font-semibold text-gray-800">₹{getTotal()}</span>
//                   </div>

//                   {/* Delivery Fee */}
//                   <div className="flex justify-between items-center py-3 border-b border-gray-200">
//                     <span className="text-gray-600">Delivery Fee</span>
//                     <span className="font-semibold text-green-600 flex items-center gap-1">
//                       <i className="ri-checkbox-circle-line"></i>
//                       FREE
//                     </span>
//                   </div>

//                   {/* Tax */}
//                   <div className="flex justify-between items-center py-3 border-b border-gray-200">
//                     <span className="text-gray-600">Tax (GST)</span>
//                     <span className="font-semibold text-gray-800">₹{Math.round(getTotal() * 0.05)}</span>
//                   </div>

//                   {/* Total */}
//                   <div className="flex justify-between items-center py-4">
//                     <span className="text-lg font-semibold text-gray-800">Total Amount</span>
//                     <span className="text-2xl font-bold text-orange-500">
//                       ₹{getTotal() + Math.round(getTotal() * 0.05)}
//                     </span>
//                   </div>

//                   {/* Payment Method */}
//                   <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//                     <div className="flex items-center gap-2 mb-3">
//                       <i className="ri-bank-card-line text-orange-500"></i>
//                       <span className="font-semibold text-gray-700">Payment Method</span>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <input 
//                         type="radio" 
//                         checked 
//                         readOnly 
//                         className="text-orange-500 focus:ring-orange-500"
//                       />
//                       <span className="text-gray-600 flex items-center gap-1">
//                         <i className="ri-money-rupee-circle-line"></i>
//                         Cash on Delivery
//                       </span>
//                     </div>
//                   </div>

//                   {/* Place Order Button */}
//                   <button
//                     onClick={handleOrder}
//                     className="w-full mt-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
//                   >
//                     <i className="ri-checkbox-circle-line"></i>
//                     Place Order
//                   </button>

//                   {/* Back to Cart Link */}
//                   <button
//                     onClick={() => navigate("/cart")}
//                     className="w-full mt-3 text-gray-500 hover:text-orange-500 transition-colors flex items-center justify-center gap-2 text-sm"
//                   >
//                     <i className="ri-arrow-left-line"></i>
//                     Back to Cart
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Checkout;

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