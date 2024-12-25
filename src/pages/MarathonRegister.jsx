import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../firebase.config";
import useAuth from "../hook/useAuth";
import Swal from "sweetalert2";

const MarathonRegister = () => {
  const { id } = useParams(); 
  const {user} = useAuth()
  //console.log(id, user)
  const navigate = useNavigate();
  //console.log(marathonTitle, marathonStartDate)

  const [email, setEmail] = useState(auth.currentUser?.email || "");
  const [marathonTitle, setMarathonTitle] = useState("");
  const [marathonStartDate, setMarathonStartDate] = useState(""); 

  useEffect(() => {
    const fetchMarathonDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/marathons/${id}`);
        const data = await response.json();
        if (data) {
          setMarathonTitle(data.title);
          setMarathonStartDate(new Date(data.marathonStartDate).toLocaleDateString()); // Format date
        }
      } catch (error) {
        console.error('Error fetching marathon details:', error);
      }
    };

    fetchMarathonDetails();
  }, [id]);
  
  const handleFormSubmit = e =>{
    e.preventDefault()
    const form = e.target
    const firstName = form.firstName.value
    const lastName = form.lastName.value
    const contactNumber = form.contactNumber.value
    const otherinfo = form.otherinfo.value


    //console.log(firstName,lastName,contactNumber, otherinfo)

    const marathonApplication ={
      marathon_id: id,
      applicant_email: user.email,
      firstName,
      lastName,
      contactNumber,
      otherinfo
    }

    fetch('http://localhost:3000/marathon-applications', {
      method: 'POST',
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify(marathonApplication)
  })
      .then(res => res.json())
      .then(data => {
          if (data.insertedId) {
              Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Your work has been saved",
                  showConfirmButton: false,
                  timer: 1500
              });
              navigate('/dashboard/apply-list')
          }
      })

}
    
    

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
          <label className="block font-medium mb-2">First Name</label>
          <input
            type="text"
            name="firstName"
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">Last Name</label>
          <input
            type="text"
            name="lastName"
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            className="w-full border px-4 py-2 rounded"
           
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">Additional Info</label>
          <textarea
            name="otherinfo"
            className="w-full border px-4 py-2 rounded"
            rows="4"
            
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
