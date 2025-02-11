import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Notfound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // Redirect to the home page
  };

  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <img 
          src="https://cdni.iconscout.com/illustration/premium/thumb/404-error-page-3102200-2585630.png" 
          alt="404 Not Found"
          className="w-80 md:w-96"
        />
      </motion.div>
      <motion.h1 
        className="text-5xl font-bold text-red-600 mt-6"
        initial={{ y: -20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.5 }}
      >
        Oops! Page Not Found
      </motion.h1>
      <p className="text-lg text-gray-600 mt-3">
        The page you’re looking for doesn’t exist or was moved.
      </p>

      <motion.button
        onClick={handleGoHome}
        className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300"
        whileHover={{ scale: 1.1 }}
      >
        Return to Home
      </motion.button>

      
    </div>
  );
};

export default Notfound;