import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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

      // const handleRegister = async () => {
      //   try {
      //     const response = await fetch(`http://localhost:3000/marathons/${id}/register`, {
      //       method: 'POST',
      //     });
    
      //     if (!response.ok) {
      //       throw new Error('Failed to register for marathon');
      //     }
    
      //     const data = await response.json();
      //     // Update the marathon registration count in state
      //     setMarathon((prevState) => ({
      //       ...prevState,
      //       count: data.count,
      //     }));
      //   } catch (err) {
      //     setError(err.message);
      //   }
      // };
    
      if (loading) return <p className="text-center text-xl text-blue-600">Loading details...</p>;
      if (error) return <p className="text-center text-xl text-red-600">Error: {error}</p>;
    return (
        <div className="m-8 text-center bg-gradient-to-r from-blue-100 via-red-200 to-blue-400">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600 p-5">{marathon.title}</h1>
      <img className="w-2/5 h-80 object-cover mb-6 mx-auto rounded-lg" src={marathon.image} alt={marathon.title} />
      <p className="text-xl"><strong>Location:</strong> {marathon.location}</p>
      <p className="text-xl"><strong>Registration Start:</strong> {marathon.registrationStart}</p>
      <p className="text-xl"><strong>Registration End:</strong> {marathon.registrationEnd}</p>
      <p className="text-xl"><strong>Running Distance:</strong> {marathon.runningDistance}</p>
      <p className="text-xl"><strong>Registation Count:</strong>{marathon.count}</p>

      <div>
        <Link to={`/marathonapply/${id}`}> <button
          className="btn bg-red-300 m-4"
          
        >
          Register
        </button></Link>
      </div>
    </div>
    );
};

export default Details;