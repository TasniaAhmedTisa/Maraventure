import { useEffect, useState } from "react";
import MarathonCard from "../components/MarathonCard";

const Marathons = () => {
      const [marathons, setMarathons] = useState([]); 
      useEffect(() => {
        fetch('https://project-11-server-ten.vercel.app/marathons')
        .then(res => res.json())
        .then(data => setMarathons(data))


    },[])
    
    return (
        <div className=" bg-gradient-to-r from-blue-100 via-red-200 to-blue-400 px-5 py-14">
            <h1 className="text-4xl font-bold text-center mb-6 text-blue-700">
             Marathons
          </h1>
            <h1 className="text-center font-bold text-xl">Welcome to Marathon Management System!</h1>
            <p className="text-center text-xl">Explore marathons and register today!</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-5 ">
                {
                    marathons.map(marathon =><MarathonCard key={marathon._id} marathon={marathon}></MarathonCard>)
                }
            </div>

        </div>
    );
};

export default Marathons;