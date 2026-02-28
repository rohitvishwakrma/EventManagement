import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Cart() {

  const [items,setItems] = useState([]);
  const navigate = useNavigate();

  const fetchCart = async ()=>{

    try{

      const res = await API.get("/cart");

      setItems(res.data);

    }catch(error){

      console.log(error);

    }

  };

  useEffect(()=>{
    fetchCart();
  },[]);

  const removeItem = async(id)=>{

    try{

      await API.delete(`/cart/${id}`);

      fetchCart();

    }catch(error){

      console.log(error);

    }

  };

  return(

    <div className="min-h-screen bg-gray-100 p-20">

      <h2 className="text-3xl font-bold mb-6">
        Your Cart
      </h2>

      {items.length === 0 ? (

        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-500">
            Your cart is empty
          </p>
        </div>

      ) : (

        <div className="bg-white shadow rounded-lg overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-200">

              <tr>

                <th className="p-4 text-left">
                  Product
                </th>

                <th className="p-4 text-left">
                  Price
                </th>

                <th className="p-4 text-left">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {items.map((item)=>(

                <tr 
                  key={item._id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-4">
                    {item.product.name}
                  </td>

                  <td className="p-4 text-blue-600 font-semibold">
                    ₹ {item.product.price}
                  </td>

                  <td className="p-4">

                    <button
                      onClick={()=>removeItem(item._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

      {items.length > 0 && (

        <div className="mt-6">

          <button
            onClick={()=>navigate("/checkout")}
            className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
          >
            Proceed To Checkout
          </button>

        </div>

      )}

    </div>

  );

}

export default Cart;