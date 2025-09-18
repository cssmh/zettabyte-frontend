"use client";
import { motion } from "framer-motion";

export default function Home() {
  const stats = [
    { name: "Total Posts", value: "100" },
    { name: "Total Users", value: "10" },
    { name: "Active Users", value: "7" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Zettabyte Dashboard 👋
          </h1>
          <p className="text-gray-600">
            Manage your content and users efficiently
          </p>
        </div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-16 w-20 h-20 bg-blue-200 rounded-full opacity-30"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ animationDelay: "1s" }}
          className="absolute top-28 right-32 w-12 h-12 bg-purple-200 rounded-full opacity-40"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              {stat.name}
            </h3>
            <p className="text-4xl font-extrabold text-blue-600">
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
