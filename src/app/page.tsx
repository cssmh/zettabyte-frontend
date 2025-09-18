"use client";
import { motion } from "framer-motion";

export default function Home() {
  const stats = [
    {
      name: "Total Posts",
      value: "100",
      icon: "posts",
      change: "+12%",
      trend: "up",
    },
    {
      name: "Total Users",
      value: "10",
      icon: "users",
      change: "+5%",
      trend: "up",
    },
    {
      name: "Active Users",
      value: "7",
      icon: "active",
      change: "+3%",
      trend: "up",
    },
  ];

  const chartData = [
    30, 60, 45, 80, 50, 70, 90, 65, 40, 75, 55, 85, 95, 35, 68, 72, 49, 88, 53,
  ];

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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.name}
                </p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p
                  className={`text-xs mt-2 ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.change} from last week
                </p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mini Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Weekly Activity
        </h2>
        <div className="flex items-end gap-1 h-40">
          {chartData.map((value, index) => (
            <motion.div
              key={index}
              className="w-3 bg-gradient-to-t from-blue-400 to-blue-600 rounded-t"
              initial={{ height: 0 }}
              animate={{ height: `${value}%` }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
