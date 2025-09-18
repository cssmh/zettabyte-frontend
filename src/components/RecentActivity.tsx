"use client";
import { motion } from "framer-motion";

interface Activity {
  id: string;
  user: string;
  action: string;
  time: string;
}

interface RecentActivityProps {
  activities?: Activity[];
}

const defaultActivities: Activity[] = [
  {
    id: "1",
    user: "John Doe",
    action: "created a new post",
    time: "2 hours ago",
  },
  {
    id: "2",
    user: "Jane Smith",
    action: "updated user profile",
    time: "5 hours ago",
  },
  {
    id: "3",
    user: "Mike Johnson",
    action: "commented on a post",
    time: "1 day ago",
  },
  {
    id: "4",
    user: "Sarah Wilson",
    action: "deleted a comment",
    time: "2 days ago",
  },
];

export default function RecentActivity({
  activities = defaultActivities,
}: RecentActivityProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        Recent Activity
      </h3>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-blue-600 font-medium text-sm">
                {activity.user
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-800">
                <span className="font-medium">{activity.user}</span>{" "}
                {activity.action}
              </p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
