import { useEffect, useState } from "react";
import API from "../services/api";

function OrderStatus() {

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {

    try {

      const res = await API.get("/orders/user");

      setOrders(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchOrders();

  }, []);

  return (

    <div className="min-h-screen bg-gray-100 p-20">

      <h2 className="text-3xl font-bold mb-6">
        Your Orders
      </h2>

      <div className="bg-white shadow rounded-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-200">

            <tr>

              <th className="p-4 text-left">
                Order ID
              </th>

              <th className="p-4 text-left">
                Total Amount
              </th>

              <th className="p-4 text-left">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {orders.length === 0 ? (

              <tr>
                <td colSpan="3" className="p-6 text-center text-gray-500">
                  No Orders Found
                </td>
              </tr>

            ) : (

              orders.map(order => (

                <tr 
                  key={order._id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-4">
                    {order._id}
                  </td>

                  <td className="p-4 text-blue-600 font-semibold">
                    ₹ {order.total}
                  </td>

                  <td className="p-4">

                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">

                      {order.status}

                    </span>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default OrderStatus;