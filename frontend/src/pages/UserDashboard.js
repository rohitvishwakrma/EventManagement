import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function UserDashboard() {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {

    try {

      const res = await API.get("/products");

      setProducts(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleAddToCart = async (productId) => {

    try {

      await API.post("/cart/add", {
        product: productId,
        quantity: 1
      });

      toast.success("Added to Cart");

    } catch (error) {

      toast.error("Error adding to cart");


    }

  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (

    <div className="min-h-screen bg-gray-100 p-20">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          User Dashboard
        </h1>

        <button
          onClick={() => navigate("/cart")}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Go To Cart
        </button>

      </div>

      <h2 className="text-xl font-semibold mb-6">
        Available Services
      </h2>

      {products.length === 0 ? (

        <p className="text-gray-500">
          No Products Available
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

              <button
                onClick={() => handleAddToCart(product._id)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Add To Cart
              </button>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default UserDashboard;