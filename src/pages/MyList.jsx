import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { ClipLoader } from 'react-spinners';
import { auth } from '../firebase.config';
import useAuth from '../hook/useAuth';

const MyList = () => {
  const {user} = useAuth();
  //const navigate = useNavigate();
  const [marathons, setMarathons] = useState([]);
  //const [loading, setLoading] = useState(true); 
  //const [error, setError] = useState(''); 

  useEffect(() => {
      fetch(`http://localhost:3000/marathons?email=${user.email}`)
      .then(res => res.json())
      .then(data => setMarathons(data))

  },[user.email] )

    

  return (
    <div className="bg-gradient-to-t from-cyan-600 mx-auto min-h-screen m-10">
      <h1 className="text-3xl font-bold text-center py-10">My Campaigns</h1>

      {marathons.length === 0 ? (
        <p className="text-center">You have not added any campaigns yet.</p>
      ) : (
        <table className="table-auto w-11/12 mx-auto border border-gray-200 m-8">
          <thead>
            <tr>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Registration Start Date</th>
              <th className="border px-4 py-2">Registration End Date</th>
              <th className="border px-4 py-2">Marathon Start</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {marathons.map((marathon) => (
              <tr key={marathon._id}>
                <td className="border px-4 py-2">
                  <img src={marathon.image} alt={marathon.title} className="w-16 h-16 object-cover" />
                </td>
                <td className="border px-4 py-2">{marathon.title}</td>
                <td className="border px-4 py-2">{marathon.startRegistrationDate}</td>
                <td className="border px-4 py-2">{marathon.endRegistrationDate}</td>
                <td className="border px-4 py-2">{marathon.marathonStartDate}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    onClick={() => handleUpdate(marathon._id)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(marathon._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyList;