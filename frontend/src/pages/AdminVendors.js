import { useEffect, useState } from "react";
import API from "../services/api";

function AdminVendors(){

  const [vendors,setVendors] = useState([]);

  const fetchVendors = async()=>{

    try{

      const res = await API.get("/admin/vendors");

      setVendors(res.data);

    }catch(error){

      console.log(error);

    }

  };

  useEffect(()=>{
    fetchVendors();
  },[]);

  return(

    <div className="min-h-screen bg-gray-100 p-20">

      <h2 className="text-3xl font-bold mb-6">
        Vendor Management
      </h2>

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
                  Email
                </th>

                <th className="p-4 text-left">
                  Membership
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

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>

  )

}

export default AdminVendors;