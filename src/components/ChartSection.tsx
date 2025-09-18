"use client";
import { motion } from "framer-motion";

interface ChartData {
  month: string;
  value: number;
}

interface ChartSectionProps {
  chartData?: ChartData[];
}

// Default data if none provided
const defaultChartData: ChartData[] = [
  { month: "Jan", value: 65 },
  { month: "Feb", value: 45 },
  { month: "Mar", value: 78 },
  { month: "Apr", value: 52 },
  { month: "May", value: 88 },
  { month: "Jun", value: 74 },
  { month: "Jul", value: 90 },
  { month: "Aug", value: 45 },
  { month: "Sep", value: 80 },
  { month: "Oct", value: 68 },
  { month: "Nov", value: 75 },
  { month: "Dec", value: 58 },
];

export default function ChartSection({
  chartData = defaultChartData,
}: ChartSectionProps) {
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
          Monthly Activity
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
            <span className="text-gray-600">Activity</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
