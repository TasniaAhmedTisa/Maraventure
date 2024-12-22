import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
    const { id } = useParams(); 
    const [marathon, setMarathon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/marathons/${id}`) 
          .then((res) => {
            if (!res.ok) {
              throw new Error("Failed to fetch marathon details");
            }
            return res.json();
          })
          .then((data) => {
            setMarathon(data);
            setLoading(false);
          })
          .catch((err) => {
            setError(err.message);
            setLoading(false);
          });
      }, [id]);
    
      if (loading) return <p className="text-center text-xl text-blue-600">Loading details...</p>;
      if (error) return <p className="text-center text-xl text-red-600">Error: {error}</p>;
    return (
        <div className="m-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">{marathon.title}</h1>
      <img className="w-full h-64 object-cover mb-6" src={marathon.image} alt={marathon.title} />
      <p className="text-xl"><strong>Location:</strong> {marathon.location}</p>
      <p className="text-xl"><strong>Registration Start:</strong> {marathon.registrationStart}</p>
      <p className="text-xl"><strong>Registration End:</strong> {marathon.registrationEnd}</p>
      <p className="text-xl"><strong>Description:</strong> {marathon.description}</p>
      <p className="text-xl"><strong>Running Distance:</strong> {marathon.runningDistance}</p>
    </div>
    );
};

export default Details;