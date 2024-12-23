import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { ClipLoader } from 'react-spinners';
import { auth } from '../firebase.config';

const MyList = () => {
  const navigate = useNavigate();
  const [marathons, setMarathons] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(''); // Error state for any fetching issues

//   useEffect(() => {
//     const user = auth.currentUser;

//     // Check if the user is logged in, otherwise redirect to login page
//     if (!user) {
//       navigate('/login');
//       return;
//     }

    // Fetch the campaigns that belong to the logged-in user (based on the user's email)
//     fetch(`http://localhost:3000/my-marathon?email=${user.email}`)
//       .then((res) => {
//         if (!res.ok) throw new Error('Failed to fetch marathons');
//         return res.json();
//       })
//       .then((data) => {
//         setMarathons(data); 
//         setLoading(false); 
//       })
//       .catch((err) => {
//         setError(err.message); 
//         setLoading(false); 
//       });
//   }, [navigate]);

//   const handleDelete = (id) => {

//   Swal.fire({
//     title: 'Are you sure?',
//     text: 'You won\'t be able to revert this!',
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonText: 'Yes, delete it!',
//     cancelButtonText: 'No, cancel!',
//   }).then((result) => {
//     if (result.isConfirmed) {
//       // Send DELETE request to the backend
//       fetch(`http://localhost:3000/delete-marathon/${id}`, {
//         method: 'DELETE',
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           if (data.message === 'Campaign deleted successfully') {
//             // Remove the deleted campaign from the state
//             setMarathons(marathons.filter((campaign) => campaign._id !== id));
//             Swal.fire('Deleted!', 'Your campaign has been deleted.', 'success');
//           } else {
//             Swal.fire('Error!', 'Failed to delete campaign.', 'error');
//           }
//         })
//         .catch((err) => Swal.fire('Error!', 'Server error: ' + err.message, 'error'));
//     }
//   });
//};

// if (loading) {
//   return <div className="spinner-container flex justify-center">
//           <ClipLoader color="#3498db" loading={loading} size={20} />
//         </div>;
// }

// if (error) {
//   return <div className="text-center py-10 text-red-500">{error}</div>;
// }
  


//   const handleUpdate = (id) => {
//     navigate(`/update-campaign/${id}`); // Navigate to the update campaign page
//   };

  return (
    <div className="bg-gradient-to-t from-cyan-600 w-11/12 mx-auto min-h-screen mb-10">
      <h1 className="text-3xl font-bold text-center py-10">My Campaigns</h1>

      {marathons.length === 0 ? (
        <p className="text-center">You have not added any campaigns yet.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Start Date</th>
              <th className="border px-4 py-2">End Date</th>
              <th className="border px-4 py-2">Minimum Donation</th>
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
                <td className="border px-4 py-2">{marathon.type}</td>
                <td className="border px-4 py-2">{marathon.deadline}</td>
                <td className="border px-4 py-2">{marathon.minDonation}</td>
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