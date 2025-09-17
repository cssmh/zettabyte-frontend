"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const menuItems = [
    { name: "Dashboard", href: "/" },
    { name: "Posts", href: "/posts" },
    { name: "Users", href: "/users" },
  ];

  // Add profile link if user is authenticated
  if (session) {
    menuItems.push({ name: "Profile", href: "/profile" });
  }

  return (
    <motion.div
      animate={{ width: isCollapsed ? 80 : 250 }}
      className="bg-gray-800 text-white h-screen flex flex-col"
    >
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        {!isCollapsed && (
          <h1 className="text-xl font-bold">Zettabyte Dashboard</h1>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded hover:bg-gray-700"
        >
          {isCollapsed ? "→" : "←"}
        </button>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center p-3 rounded transition-colors ${
                  pathname === item.href ? "bg-blue-600" : "hover:bg-gray-700"
                }`}
              >
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {session && !isCollapsed && (
        <div className="p-4 border-t border-gray-700">
          <p className="text-sm text-gray-400">Logged in as</p>
          <p className="font-medium truncate">{session.user?.email}</p>
        </div>
      )}
    </motion.div>
  );
};

export default Sidebar;
