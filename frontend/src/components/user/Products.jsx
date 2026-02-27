import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../services/userService';
import { FiShoppingCart, FiEye } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    try {
      const response = await userService.getAllProducts();
      setProducts(response.products);
      setCategories(response.categories || []);
    } catch (error) {
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId, 1);
      toast.success('Added to cart');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Your Item</h1>

      {/* Categories */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategory('')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            selectedCategory === '' 
              ? 'bg-primary-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${
              selectedCategory === cat 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
            <Link to={`/products/${product._id}`}>
              <div className="h-48 bg-gray-200 overflow-hidden">
                {product.images?.[0] ? (
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No image
                  </div>
                )}
              </div>
            </Link>

            <div className="p-4">
              <Link to={`/products/${product._id}`}>
                <h3 className="text-lg font-semibold text-gray-900 mb-1 hover:text-primary-600">
                  {product.name}
                </h3>
              </Link>
              
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-bold text-primary-600">
                  ₹{product.price}
                </span>
                <span className="text-sm text-gray-500">
                  Stock: {product.stock}
                </span>
              </div>

              <div className="flex space-x-2">
                <Link
                  to={`/products/${product._id}`}
                  className="flex-1 btn-secondary text-sm py-2 flex items-center justify-center"
                >
                  <FiEye className="mr-1" /> View
                </Link>
                <button
                  onClick={() => handleAddToCart(product._id)}
                  disabled={product.stock === 0}
                  className="flex-1 btn-primary text-sm py-2 flex items-center justify-center disabled:opacity-50"
                >
                  <FiShoppingCart className="mr-1" /> Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products available</p>
        </div>
      )}
    </div>
  );
};

export default Products;