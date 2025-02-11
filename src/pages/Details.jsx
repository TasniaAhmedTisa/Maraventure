import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "./shared/Spinner";

const Details = () => {
    const { id } = useParams(); 
    const [marathon, setMarathon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);


    useEffect(() => {
        fetch(`https://project-11-server-ten.vercel.app/marathons/${id}`) 
          .then((res) => {
            if (!res.ok) {
              throw new Error("Failed to fetch marathon details");
            }
            return res.json();
          })
          .then((data) => {
            setMarathon(data);
            // Check if registration is open
            const currentDate = new Date();
            const startDate = new Date(data.startRegistrationDate);
            const endDate = new Date(data.endRegistrationDate);
            setIsRegistrationOpen(currentDate >= startDate && currentDate <= endDate);
            console.log({ currentDate, startDate, endDate, isRegistrationOpen: currentDate >= startDate && currentDate <= endDate });


            setLoading(false);
          })
          .catch((err) => {
            setError(err.message);
            setLoading(false);
          });
      }, [id]);

    
      if (loading) return <Spinner></Spinner>
      if (error) return <p className="text-center text-xl text-red-600">Error: {error}</p>;
    return (
        <div className="pt-5 pb-10 text-center bg-gradient-to-r from-blue-100 via-red-200 to-blue-400">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600 p-5">{marathon.title}</h1>
      <img className="w-2/5 h-80 object-cover mb-6 mx-auto rounded-lg" src={marathon.image} alt={marathon.title} />
      <p className="text-xl"><strong>Location:</strong> {marathon.location}</p>
      <p className="text-xl"><strong>Registration Start:</strong> {new Date(marathon.startRegistrationDate).toLocaleDateString()}</p>
      <p className="text-xl"><strong>Registration End:</strong> {new Date(marathon.endRegistrationDate).toLocaleDateString()}</p>
      <p className="text-xl"><strong>Marathon Start Date:</strong> {new Date(marathon.marathonStartDate).toLocaleDateString()}</p>

      <p className="text-xl"><strong>Running Distance:</strong> {marathon.runningDistance}</p>
      <p className="text-xl"><strong>Registation Count:</strong>{marathon.count}</p>

      <div className="mt-4">
        {isRegistrationOpen ? (
          <Link to={`/marathonapply/${id}`}>
            <button className="btn btn-primary bg-blue-300 text-black font-semibold px-6 py-2 rounded hover:bg-blue-500 transition-colors duration-300 mb-4">
              Register
            </button>
          </Link>
        ) : (
          <button
            disabled
            className="bg-gray-400 text-white font-semibold px-6 py-2 rounded cursor-not-allowed"
          >
            Registration Closed
          </button>
        )}
      </div>
    </div>
  );
};
export default Details;