import { useEffect, useState } from "react";
import API from "../services/api";

function AdminUsers(){

  const [users,setUsers] = useState([]);

  const fetchUsers = async()=>{

    try{

      const res = await API.get("/admin/users");

      setUsers(res.data);

    }catch(error){

      console.log(error);

    }

  };

  useEffect(()=>{
    fetchUsers();
  },[]);

  return(

    <div className="min-h-screen bg-gray-100 p-20">

      {/* <h2 className="text-3xl font-bold mb-6">
        User Management
      </h2> */}

      <div className="bg-white shadow rounded-lg overflow-hidden">

        {users.length === 0 ? (

          <p className="p-6 text-gray-500">
            No Users Found
          </p>

        ) : (

          <table className="w-full">

            <thead className="bg-gray-200">

              <tr>

                <th className="p-4 text-left">
                  Email
                </th>

                <th className="p-4 text-left">
                  Role
                </th>

              </tr>

            </thead>

            <tbody>

              {users.map(user=>(

                <tr 
                  key={user._id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-4">
                    {user.email}
                  </td>

                  <td className="p-4">

                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">

                      {user.role}

                    </span>

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

export default AdminUsers;