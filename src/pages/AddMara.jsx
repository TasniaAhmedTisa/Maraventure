import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddMara = () => {
  const [title, setTitle] = useState("");
  const [startRegistrationDate, setStartRegistrationDate] = useState(null);
  const [endRegistrationDate, setEndRegistrationDate] = useState(null);
  const [marathonStartDate, setMarathonStartDate] = useState(null);
  const [location, setLocation] = useState("");
  const [runningDistance, setRunningDistance] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (
      !title ||
      !startRegistrationDate ||
      !endRegistrationDate ||
      !marathonStartDate ||
      !location ||
      !runningDistance ||
      !description ||
      !image
    ) {
      toast.error("Please fill out all fields!");
      return;
    }

    // Create a new marathon object
    const newMarathon = {
      title,
      startRegistrationDate: startRegistrationDate.toISOString(),
      endRegistrationDate: endRegistrationDate.toISOString(),
      marathonStartDate: marathonStartDate.toISOString(),
      location,
      runningDistance,
      description,
      image,
      createdAt: new Date().toISOString(),
      totalRegistrationCount: 0,
    };

    console.log("New Marathon Created:", newMarathon);
    toast.success("Marathon added successfully!");

    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <ToastContainer />
      <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Add New Marathon</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block font-medium mb-2">
              Marathon Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full border px-4 py-2 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
            <label htmlFor="location" className="block font-medium mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              className="w-full border px-4 py-2 rounded"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="runningDistance" className="block font-medium mb-2">
              Running Distance
            </label>
            <select
              id="runningDistance"
              className="w-full border px-4 py-2 rounded"
              value={runningDistance}
              onChange={(e) => setRunningDistance(e.target.value)}
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
            <label htmlFor="description" className="block font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              className="w-full border px-4 py-2 rounded"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block font-medium mb-2">
              Marathon Image
            </label>
            <input
              type="file"
              id="image"
              className="w-full border px-4 py-2 rounded"
              onChange={handleImageChange}
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
