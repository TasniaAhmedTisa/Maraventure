import { useEffect, useState } from "react";
import useAuth from "../hook/useAuth";
import Swal from "sweetalert2";

const MyApply = () => {
  const { user } = useAuth();
  const [marathons, setMarathons] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Track search input

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [filteredMarathons, setFilteredMarathons] = useState([]); // Track filtered marathons
  const [sortOrder, setSortOrder] = useState('desc'); // State for sorting order



  useEffect(() => {
    fetch(`https://project-11-server-ten.vercel.app/marathon-application?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setMarathons(data);
        setFilteredMarathons(data); 
      }); 
     }, [user.email, sortOrder]);

      // Handle Search Input Change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    const filteredData = marathons.filter((marathon) =>
      marathon.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredMarathons(filteredData);
  };
  const handleSortChange = (e) => {
    setSortOrder(e.target.value); // Update sort order based on user selection
  };


  const handleUpdate = (application) => {
    console.log("Updating application:", application); 
    setSelectedApplication(application);
  };

  const handleDelete = (applicationId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete your registration.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://project-11-server-ten.vercel.app/marathon-application/${applicationId}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            setMarathons((prev) =>
              prev.filter((item) => item._id !== applicationId)
            );
            setFilteredMarathons((prev) =>
              prev.filter((item) => item._id !== applicationId)
            );
            Swal.fire("Deleted!", "Your registration has been deleted.", "success");
          });
      }
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedData = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      contactNumber: form.contactNumber.value,
      otherinfo: form.otherinfo.value,
    };
    console.log("Updated Data:", updatedData); // Debugging

    fetch(`https://project-11-server-ten.vercel.app/marathon-application/${selectedApplication._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Response Data:", data); // Debugging
        setMarathons((prev) =>
          prev.map((item) =>
            item._id === selectedApplication._id
              ? { ...item, ...updatedData }
              : item
          )
        );
        setFilteredMarathons((prev) =>
          prev.map((item) =>
            item._id === selectedApplication._id
              ? { ...item, ...updatedData }
              : item
          )
        );
        Swal.fire("Updated!", "Your registration has been updated.", "success");
        setSelectedApplication(null); // Close the modal after update
      })
      .catch((error) => {
        console.error("Error updating application:", error);
        Swal.fire("Error", "Something went wrong. Try again later.", "error");
      });
    }

  

  return (
    <div className="bg-gradient-to-t from-cyan-600 w-full min-h-screen mb-10">
      <h1 className="text-3xl font-bold text-center pt-10 py-4">My Apply List</h1>
       {/* Search Input */}
       <div className="flex justify-center mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by Title"
          className="w-1/3 p-2 border border-gray-300 rounded"
        />
      </div>
      {/* Sorting Dropdown */}
      <div className="flex justify-center mb-4">
        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="w-1/3 p-2 border border-gray-300 rounded"
        >
          <option value="desc">Newest to Oldest</option>
          <option value="asc">Oldest to Newest</option>
        </select>
      </div>
      {filteredMarathons.length === 0 ? (
     <p className="text-center pb-8">You have not applied for any marathons yet.</p>
    ) : (
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
          {filteredMarathons.map((marathon) => ( 
                 <tr key={marathon._id}>
                <td className="border border-b-4 border-red-300 px-4 py-2">
                  <img src={marathon.image} alt="" className="w-16 h-16 object-cover" />
                </td>
                <td className="border border-b-4 border-red-300 px-4 py-2">{marathon.title}</td>
                <td className="border border-b-4 border-red-300 px-4 py-2">{marathon.marathonStartDate}</td>
                <td className="border border-b-4 border-red-300 px-4 py-2">{marathon.location}</td>
                <td className="border border-b-4 border-red-300 px-4 py-2">
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
      </div>
            )}


      {/* Update Modal */}
      {selectedApplication && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="modal-content bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">Update Your Registration</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  defaultValue={selectedApplication.firstName}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  defaultValue={selectedApplication.lastName}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Contact Number</label>
                <input
                  type="text"
                  name="contactNumber"
                  defaultValue={selectedApplication.contactNumber}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Other Info</label>
                <textarea
                  name="otherinfo"
                  defaultValue={selectedApplication.otherinfo}
                  rows="4"
                  className="w-full p-2 border border-gray-300 rounded"
                ></textarea>
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
                  onClick={() => setSelectedApplication(null)}
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

export default MyApply;
