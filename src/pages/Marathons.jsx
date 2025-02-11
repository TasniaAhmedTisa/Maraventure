import { useEffect, useState } from "react";
import MarathonCard from "../components/MarathonCard";

const Marathons = () => {
      const [marathons, setMarathons] = useState([]); 
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const [sortOrder, setSortOrder] = useState(false);

      useEffect(() => {
        fetch('https://project-11-server-ten.vercel.app/marathons')
        .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch marathons");
        }
        return res.json();
      })
      .then((data) => setMarathons(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));


    },[])

    const handleSort = (order) => {
        const sortedMarathons = [...marathons].sort((a, b) => {
          return order === "asc"
            ? new Date(a.marathonStartDate) - new Date(b.marathonStartDate)
            : new Date(b.marathonStartDate) - new Date(a.marathonStartDate);
        });
    
        setMarathons(sortedMarathons);
        setSortOrder(order); 
      };

      if (loading) {
        return (
          <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        );
      }
      if (error) {
        return (
          <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <p className="text-xl text-red-600">Error: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Retry
            </button>
          </div>
        );
      }
    
    return (
        <div className=" bg-gradient-to-r from-blue-100 via-red-200 to-blue-400 px-5 py-14">
            <h1 className="text-4xl font-bold text-center mb-6 uppercase text-blue-700">
             Marathons
          </h1>
            <h1 className="text-center font-bold text-xl">Welcome to Marathon Management System!</h1>
            <p className="text-center text-xl">Explore marathons and register today!</p>

            <div className="flex justify-center space-x-4 my-6">
             <button
              onClick={() => handleSort("asc")}
              className={`px-6 py-2 rounded-md font-semibold transition ${
              sortOrder === "asc" ? "bg-red-300 text-black" : "bg-blue-400 text-black hover:bg-blue-700"
              }`} >
              Sort by Marathon start date (asc)
             </button>
             <button
             onClick={() => handleSort("desc")}
             className={`btn px-6 py-2 rounded-lg font-semibold transition ${
             sortOrder === "desc" ? "bg-red-300 text-black" : "bg-blue-400 text-black hover:bg-blue-700"
             }`}>
              Sort by Marathon start date (desc)
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-5 ">
                {
                    marathons.map(marathon =><MarathonCard key={marathon._id} marathon={marathon}></MarathonCard>)
                }
            </div>

        </div>
    );
};

export default Marathons;