"use client";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      <motion.h1
        className="text-3xl font-bold mb-4 text-blue-700"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Welcome to Zettabyte Dashboard
      </motion.h1>
      <section className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          className="bg-white rounded-lg shadow p-6 flex flex-col items-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-2xl font-semibold text-gray-700">Posts</span>
          <span className="text-lg text-gray-500">100</span>
        </motion.div>
        <motion.div
          className="bg-white rounded-lg shadow p-6 flex flex-col items-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-2xl font-semibold text-gray-700">Users</span>
          <span className="text-lg text-gray-500">10</span>
        </motion.div>
        <motion.div
          className="bg-white rounded-lg shadow p-6 flex flex-col items-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9 }}
        >
          <span className="text-2xl font-semibold text-gray-700">Active</span>
          <span className="text-lg text-gray-500">5</span>
        </motion.div>
      </section>
      <motion.div
        className="w-full max-w-xl h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl flex items-center justify-center text-white text-xl font-semibold shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        Animated Summary Card
      </motion.div>
    </main>
  );
}
