
const testimonials = [
  {
    id: 1,
    name: "Jane Doe",
    location: "Minneapolis, MN",
    photo: "https://via.placeholder.com/150", // Replace with actual photo URLs
    quote: "This marathon was an unforgettable experience! The race was well-organized, and the support along the route was fantastic. Can’t wait for the next one!",
  },
  {
    id: 2,
    name: "John Smith",
    location: "St. Paul, MN",
    photo: "https://via.placeholder.com/150", // Replace with actual photo URLs
    quote: "Running my first marathon was a huge milestone. The event was amazing, and the community really kept me motivated throughout the race.",
  },
  {
    id: 3,
    name: "Emily Johnson",
    location: "Eagan, MN",
    photo: "https://via.placeholder.com/150", // Replace with actual photo URLs
    quote: "The volunteers were incredible! They made me feel supported every step of the way. I'm already planning to run again next year.",
  },
];

const Testimonial = () => {
  return (
    <div className="bg-gradient-to-r from-blue-100 via-red-200 to-blue-400 py-12">
      <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-8">
        What Our Participents Are Saying
      </h2>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-3">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white shadow-2xl rounded-3xl p-8 transition-transform transform hover:scale-105 hover:shadow-xl hover:rotate-1 duration-300"
          >
            <div className="flex items-center mb-6">
              <img
                src={testimonial.photo}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-lg mr-6"
              />
              <div>
                <h3 className="text-2xl font-bold text-blue-800">{testimonial.name}</h3>
                <p className="text-sm text-gray-600">{testimonial.location}</p>
              </div>
            </div>
            <p className="text-lg text-gray-700 italic">"{testimonial.quote}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
