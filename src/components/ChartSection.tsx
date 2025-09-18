"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchPosts } from "@/types";

interface ChartData {
  month: string;
  value: number;
}

export default function ChartSection() {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const posts = await fetchPosts();

        // Simulate monthly distribution of posts
        const monthlyData: ChartData[] = [
          { month: "Jan", value: Math.floor(Math.random() * 20) + 10 },
          { month: "Feb", value: Math.floor(Math.random() * 20) + 15 },
          { month: "Mar", value: Math.floor(Math.random() * 20) + 20 },
          { month: "Apr", value: Math.floor(Math.random() * 20) + 18 },
          { month: "May", value: Math.floor(Math.random() * 20) + 22 },
          { month: "Jun", value: Math.floor(Math.random() * 20) + 25 },
          { month: "Jul", value: Math.floor(Math.random() * 20) + 30 },
          { month: "Aug", value: Math.floor(Math.random() * 20) + 28 },
          { month: "Sep", value: Math.floor(Math.random() * 20) + 32 },
          { month: "Oct", value: Math.floor(Math.random() * 20) + 35 },
          { month: "Nov", value: Math.floor(Math.random() * 20) + 40 },
          { month: "Dec", value: Math.floor(Math.random() * 20) + 45 },
        ];

        // Scale data based on actual post count
        const scaleFactor =
          posts.length / monthlyData.reduce((sum, data) => sum + data.value, 0);
        const scaledData = monthlyData.map((data) => ({
          ...data,
          value: Math.round(data.value * scaleFactor),
        }));

        setChartData(scaledData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...chartData.map((d) => d.value));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Monthly Activity (Posts)
        </h3>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full font-medium">
            6M
          </button>
          <button className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded-full font-medium">
            1Y
          </button>
        </div>
      </div>

      <div className="h-64 flex items-end justify-between">
        {chartData.map((data, index) => (
          <div key={data.month} className="flex flex-col items-center flex-1">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(data.value / maxValue) * 180}px` }}
              transition={{
                duration: 0.8,
                delay: index * 0.05,
                type: "spring",
              }}
              className="w-6 bg-gradient-to-t from-blue-400 to-blue-600 rounded-t-md hover:from-blue-500 hover:to-blue-700 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            />
            <span className="text-xs text-gray-600 mt-2">{data.month}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
            <span className="text-gray-600">Posts Created</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
