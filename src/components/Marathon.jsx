import { useEffect, useState } from "react";
import MarathonCard from "./MarathonCard";
import Spinner from "../pages/shared/Spinner";

const Marathon = () => {
  const [marathons, setMarathons] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    fetch("https://project-11-server-ten.vercel.app/marathons")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch marathons");
        }
        return res.json();
      })
      .then((data) => {
        setMarathons(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner></Spinner>
  }

  if (error) {
    return <p className="text-center text-xl text-red-600">Error: {error}</p>;
  }

  return (
    <div className="my-10 px-10 bg-gradient-to-l from-blue-100 via-blue-200 to-blue-400 ">
      <h1 className="text-3xl font-bold text-center mb-3 pt-6 text-blue-600">Marathons</h1>
      <h1 className="text-center font-bold text-xl">Welcome to the Marathon Management System!</h1>
      <p className="text-center text-lg">Explore marathons and register today!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8 px-4">
        {marathons.length > 0 ? (
           marathons.slice(0, 6).map((marathon) => (
            <MarathonCard key={marathon._id} marathon={marathon}></MarathonCard>
          ))
        ) : (
          <p className="text-center text-lg text-gray-500">No marathons available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Marathon;
