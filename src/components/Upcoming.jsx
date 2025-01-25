const upcomingMarathons = [
    {
      "id": 1,
      "title": "Spring City Marathon 2024",
      "location": "New York City, NY",
      "registrationStart": "2025-01-10",
      "registrationEnd": "2025-03-01",
      "detailsUrl": "/marathon/1"
    },
    {
      "id": 2,
      'title': "Autumn Dash 2024",
      "location": "Chicago, IL",
      "registrationStart": "2025-02-01",
      "registrationEnd": "2025-04-15",
      "detailsUrl": "/marathon/2"
    },
    {
        "id": 3,
        "title": "Ocean Breeze Run",
        "location": "San Francisco, CA",
        "registrationStart": "2025-03-01",
        "registrationEnd": "2025-05-01",
        "detailsUrl": "/marathon/3"
      },
      {
        "id": 4,
        "title": "Mountain Trail Challenge",
        "location": "Denver, CO",
        "registrationStart": "2025-04-01",
        "registrationEnd": "2025-06-01",
        "detailsUrl": "/marathon/4"
      },
      {
        "id": 5,
        "title": "City Lights Marathon",
        "location": "Las Vegas, NV",
        "registrationStart": "2024-05-01",
        "registrationEnd": "2024-07-01",
        "detailsUrl": "/marathon/5"
      },
      {
        "id": 6,
        "title": "Golden Gate Run",
        "location": "San Francisco, CA",
        "registrationStart": "2025-06-01",
        "registrationEnd": "2025-08-01",
        "detailsUrl": "/marathon/6"
      }
    
    
];
const Upcoming = () => {
    return (
        <div className="bg-gradient-to-r from-blue-100 via-red-200 to-blue-400 py-8">
          <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
            Upcoming Marathons
          </h1>
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {upcomingMarathons.map((marathon) => (
              <div
                key={marathon.id}
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {marathon.title}
                </h3>
                <p className="text-gray-600 mb-2">
                   <span className="font-medium">{marathon.location}</span>
                </p>
                <p className="text-gray-600 mb-4">
                  Registration:{" "}
                  <span className="font-medium">
                    {marathon.registrationStart} – {marathon.registrationEnd}
                  </span>
                </p>
                <a
                  href={marathon.detailsUrl}
                  className="block text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                  See Details
                </a>
              </div>
            ))}
          </div>
        </div>
      );
    };
    

export default Upcoming;