import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { ClipLoader } from 'react-spinners';
import { auth } from '../firebase.config';
import useAuth from '../hook/useAuth';

const MyList = () => {
  const {user} = useAuth();
  const navigate = useNavigate();
  const [marathons, setMarathons] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(''); 
  const [selectedMarathon, setSelectedMarathon] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);


  useEffect(() => {
      fetch(`https://project-11-server-ten.vercel.app/marathons?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setMarathons(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load marathons');
        setLoading(false);
      });
  },[user.email] )

  // Open Update Modal and populate with marathon data
  const handleUpdate = (marathon) => {
    setSelectedMarathon(marathon);
    setModalOpen(true); // Open modal
  };

  // Close the modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedMarathon(null);
  };

  // Handle the Update form submission
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedData = {
      title: form.title.value,
      startRegistrationDate: form.startRegistrationDate.value,
      endRegistrationDate: form.endRegistrationDate.value,
      marathonStartDate: form.marathonStartDate.value,
      location: form.location.value,
    };

    fetch(`https://project-11-server-ten.vercel.app/marathons/${selectedMarathon._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {
        setMarathons((prev) =>
          prev.map((item) =>
            item._id === selectedMarathon._id ? { ...item, ...updatedData } : item
          )
        );
        Swal.fire('Updated!', 'The marathon has been updated.', 'success');
        closeModal(); // Close modal after update
      })
      .catch((error) => {
        Swal.fire('Error', 'Something went wrong. Try again later.', 'error');
      });
  };

  // Handle Marathon Deletion
  const handleDelete = (marathonId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will delete the marathon permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://project-11-server-ten.vercel.app/marathons/${marathonId}`, {
          method: 'DELETE',
        })
          .then(() => {
            setMarathons((prev) => prev.filter((item) => item._id !== marathonId));
            Swal.fire('Deleted!', 'The marathon has been deleted.', 'success');
          })
          .catch(() => {
            Swal.fire('Error!', 'Failed to delete the marathon.', 'error');
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader size={50} color="#00bcd4" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }


    

  return (
    <div className="bg-gradient-to-t from-cyan-600 mx-auto min-h-screen m-10">
      <h1 className="text-3xl font-bold text-center py-10">My Marathon List</h1>

      {marathons.length === 0 ? (
        <p className="text-center">You have not added any campaigns yet.</p>
      ) : (
        <table className="table-auto border-collapse border border-blue-950 mx-5 w-[1000px]">
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
                <td className="border border-b-4 border-red-300 px-4 py-2">
                  <img src={marathon.image} alt={marathon.title} className="w-16 h-16 object-cover" />
                </td>
                <td className="border px-4 py-2">{marathon.title}</td>
                <td className="border px-4 py-2">{marathon.startRegistrationDate}</td>
                <td className="border px-4 py-2">{marathon.endRegistrationDate}</td>
                <td className="border px-4 py-2">{marathon.marathonStartDate}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    onClick={() => handleUpdate(marathon)}
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
      {/* Update Marathon Modal */}
      {modalOpen && selectedMarathon && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="modal-content bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">Update Marathon</h2>
            <form onSubmit={handleUpdateSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={selectedMarathon.title}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Start Registration Date</label>
                <input
                  type="date"
                  name="startRegistrationDate"
                  defaultValue={selectedMarathon.startRegistrationDate}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">End Registration Date</label>
                <input
                  type="date"
                  name="endRegistrationDate"
                  defaultValue={selectedMarathon.endRegistrationDate}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Marathon Start Date</label>
                <input
                  type="date"
                  name="marathonStartDate"
                  defaultValue={selectedMarathon.marathonStartDate}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Location</label>
                <input
                  type="text"
                  name="location"
                  defaultValue={selectedMarathon.location}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyList;
