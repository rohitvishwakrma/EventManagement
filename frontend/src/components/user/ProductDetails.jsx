import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import userService from '../../services/userService';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { FiShoppingCart, FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [review, setReview] = useState({ rating: 5, comment: '' });

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const response = await userService.getProductById(id);
      setProduct(response.product);
      setRelatedProducts(response.relatedProducts || []);
    } catch (error) {
      toast.error('Failed to fetch product details');
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }

    try {
      await addToCart(product._id, quantity);
      toast.success('Added to cart');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      await userService.addReview(product._id, review);
      toast.success('Review added successfully');
      fetchProductDetails();
      setReview({ rating: 5, comment: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add review');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Product Details */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Image Gallery */}
          <div>
            <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden mb-4">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[currentImageIndex]?.url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No image available
                </div>
              )}
            </div>
            
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      currentImageIndex === index ? 'border-primary-600' : 'border-transparent'
                    }`}
                  >
                    <img src={image.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`${i < Math.floor(product.averageRating) ? 'fill-current' : ''}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                ({product.reviews?.length || 0} reviews)
              </span>
            </div>

            <p className="text-3xl font-bold text-primary-600 mb-4">₹{product.price}</p>
            
            <div className="mb-4">
              <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </span>
            </div>

            <div className="prose max-w-none mb-6">
              <p className="text-gray-700">{product.description}</p>
            </div>

            {product.specifications && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Specifications</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex py-2 border-b last:border-0">
                      <span className="w-1/3 text-sm font-medium text-gray-600">{key}:</span>
                      <span className="w-2/3 text-sm text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {product.stock > 0 && (
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-gray-700">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 btn-primary py-3 flex items-center justify-center"
                >
                  <FiShoppingCart className="mr-2" /> Add to Cart
                </button>
              </div>
            )}

            {/* Vendor Info */}
            <div className="border-t pt-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Sold by</h3>
              <p className="text-lg font-semibold text-gray-900">
                {product.vendorId?.businessName}
              </p>
              <p className="text-sm text-gray-600">
                Rating: {product.vendorId?.rating || 'New'} ⭐
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>

        {isAuthenticated && (
          <form onSubmit={handleSubmitReview} className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Write a Review</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <select
                  value={review.rating}
                  onChange={(e) => setReview({ ...review, rating: parseInt(e.target.value) })}
                  className="input-field"
                >
                  {[5,4,3,2,1].map(num => (
                    <option key={num} value={num}>{num} Stars</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comment
                </label>
                <textarea
                  value={review.comment}
                  onChange={(e) => setReview({ ...review, comment: e.target.value })}
                  rows="3"
                  className="input-field"
                  placeholder="Share your experience with this product..."
                ></textarea>
              </div>
              <button type="submit" className="btn-primary">
                Submit Review
              </button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((review, index) => (
              <div key={index} className="border-b last:border-0 pb-4">
                <div className="flex items-center mb-2">
                  <div className="flex items-center text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className={i < review.rating ? 'fill-current' : ''} />
                    ))}
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    {review.userId?.name || 'Anonymous'}
                  </span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No reviews yet</p>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/products/${product._id}`)}
                className="cursor-pointer border rounded-lg p-4 hover:shadow-lg transition"
              >
                <div className="h-32 bg-gray-200 rounded-lg mb-2 overflow-hidden">
                  {product.images?.[0] && (
                    <img
                      src={product.images[0].url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                <p className="text-primary-600 font-bold">₹{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;