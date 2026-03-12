// import { useState } from "react";

// function GuestList() {

//   const [guestName, setGuestName] = useState("");
//   const [guests, setGuests] = useState([]);

//   const addGuest = () => {

//     if (!guestName) return;

//     const newGuest = {
//       id: Date.now(),
//       name: guestName
//     };

//     setGuests([...guests, newGuest]);
//     setGuestName("");

//   };

//   const removeGuest = (id) => {

//     const updated = guests.filter(g => g.id !== id);

//     setGuests(updated);

//   };

//   return (

//     <div className="min-h-screen bg-gray-100 p-10">

//       <h2 className="text-3xl font-bold mb-6">
//         Guest List
//       </h2>

//       {/* Add Guest */}

//       <div className="bg-white p-6 rounded-lg shadow mb-6">

//         <h3 className="text-lg font-semibold mb-4">
//           Add Guest
//         </h3>

//         <div className="flex gap-4">

//           <input
//             className="border p-3 rounded w-64"
//             placeholder="Guest Name"
//             value={guestName}
//             onChange={(e)=>setGuestName(e.target.value)}
//           />

//           <button
//             onClick={addGuest}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Add
//           </button>

//         </div>

//       </div>

//       {/* Guest Table */}

//       <div className="bg-white shadow rounded-lg overflow-hidden">

//         {guests.length === 0 ? (

//           <p className="p-6 text-gray-500">
//             No Guests Added
//           </p>

//         ) : (

//           <table className="w-full">

//             <thead className="bg-gray-200">

//               <tr>

//                 <th className="p-4 text-left">
//                   Guest Name
//                 </th>

//                 <th className="p-4 text-left">
//                   Action
//                 </th>

//               </tr>

//             </thead>

//             <tbody>

//               {guests.map(guest => (

//                 <tr key={guest.id} className="border-t">

//                   <td className="p-4">
//                     {guest.name}
//                   </td>

//                   <td className="p-4">

//                     <button
//                       onClick={()=>removeGuest(guest.id)}
//                       className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                     >
//                       Remove
//                     </button>

//                   </td>

//                 </tr>

//               ))}

//             </tbody>

//           </table>

//         )}

//       </div>

//     </div>

//   );

// }

// export default GuestList;

import { useState } from "react";

function GuestList() {
  const [guestName, setGuestName] = useState("");
  const [guests, setGuests] = useState([]);

  const addGuest = () => {
    if (!guestName.trim()) return;

    const newGuest = {
      id: Date.now(),
      name: guestName.trim()
    };

    setGuests([...guests, newGuest]);
    setGuestName("");
  };

  const removeGuest = (id) => {
    const updated = guests.filter(g => g.id !== id);
    setGuests(updated);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addGuest();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100/30 to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Guest List
          </h1>
          <p className="text-orange-100 mt-1">Manage your event guests and attendees</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Total Guests</p>
                <p className="text-4xl font-bold text-gray-800">{guests.length}</p>
              </div>
            </div>
            <div className="bg-orange-100 rounded-xl px-4 py-2">
              <p className="text-orange-600 font-semibold">
                {guests.length === 0 ? 'No guests yet' : guests.length === 1 ? '1 guest' : `${guests.length} guests`}
              </p>
            </div>
          </div>
        </div>

        {/* Add Guest Form */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-orange-400 px-8 py-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Add New Guest
            </h3>
          </div>
          
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white text-lg"
                  placeholder="Enter guest name..."
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  autoFocus
                />
              </div>
              <button
                onClick={addGuest}
                className="md:w-auto bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Guest
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-3 ml-1">Press Enter to quickly add</p>
          </div>
        </div>

        {/* Guest List Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Guest List
              </h3>
              {guests.length > 0 && (
                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
                  {guests.length} total
                </span>
              )}
            </div>
          </div>

          {guests.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-32 h-32 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center">
                <svg className="w-16 h-16 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-3">No Guests Added Yet</h3>
              <p className="text-gray-500 mb-8">Start adding guests using the form above</p>
              <button
                onClick={() => document.querySelector('input')?.focus()}
                className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Your First Guest
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {/* Header - Hidden on mobile */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200">
                <div className="col-span-8 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Guest Name
                </div>
                <div className="col-span-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </div>
              </div>

              {/* Guest List */}
              {guests.map((guest, index) => (
                <div
                  key={guest.id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-5 hover:bg-orange-50/50 transition-colors duration-200 group"
                >
                  {/* Guest Info */}
                  <div className="md:col-span-8 flex items-center gap-4">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl flex items-center justify-center shadow-md border-2 border-orange-200 group-hover:border-orange-300 transition-colors">
                        <span className="text-xl font-bold text-orange-500">
                          {guest.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">{guest.name}</h3>
                      <p className="text-xs text-gray-400 mt-1">
                        Added {new Date(guest.id).toLocaleDateString()} at {new Date(guest.id).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="md:col-span-4 flex items-center">
                    <button
                      onClick={() => removeGuest(guest.id)}
                      className="group/btn inline-flex items-center gap-2 bg-red-50 text-red-600 px-5 py-2.5 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-5 h-5 transition-transform group-hover/btn:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span className="font-medium">Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer with Quick Actions */}
          {guests.length > 0 && (
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to remove all guests?')) {
                      setGuests([]);
                    }
                  }}
                  className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Clear All
                </button>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Click on a guest to remove
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GuestList;