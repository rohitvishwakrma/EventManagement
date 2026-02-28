import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Checkout() {

  const [cartItems,setCartItems] = useState([]);
  const navigate = useNavigate();

  const fetchCart = async ()=>{

    try{

      const res = await API.get("/cart");

      setCartItems(res.data);

    }catch(error){

      console.log(error);

    }

  };

  useEffect(()=>{
    fetchCart();
  },[]);

  const getTotal = ()=>{

    return cartItems.reduce((total,item)=>{

      return total + item.product.price * item.quantity;

    },0);

  };

const handleOrder = async () => {

  try {

    const formattedItems = cartItems.map(item => ({
      product: item.product._id,
      quantity: item.quantity
    }));

    await API.post("/orders/create",{

  items: cartItems.map(item => ({
    product: item.product._id,
    quantity: item.quantity
  })),

  total: getTotal()

});

    toast.success("Order Placed Successfully");

    navigate("/user/orders");

  } catch(error) {

    console.log(error);
    toast.error("Error placing order");

  }

};

  return(

    <div className="min-h-screen bg-gray-100 p-20">

      <h2 className="text-3xl font-bold mb-6">
        Checkout
      </h2>

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
                Quantity
              </th>

            </tr>

          </thead>

          <tbody>

            {cartItems.map(item=>(

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
                  {item.quantity}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="mt-6 bg-white p-6 rounded shadow">

        <h3 className="text-xl font-bold mb-4">
          Total: ₹ {getTotal()}
        </h3>

        <button
          onClick={handleOrder}
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
        >
          Place Order
        </button>

      </div>

    </div>

  );

}

export default Checkout;