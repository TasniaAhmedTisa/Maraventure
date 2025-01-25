import { Link } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const MarathonCard = ({ marathon }) => {
  // eslint-disable-next-line react/prop-types
  const { _id, image, title, location, startRegistrationDate, endRegistrationDate, marathonStartDate } = marathon;

  const startDate = new Date(startRegistrationDate).getTime();
  const endDate = new Date(endRegistrationDate).getTime();
  const currentTime = new Date().getTime();
  const remainingTimeInSeconds = Math.max((startDate - currentTime) / 1000, 0);

  const isRegistrationOpen = currentTime >= startDate && currentTime <= endDate;

  return (
    <div className="card glass shadow-lg shadow-red-400">
      <figure>
        <img className="mt-5 rounded-lg" src={image} alt="Marathon" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>Location: {location}</p>
        <p>Registration Start: {new Date(startRegistrationDate).toLocaleString()}</p>
        <p>Registration End: {new Date(endRegistrationDate).toLocaleString()}</p>
        <p>Marathon Start: {new Date(marathonStartDate).toLocaleString()}</p>

        <div className="flex justify-center mt-4">
          {isRegistrationOpen ? (
            <div className="text-center">
              <p className="text-lg font-bold text-green-600">Registration Open</p>
              <p className="text-sm text-gray-600">Hurry up and register now!</p>
            </div>
          ) : (
            <CountdownCircleTimer
              isPlaying
              duration={remainingTimeInSeconds}
              size={120}
              strokeWidth={6}
              trailColor="#d9d9d9"
              colors={["#00b894", "#ffeaa7", "#d63031", "#d63031"]}
              colorsTime={[86400, 3600, 60, 0]}
              onComplete={() => {
                return { shouldRepeat: false };
              }}
            >
              {({ remainingTime }) => {
                const days = Math.floor(remainingTime / (60 * 60 * 24));
                const hours = Math.floor((remainingTime % (60 * 60 * 24)) / (60 * 60));
                const minutes = Math.floor((remainingTime % (60 * 60)) / 60);

                return (
                  <div className="text-center">
                    <p className="text-lg font-bold">
                      {days}d {hours}h {minutes}m
                    </p>
                    <p className="text-sm text-gray-600">Time left to start Registration</p>
                  </div>
                );
              }}
            </CountdownCircleTimer>
          )}
        </div>

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
