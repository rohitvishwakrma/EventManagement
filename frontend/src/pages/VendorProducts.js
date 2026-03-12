// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../services/api";
// import { toast } from "react-toastify";

// function VendorProducts() {

//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   const fetchProducts = async () => {
//     try {

//       const res = await API.get("/products/vendor");

//       setProducts(res.data);

//     } catch (error) {

//       console.log("Error fetching products", error);

//     }
//   };

//   const handleDelete = async (id) => {

//     try {

//       await API.delete(`/products/${id}`);

//       toast.success("Product Deleted");

//       fetchProducts();

//     } catch (error) {

//       toast.warning("Error deleting product");

//     }

//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (

//     <div className="min-h-screen bg-gray-100 p-20">

//       <h2 className="text-3xl font-bold mb-8">
//         Your Products
//       </h2>

//       {products.length === 0 ? (

//         <p className="text-gray-500">
//           No Products Found
//         </p>

//       ) : (

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

//           {products.map((product) => (

//             <div
//               key={product._id}
//               className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
//             >

//               <h3 className="text-xl font-semibold mb-2">
//                 {product.name}
//               </h3>

//               <p className="text-gray-500 mb-4">
//                 {product.description}
//               </p>

//               <p className="text-lg font-bold text-blue-600 mb-4">
//                 ₹ {product.price}
//               </p>

//               <div className="flex gap-3">

//                 <button
//                   onClick={() => navigate(`/vendor/update/${product._id}`)}
//                   className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
//                 >
//                   Update
//                 </button>

//                 <button
//                   onClick={() => handleDelete(product._id)}
//                   className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                 >
//                   Delete
//                 </button>

//               </div>

//             </div>

//           ))}

//         </div>

//       )}

//     </div>

//   );
// }

// export default VendorProducts;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function VendorProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products/vendor");
      setProducts(res.data);
    } catch (error) {
      console.log("Error fetching products", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await API.delete(`/products/${id}`);
        toast.success("Product Deleted");
        fetchProducts();
      } catch (error) {
        toast.warning("Error deleting product");
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100/30 to-orange-50 ">
      {/* Header - Matching Vendor Dashboard */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg p-3 mt-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/vendor")}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <i className="ri-arrow-left-line text-2xl"></i>
              </button>
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <i className="ri-shopping-bag-3-line text-3xl"></i>
                  Your Products
                </h1>
                <p className="text-orange-100 mt-1">Manage your product catalog</p>
              </div>
            </div>

            {/* Add Product Button */}
            <button
              onClick={() => navigate("/vendor/add-product")}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300"
            >
              <i className="ri-add-line text-xl"></i>
              <span>Add New</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20">
        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-16 text-center max-w-2xl mx-auto">
            <div className="w-24 h-24 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
              <i className="ri-shopping-bag-line text-4xl text-orange-500"></i>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Products Found</h3>
            <p className="text-gray-500 mb-6">Start adding products to your catalog</p>
            <button
              onClick={() => navigate("/vendor/add-product")}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 inline-flex items-center gap-2"
            >
              <i className="ri-add-line"></i>
              Add Your First Product
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
              >
                {/* Card Header with Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
                
                <div className="relative p-8">
                  {/* Product Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    <i className="ri-cake-3-line text-3xl text-white"></i>
                  </div>

                  {/* Product Details */}
                  <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-orange-500 transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-gray-500 mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-bold text-orange-500 flex items-center gap-1">
                      <i className="ri-price-tag-3-line text-xl"></i>
                      ₹{product.price}
                    </span>
                    <span className="text-sm text-gray-400 flex items-center gap-1">
                      <i className="ri-time-line"></i>
                      In stock
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate(`/vendor/update/${product._id}`)}
                      className="flex-1 bg-gradient-to-r from-orange-400 to-orange-500 text-white py-3 rounded-xl font-semibold hover:from-orange-500 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      <i className="ri-edit-box-line"></i>
                      Update
                    </button>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="flex-1 bg-gradient-to-r from-red-400 to-red-500 text-white py-3 rounded-xl font-semibold hover:from-red-500 hover:to-red-600 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      <i className="ri-delete-bin-line"></i>
                      Delete
                    </button>
                  </div>

                  {/* Product ID */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <i className="ri-price-tag-3-line"></i>
                      Product ID: {product._id.slice(-8).toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default VendorProducts;