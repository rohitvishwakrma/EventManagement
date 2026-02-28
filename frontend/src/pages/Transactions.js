import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
function Transactions() {

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {

    try {

      const res = await API.get("/orders/vendor");

      setOrders(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const updateStatus = async (id, status) => {

    try {

      await API.put(`/orders/${id}`, { status });

      fetchOrders();

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
        Vendor Transactions
      </h2>

      <div className="bg-white shadow rounded-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-200">

            <tr>

              <th className="p-4 text-left">
                User
              </th>

              <th className="p-4 text-left">
                Total
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Update Status
              </th>

            </tr>

          </thead>

          <tbody>

            {orders.length === 0 ? (

              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-500">
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
                    {order.user?.email || "Unknown User"}
                  </td>

                  <td className="p-4 text-blue-600 font-semibold">
                    ₹{order.total || 0}
                  </td>

                  <td className="p-4">

                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">

                      {order.status}

                    </span>

                  </td>

                  <td className="p-4 space-x-2">

                    <button
                      onClick={() => updateStatus(order._id, "Received")}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Received
                    </button>

                    <button
                      onClick={() => updateStatus(order._id, "Ready for Shipping")}
                      className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
                    >
                      Ready
                    </button>

                    <button
                      onClick={() => updateStatus(order._id, "Out for Delivery")}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Deliver
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  )

}

export default Transactions;