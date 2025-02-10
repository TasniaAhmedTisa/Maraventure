import { useState } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";

const blogs = [
  {
    title: "How to prepare for your first marathon?",
    content: "Preparing for a marathon requires dedication, training, and the right mindset. Make sure to follow a structured plan, stay hydrated, and get proper rest.",
  },
  {
    title: "Best diet plan for runners",
    content: "A balanced diet with protein, carbs, and healthy fats is essential for runners. Include fruits, vegetables, and whole grains for sustained energy.",
  },
  {
    title: "How to prevent injuries while running?",
    content: "To prevent injuries, always warm up, wear proper running shoes, and listen to your body's signals. Strength training also helps.",
  },
  {
    title: "Benefits of joining a running community",
    content: "Being part of a running community provides motivation, support, and networking opportunities with fellow runners.",
  },
];

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleContent = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-200 text-white flex items-center justify-center px-6 ">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-4 text-blue-700">FAQ's</h2>
        <p className="text-center text-gray-400 mb-8">
          Stay updated with the latest tips, guides, and running advice.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.map((blog, index) => (
            <motion.div 
              key={index} 
              className="bg-gray-800 p-5 rounded-lg shadow-lg border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button 
                onClick={() => toggleContent(index)}
                className="flex justify-between items-center w-full text-left text-lg font-semibold p-3 rounded-md border border-gray-600 hover:bg-gray-700 transition"
              >
                {blog.title}
                {activeIndex === index ? <FaMinus className="text-red-400" /> : <FaPlus className="text-teal-400" />}
              </button>

              {activeIndex === index && (
                <motion.p 
                  className="mt-3 text-gray-300 p-3 border-l-4 border-teal-500"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  {blog.content}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
