import { Link, useNavigate } from "react-router-dom";

const MarathonCard = ({marathon}) => {
    // eslint-disable-next-line react/prop-types
    const {_id, image, title, location, registrationStart,registrationEnd } = marathon;
    


    return (
        <div className="card glass shadow-lg shadow-red-400">
  <figure>
    <img
    className="mt-5 rounded-lg"
      src={image}
      alt="car!" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{title}</h2>
    <p className="">Location: {location}</p>
    <p>Registration-Start: {registrationStart}</p>
    <p>Registration-End: {registrationEnd}</p>

    <div className="card-actions justify-end">
    <Link to={`/marathons/${_id}`}>
       <button className="btn btn-primary bg-red-300 text-black border-red-500">See Details</button>
    </Link>   
    </div>
  </div>
</div>
    );
};

export default MarathonCard;