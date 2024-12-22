
const MarathonCard = ({marathon}) => {
    const {image, title, location, registrationStart,registrationEnd } = marathon;

    return (
        <div className="card glass">
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
    <p>Registration-Start: {registrationStart}</p>

    <div className="card-actions justify-end">
      <button className="btn btn-primary">See Details</button>
    </div>
  </div>
</div>
    );
};

export default MarathonCard;