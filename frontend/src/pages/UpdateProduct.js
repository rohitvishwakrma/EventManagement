import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function UpdateProduct() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  const [price,setPrice] = useState("");

  const handleUpdate = async () => {

    try {

      await API.put(`/products/${id}`,{
        name,
        description,
        price
      });

      toast.success("Product Updated");

      navigate("/vendor/products");

    } catch(error){

      toast.error("Error updating product");

    }

  };

  return(

    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6">
          Update Product
        </h2>

        <div className="space-y-4">

          <input
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Product Name"
            onChange={(e)=>setName(e.target.value)}
          />

          <textarea
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Description"
            onChange={(e)=>setDescription(e.target.value)}
          />

          <input
            type="number"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Price"
            onChange={(e)=>setPrice(e.target.value)}
          />

          <button
            onClick={handleUpdate}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Update Product
          </button>

          <button
            onClick={()=>navigate("/vendor/products")}
            className="w-full bg-gray-200 py-3 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>

        </div>

      </div>

    </div>

  );

}

export default UpdateProduct;