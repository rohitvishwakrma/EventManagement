import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleUpdate = async () => {
    try {
      await API.put(`/products/${id}`, {
        name,
        description,
        price
      });

      toast.success("Product Updated");
      navigate("/vendor/products");
    } catch (error) {
      toast.error("Error updating product");
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex justify-center items-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        {/* Header with Icon */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
            <i className="ri-edit-box-line text-2xl text-orange-500"></i>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Update Product</h2>
            <p className="text-sm text-gray-500">Edit your product details</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Product Name Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="ri-product-hunt-line text-gray-400"></i>
            </div>
            <input
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-50"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Description Textarea */}
          <div className="relative">
            <div className="absolute top-3 left-3 pointer-events-none">
              <i className="ri-file-text-line text-gray-400"></i>
            </div>
            <textarea
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-50"
              placeholder="Description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Price Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="ri-price-tag-3-line text-gray-400"></i>
            </div>
            <input
              type="number"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-50"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleUpdate}
              className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <i className="ri-save-line"></i>
              Update Product
            </button>

            <button
              onClick={() => navigate("/vendor/products")}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <i className="ri-close-line"></i>
              Cancel
            </button>
          </div>

          {/* Product ID Display */}
          <div className="mt-4 p-3 bg-orange-50 rounded-lg flex items-center gap-2">
            <i className="ri-information-line text-orange-500"></i>
            <span className="text-xs text-gray-600">Product ID: {id}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;