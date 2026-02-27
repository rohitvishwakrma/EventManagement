import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, updateCartItem, removeFromCart, loading } = useCart();

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateCartItem(itemId, newQuantity);
    } catch (error) {
      toast.error('Failed to update quantity');
    }
  };

  const handleRemoveItem = async (itemId) => {
    if (window.confirm('Remove this item from cart?')) {
      try {
        await removeFromCart(itemId);
        toast.success('Item removed from cart');
      } catch (error) {
        toast.error('Failed to remove item');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="text-center py-12">
        <FiShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h3>
        <p className="mt-1 text-sm text-gray-500">
          Start shopping to add items to your cart
        </p>
        <div className="mt-6">
          <Link
            to="/products"
            className="btn-primary inline-flex items-center"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h1>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {cart.items.map((item) => (
            <li key={item._id} className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-lg overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No image
                    </div>
                  )}
                </div>

                <div className="ml-6 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-lg font-bold text-primary-600">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>

                  <p className="mt-1 text-sm text-gray-500">
                    Price: ₹{item.price} each
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100"
                      >
                        <FiMinus size={16} />
                      </button>
                      <span className="px-4 py-2 text-gray-700">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100"
                      >
                        <FiPlus size={16} />
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="bg-gray-50 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-medium text-gray-900">
                Total: <span className="text-primary-600">₹{cart.totalAmount}</span>
              </p>
              <p className="text-sm text-gray-500">
                {cart.totalItems} items
              </p>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="btn-primary px-8 py-3"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;