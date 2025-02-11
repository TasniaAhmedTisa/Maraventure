import { useState } from "react";
import Swal from "sweetalert2";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      Swal.fire("Message Sent!", "We'll get back to you soon.", "success");
      setFormData({ name: "", email: "", message: "" });
    }, 1000);
  };

  return (
    <div>
        <div className="mt-10 py-14 bg-gray-100  items-center justify-center">
        <h1 className="text-4xl font-bold text-center uppercase text-blue-700">Contact with us</h1>

      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-10 rounded-lg shadow-lg">
          {/* Left Side*/}
          <div>
            <h3 className="text-gray-500 uppercase text-sm text-center md:text-left">Have a question?</h3>
            <h2 className="text-4xl font-bold text-center md:text-left">Send Message</h2>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                  placeholder="Name*"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                  placeholder="E-mail*"
                />
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                rows="5"
                placeholder="Message"
              ></textarea>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <input type="checkbox" id="agree" required className="w-4 h-4 text-teal-500" />
                <label htmlFor="agree">I agree that my submitted data is being collected and stored.</label>
              </div>
              <button
                type="submit"
                className="w-full bg-teal-500 text-white p-3 rounded hover:bg-teal-600 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Right Side */}
          <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left">
            <h3 className="text-gray-500 uppercase text-sm">Contact Info</h3>
            <h2 className="text-4xl font-bold">Find Us</h2>
            <p className="mt-4"><strong>Location:</strong><br />123, Dhaka, Bangladesh</p>
            <p className="mt-2"><strong>Phone:</strong><br />
              <a href="tel:1234567890" className="text-teal-500 hover:underline">123-456-7890</a>
            </p>
            <p className="mt-2"><strong>E-mail:</strong><br />
              <a href="mailto:info@maraventure.com" className="text-teal-500 hover:underline">info@maraventure.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Contact;
