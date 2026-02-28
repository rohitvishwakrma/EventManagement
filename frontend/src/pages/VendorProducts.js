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

    try {

      await API.delete(`/products/${id}`);

      toast.success("Product Deleted");

      fetchProducts();

    } catch (error) {

      toast.warning("Error deleting product");

    }

  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (

    <div className="min-h-screen bg-gray-100 p-20">

      <h2 className="text-3xl font-bold mb-8">
        Your Products
      </h2>

      {products.length === 0 ? (

        <p className="text-gray-500">
          No Products Found
        </p>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {products.map((product) => (

            <div
              key={product._id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
            >

              <h3 className="text-xl font-semibold mb-2">
                {product.name}
              </h3>

              <p className="text-gray-500 mb-4">
                {product.description}
              </p>

              <p className="text-lg font-bold text-blue-600 mb-4">
                ₹ {product.price}
              </p>

              <div className="flex gap-3">

                <button
                  onClick={() => navigate(`/vendor/update/${product._id}`)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Update
                </button>

                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );
}

export default VendorProducts;