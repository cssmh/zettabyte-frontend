"use client";
import { motion } from "framer-motion";
import StatsGrid from "@/components/StatsGrid";
import ChartSection from "@/components/ChartSection";
import RecentActivity from "@/components/RecentActivity";

export default function Home() {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100"
      >
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Welcome to Zettabyte Dashboard
            </h1>
            <p className="text-gray-600">
              Manage your content and users efficiently
            </p>
          </div>
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
            className="md:block w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mt-4 md:mt-0"
          >
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <StatsGrid />

      {/* Chart and Activity Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <ChartSection />
        <RecentActivity />
      </motion.div>
    </div>
  );
}
