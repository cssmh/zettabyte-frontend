"use client";
import { motion } from "framer-motion";
export default function Home() {
  const stats = [
    { name: "Total Posts", value: "100" },
    { name: "Total Users", value: "10" },
    { name: "Active Users", value: "7" },
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-balance">
          Welcome to Zettabyte Dashboard
        </h1>
        <p className="text-gray-600">
          Manage your content and users efficiently
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-md p-4 md:p-6 flex flex-col items-center"
          >
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              {stat.name}
            </h3>
            <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
