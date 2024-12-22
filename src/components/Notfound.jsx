import React from "react";
import { useNavigate } from "react-router-dom";

const Notfound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // Redirect to the home page
  };

  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mt-4">Sorry, the page you are looking for does not exist.</p>
      <button
        onClick={handleGoHome}
        className="mt-6 btn btn-primary"
      >
        Go Back to Home
      </button>
    </div>
  );
};

export default Notfound;