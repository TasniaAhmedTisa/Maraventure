import { useEffect, useState } from "react";
import useAuth from "../hook/useAuth";
import Marathon from "../components/Marathon";

const MyApply = () => {

  const {user} =useAuth()
  const [marathons, setMarathons] = useState([])
  useEffect(() =>{
    fetch(`http://localhost:3000/marathon-application?email=${user.email}`)
     .then(res => res.json())
     .then(data => setMarathons(data))

  },[user.email])
    return (
        <div className="bg-gradient-to-t from-cyan-600 w-11/12 mx-auto min-h-screen mb-10">
      <h1 className="text-3xl font-bold text-center pt-10 py-4">My Apply List</h1>

        <p className="text-center pb-8">You have not applyed any marathons yet.</p>
        <div className="flex justify-center">
        <table className="table-auto border-collapse border border-blue-950 mx-5 w-[1000px]">
          <thead>
            <tr>
              <th className="border border-b-4 border-red-300 px-4 py-2">Image</th>
              <th className="border border-b-4 border-red-300 px-4 py-2">Title</th>
              <th className="border border-b-4 border-red-300 px-4 py-2">Marathon Start Date</th>
              <th className="border border-b-4 border-red-300 px-4 py-2">Location</th>

              <th className="border border-b-4 border-red-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              marathons.map(marathon => <tr key="marathon_id">
                <td className="border border-b-4 border-red-300 px-4 py-2">
                  <img src={marathon.image} alt="" className="w-16 h-16 object-cover" />
                </td>
                <td className="border border-b-4 border-red-300 px-4 py-2">{marathon.title}</td>
                <td className="border border-b-4 border-red-300 px-4 py-2">{marathon.marathonStartDate}</td>
                <td className="border border-b-4 border-red-300 px-4 py-2">{marathon.location}</td>

                <td className="border border-b-4 border-red-300 px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  
                  >
                    Delete
                  </button>
                </td>
              </tr> )
            }
              
          </tbody>
        </table>
        </div>
      
    </div>
  );
};

export default MyApply;