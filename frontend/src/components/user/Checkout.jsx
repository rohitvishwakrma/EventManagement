import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useForm } from 'react-hook-form';
import api from '../../services/api';
import toast from 'react-hot-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const paymentMethods = [
    { value: 'cash', label: 'Cash on Delivery' },
    { value: 'upi', label: 'UPI' },
    { value: 'card', label: 'Credit/Debit Card' },
    { value: 'netbanking', label: 'Net Banking' },
  ];

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const orderData = {
        shippingAddress: data,
        paymentMethod: data.paymentMethod
      };
      
      const response = await api.post('/orders/create', orderData);
      toast.success('Order placed successfully!');
      await clearCart();
      navigate(`/orders/${response.data.order._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (!cart || cart.items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Shipping Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow p-6 space-y-4">
            <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Street Address *
              </label>
              <input
                type="text"
                {...register('street', { required: 'Street address is required' })}
                className="input-field"
              />
              {errors.street && (
                <p className="mt-1 text-sm text-red-600">{errors.street.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  {...register('city', { required: 'City is required' })}
                  className="input-field"
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State *
                </label>
                <input
                  type="text"
                  {...register('state', { required: 'State is required' })}
                  className="input-field"
                />
                {errors.state && (
                  <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pincode *
                </label>
                <input
                  type="text"
                  {...register('pincode', { required: 'Pincode is required' })}
                  className="input-field"
                />
                {errors.pincode && (
                  <p className="mt-1 text-sm text-red-600">{errors.pincode.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone *
                </label>
                <input
                  type="text"
                  {...register('phone', { required: 'Phone number is required' })}
                  className="input-field"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <h2 className="text-lg font-semibold mb-4 mt-6">Payment Method</h2>

            <div className="space-y-2">
              {paymentMethods.map((method) => (
                <label key={method.value} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    value={method.value}
                    {...register('paymentMethod', { required: 'Payment method is required' })}
                    className="h-4 w-4 text-primary-600"
                  />
                  <span className="text-gray-700">{method.label}</span>
                </label>
              ))}
              {errors.paymentMethod && (
                <p className="text-sm text-red-600">{errors.paymentMethod.message}</p>
              )}
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3"
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4">
              {cart.items.map((item) => (
                <div key={item._id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.name} x {item.quantity}
                  </span>
                  <span className="font-medium">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-primary-600">₹{cart.totalAmount}</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {cart.totalItems} items
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;