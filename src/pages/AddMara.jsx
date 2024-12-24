import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../hook/useAuth";

const AddMara = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [runningDistance, setRunningDistance] = useState("");
  const [description, setDescription] = useState("");
  const [count, setCount] = useState(0);
  const [image, setImage] = useState(null);

  const [startRegistrationDate, setStartRegistrationDate] = useState(null);
  const [endRegistrationDate, setEndRegistrationDate] = useState(null);
  const [marathonStartDate, setMarathonStartDate] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (
      !title ||
      !location ||
      !runningDistance ||
      !description ||
      !image ||
      !startRegistrationDate ||
      !endRegistrationDate ||
      !marathonStartDate
    ) {
      toast.error("Please fill out all fields!");
      return;
    }

    // Prepare JSON payload
  const newMarathon = {
    title,
    location,
    runningDistance,
    description,
    count,
    startRegistrationDate: startRegistrationDate.toISOString(),
    endRegistrationDate: endRegistrationDate.toISOString(),
    marathonStartDate: marathonStartDate.toISOString(),
    image, 
  };

    try {
      const response = await fetch("http://localhost:3000/marathons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMarathon),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Marathon added successfully!");
        console.log(data);
        navigate("/dashboard/my-list");
      } else {
        toast.error("Failed to add marathon!");
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding marathon:", error);
      toast.error("Failed to add marathon!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <ToastContainer />
      <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Add New Marathon</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block font-medium mb-2">Marathon Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Registration Start Date</label>
            <DatePicker
              selected={startRegistrationDate}
              onChange={(date) => setStartRegistrationDate(date)}
              className="w-full border px-4 py-2 rounded"
              placeholderText="Select start registration date"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Registration End Date</label>
            <DatePicker
              selected={endRegistrationDate}
              onChange={(date) => setEndRegistrationDate(date)}
              className="w-full border px-4 py-2 rounded"
              placeholderText="Select end registration date"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Marathon Start Date</label>
            <DatePicker
              selected={marathonStartDate}
              onChange={(date) => setMarathonStartDate(date)}
              className="w-full border px-4 py-2 rounded"
              placeholderText="Select marathon start date"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Running Distance</label>
            <select
              value={runningDistance}
              onChange={(e) => setRunningDistance(e.target.value)}
              className="w-full border px-4 py-2 rounded"
              required
            >
              <option value="" disabled>
                Select distance
              </option>
              <option value="25k">25k</option>
              <option value="10k">10k</option>
              <option value="3k">3k</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border px-4 py-2 rounded"
              rows="4"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Total Registration Count</label>
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Marathon Image</label>
            <input
              type="url"
              accept="image/*"
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-red-300 text-black px-6 py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMara;
