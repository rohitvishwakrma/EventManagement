import { useEffect, useState } from "react";
import API from "../services/api";

function UserOrders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {

    try {

      const res = await API.get("/orders/user");

      setOrders(res.data || []);

    } catch (error) {

      console.log("Error fetching orders:", error);

    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusStyle = (status) => {

    switch (status) {

      case "Received":
        return "bg-yellow-200 text-yellow-800";

      case "Ready for Shipping":
        return "bg-blue-200 text-blue-800";

      case "Out for Delivery":
        return "bg-green-200 text-green-800";

      default:
        return "bg-gray-200 text-gray-700";

    }

  };

  if (loading) {

    return (
      <div className="max-w-5xl mx-auto mt-20 text-center text-gray-500">
        Loading orders...
      </div>
    );

  }

  return (

    <div className="max-w-5xl mx-auto mt-20 p-6">

      <h2 className="text-3xl font-bold mb-8">
        Your Orders
      </h2>

      {orders.length === 0 ? (

        <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
          No Orders Found
        </div>

      ) : (

        orders.map((order) => (

          <div
            key={order._id}
            className="bg-white rounded-lg shadow p-5 mb-6 border hover:shadow-lg transition"
          >

            <div className="flex justify-between items-center mb-4">

              <p className="font-semibold text-lg">
                Total: ₹ {order.total ?? 0}
              </p>

              <span
                className={`px-3 py-1 text-sm rounded-full ${getStatusStyle(order.status)}`}
              >
                {order.status || "Pending"}
              </span>

            </div>

            {order.items?.length > 0 && (

              <div>

                <p className="font-medium mb-2">
                  Items
                </p>

                <ul className="list-disc pl-5 text-gray-700">

                  {order.items.map((item, index) => (

                    <li key={index} className="mb-1">

                      {item.product?.name || "Product"} × {item.quantity}

                    </li>

                  ))}

                </ul>

              </div>

            )}

          </div>

        ))

      )}

    </div>

  );

}

export default UserOrders;