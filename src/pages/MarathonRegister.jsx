import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../firebase.config";

const MarathonRegister = ({ marathonTitle, marathonStartDate }) => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [email, setEmail] = useState(auth.currentUser?.email || ""); // Auto-fill logged-in user's email
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !contactNumber) {
      toast.error("Please fill in all required fields!");
      return;
    }

    const registrationData = {
      email,
      firstName,
      lastName,
      contactNumber,
      additionalInfo,
      marathonId: id,
    };

    try {
      const response = await fetch(`http://localhost:3000/marathons/${id}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Registration successful!");
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        toast.error(data.message || "Registration failed.");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Register for {marathonTitle}</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            readOnly
            className="w-full border px-4 py-2 rounded bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">Marathon Title</label>
          <input
            type="text"
            value={marathonTitle}
            readOnly
            className="w-full border px-4 py-2 rounded bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">Marathon Start Date</label>
          <input
            type="text"
            value={marathonStartDate}
            readOnly
            className="w-full border px-4 py-2 rounded bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="firstName" className="block font-medium mb-2">First Name</label>
          <input
            type="text"
            id="firstName"
            className="w-full border px-4 py-2 rounded"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className="block font-medium mb-2">Last Name</label>
          <input
            type="text"
            id="lastName"
            className="w-full border px-4 py-2 rounded"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="contactNumber" className="block font-medium mb-2">Contact Number</label>
          <input
            type="text"
            id="contactNumber"
            className="w-full border px-4 py-2 rounded"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="additionalInfo" className="block font-medium mb-2">Additional Info</label>
          <textarea
            id="additionalInfo"
            className="w-full border px-4 py-2 rounded"
            rows="4"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
          ></textarea>
        </div>

        <div className="text-right">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default MarathonRegister;
