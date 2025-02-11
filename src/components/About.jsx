import { Link } from "react-router-dom";

const About = () => {
    return (
        <div className="bg-gradient-to-l from-blue-100 via-blue-200 to-blue-400 my-10 py-2 mb-10">
             <h1 className="text-center text-3xl font-bold py-4 text-blue-800">About</h1>

    <div className="hero">

  <div className="hero-content flex-col lg:flex-row justify-between">
    <img
      src="https://i.ibb.co.com/jy9HJNP/mara.png"
      className="max-w-sm rounded-lg shadow-2xl " />
    <div className="w-3/5">
      <h1 className="text-xl font-bold">Dedicated to Seamless Marathon Management
      </h1>

      <p className="py-6">
      For over three decades, we’ve been at the forefront of organizing and managing marathon events in the Twin Cities area. Whether you're an event organizer or a participant, we offer a user-friendly platform designed to connect both parties and streamline the marathon experience. Our system simplifies registration, event management, and communication, ensuring a smooth process from start to finish.
      With our platform, marathon organizers can efficiently set up events, manage participant registrations, and track important details, all while keeping participants informed every step of the way. From city marathons to trail challenges, we ensure each event runs smoothly and provides a memorable experience for everyone involved.
      We look forward to helping you bring your marathon event to life or support your journey as a runner. Explore how our Marathon Management System can elevate your next event or participation!
      </p>
      <Link to="/contact">
      <button className="btn bg-red-200 btn-md">Contact</button>
      </Link>
    </div>
  </div>
</div>
        </div>
        
     
    );
};

export default About;