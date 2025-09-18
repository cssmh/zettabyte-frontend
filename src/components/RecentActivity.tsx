"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchPosts, fetchUsers, Post, User } from "@/types";

interface Activity {
  id: string;
  user: string;
  action: string;
  time: string;
}

export default function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [posts, users] = await Promise.all([fetchPosts(), fetchUsers()]);

        // Generate recent activity from posts
        const recentActivities: Activity[] = posts
          .slice(0, 6) // Take first 6 posts
          .map((post: Post, index: number) => {
            const user = users.find((u: User) => u.id === post.userId);
            const actions = [
              "created a new post",
              "published an article",
              "shared a post",
              "updated their content",
              "added a new blog post",
              "posted an update",
            ];

            return {
              id: post.id.toString(),
              user: user?.name || `User ${post.userId}`,
              action: actions[index % actions.length],
              time: `${index + 1} ${index === 0 ? "hour" : "hours"} ago`,
            };
          });

        setActivities(recentActivities);
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
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="flex items-start p-3 rounded-lg">
              <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 animate-pulse"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

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
