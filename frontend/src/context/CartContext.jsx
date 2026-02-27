import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

export const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    items: [],
    totalItems: 0,
    totalAmount: 0,
    grandTotal: 0
  });
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, user } = useAuth();

  // Fetch cart on authentication change
  useEffect(() => {
    if (isAuthenticated && user?.role === 'user') {
      fetchCart();
    } else {
      // Initialize empty cart for non-authenticated users
      setCart({
        items: [],
        totalItems: 0,
        totalAmount: 0,
        grandTotal: 0
      });
    }
  }, [isAuthenticated, user]);

  // Fetch cart from API
  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await api.get('/orders/cart');
      const cartData = response.data.cart || { items: [], totalItems: 0, totalAmount: 0 };
      
      // Calculate grand total
      const grandTotal = cartData.totalAmount || 
        cartData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      setCart({
        ...cartData,
        grandTotal
      });
    } catch (error) {
      console.error('Error fetching cart:', error);
      // Don't show toast for 401 as it's expected when not logged in
      if (error.response?.status !== 401) {
        toast.error('Failed to load cart');
      }
    } finally {
      setLoading(false);
    }
  };

  // Add item to cart
  const addToCart = async (productId, quantity = 1, productData = null) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      throw new Error('Authentication required');
    }

    try {
      setLoading(true);
      const response = await api.post('/orders/cart/add', { 
        productId, 
        quantity,
        ...productData 
      });
      
      const updatedCart = response.data.cart;
      const grandTotal = updatedCart.totalAmount || 
        updatedCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      setCart({
        ...updatedCart,
        grandTotal
      });
      
      toast.success('Item added to cart');
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      const message = error.response?.data?.message || 'Failed to add item to cart';
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update cart item quantity
  const updateCartItem = async (itemId, quantity) => {
    if (quantity < 1) {
      // If quantity is less than 1, remove the item
      return removeFromCart(itemId);
    }

    try {
      setLoading(true);
      const response = await api.put(`/orders/cart/item/${itemId}`, { quantity });
      
      const updatedCart = response.data.cart;
      const grandTotal = updatedCart.totalAmount || 
        updatedCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      setCart({
        ...updatedCart,
        grandTotal
      });
      
      return response.data;
    } catch (error) {
      console.error('Error updating cart:', error);
      const message = error.response?.data?.message || 'Failed to update cart';
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    try {
      setLoading(true);
      const response = await api.delete(`/orders/cart/item/${itemId}`);
      
      const updatedCart = response.data.cart;
      const grandTotal = updatedCart.totalAmount || 
        updatedCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      setCart({
        ...updatedCart,
        grandTotal
      });
      
      toast.success('Item removed from cart');
      return response.data;
    } catch (error) {
      console.error('Error removing from cart:', error);
      const message = error.response?.data?.message || 'Failed to remove item';
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    try {
      setLoading(true);
      const response = await api.delete('/orders/cart/clear');
      
      setCart({
        items: [],
        totalItems: 0,
        totalAmount: 0,
        grandTotal: 0
      });
      
      toast.success('Cart cleared');
      return response.data;
    } catch (error) {
      console.error('Error clearing cart:', error);
      const message = error.response?.data?.message || 'Failed to clear cart';
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Get cart item count
  const getItemCount = useCallback(() => {
    return cart?.items?.length || 0;
  }, [cart]);

  // Get cart total
  const getCartTotal = useCallback(() => {
    return cart?.grandTotal || 0;
  }, [cart]);

  // Check if item is in cart
  const isInCart = useCallback((productId) => {
    return cart?.items?.some(item => item.productId === productId || item._id === productId);
  }, [cart]);

  // Get cart item quantity
  const getItemQuantity = useCallback((productId) => {
    const item = cart?.items?.find(item => item.productId === productId || item._id === productId);
    return item?.quantity || 0;
  }, [cart]);

  // Calculate grand total (useful for local calculations)
  const calculateGrandTotal = useCallback(() => {
    if (!cart?.items) return 0;
    return cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cart]);

  const value = {
    // State
    cart,
    loading,
    
    // Cart data
    items: cart?.items || [],
    totalItems: cart?.totalItems || cart?.items?.length || 0,
    totalAmount: cart?.totalAmount || 0,
    grandTotal: cart?.grandTotal || calculateGrandTotal(),
    
    // Actions
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    refreshCart: fetchCart,
    
    // Helper functions
    getItemCount,
    getCartTotal,
    isInCart,
    getItemQuantity,
    calculateGrandTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};