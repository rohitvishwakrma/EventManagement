import { useState } from "react";

function GuestList() {

  const [guestName, setGuestName] = useState("");
  const [guests, setGuests] = useState([]);

  const addGuest = () => {

    if (!guestName) return;

    const newGuest = {
      id: Date.now(),
      name: guestName
    };

    setGuests([...guests, newGuest]);
    setGuestName("");

  };

  const removeGuest = (id) => {

    const updated = guests.filter(g => g.id !== id);

    setGuests(updated);

  };

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h2 className="text-3xl font-bold mb-6">
        Guest List
      </h2>

      {/* Add Guest */}

      <div className="bg-white p-6 rounded-lg shadow mb-6">

        <h3 className="text-lg font-semibold mb-4">
          Add Guest
        </h3>

        <div className="flex gap-4">

          <input
            className="border p-3 rounded w-64"
            placeholder="Guest Name"
            value={guestName}
            onChange={(e)=>setGuestName(e.target.value)}
          />

          <button
            onClick={addGuest}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add
          </button>

        </div>

      </div>

      {/* Guest Table */}

      <div className="bg-white shadow rounded-lg overflow-hidden">

        {guests.length === 0 ? (

          <p className="p-6 text-gray-500">
            No Guests Added
          </p>

        ) : (

          <table className="w-full">

            <thead className="bg-gray-200">

              <tr>

                <th className="p-4 text-left">
                  Guest Name
                </th>

                <th className="p-4 text-left">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {guests.map(guest => (

                <tr key={guest.id} className="border-t">

                  <td className="p-4">
                    {guest.name}
                  </td>

                  <td className="p-4">

                    <button
                      onClick={()=>removeGuest(guest.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>

  );

}

export default GuestList;