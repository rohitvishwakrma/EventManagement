import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
function Membership(){

  const [vendors,setVendors] = useState([]);
  const [membership,setMembership] = useState("6 months");

  const fetchVendors = async ()=>{
    try{
      const res = await API.get("/admin/vendors");
      setVendors(res.data);
    }catch(err){
      console.log(err);
    }
  };

  const assignMembership = async (vendorId)=>{
    try{

      await API.post("/admin/membership",{
        vendorId,
        membership
      });

      toast.success("Membership assigned");

      fetchVendors();

    }catch(err){

      console.log(err);
      toast.error("Error assigning membership");

    }
  };

  useEffect(()=>{
    fetchVendors();
  },[]);

  return(

    <div className="min-h-screen bg-gray-100 p-20">

      <h2 className="text-3xl font-bold mb-6">
        Membership Management
      </h2>

      {/* Membership Selector */}

      <div className="bg-white shadow rounded-lg p-6 mb-8">

        <h3 className="text-lg font-semibold mb-3">
          Select Membership Duration
        </h3>

        <select
          className="border p-3 rounded w-60"
          value={membership}
          onChange={(e)=>setMembership(e.target.value)}
        >

          <option>6 months</option>
          <option>1 year</option>
          <option>2 years</option>

        </select>

      </div>


      {/* Vendor Table */}

      <div className="bg-white shadow rounded-lg overflow-hidden">

        {vendors.length === 0 ? (

          <p className="p-6 text-gray-500">
            No Vendors Found
          </p>

        ) : (

          <table className="w-full">

            <thead className="bg-gray-200">

              <tr>

                <th className="p-4 text-left">
                  Vendor Email
                </th>

                <th className="p-4 text-left">
                  Current Membership
                </th>

                <th className="p-4 text-left">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {vendors.map(vendor=>(

                <tr 
                  key={vendor._id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-4">
                    {vendor.email}
                  </td>

                  <td className="p-4">

                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">

                      {vendor.membership || "None"}

                    </span>

                  </td>

                  <td className="p-4">

                    <button
                      onClick={()=>assignMembership(vendor._id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Assign
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

export default Membership;