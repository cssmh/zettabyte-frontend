"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FiHome, FiFileText, FiUsers, FiUser, FiX } from "react-icons/fi";

const menuItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: <FiHome className="w-5 h-5" />,
  },
  {
    name: "Posts",
    href: "/posts",
    icon: <FiFileText className="w-5 h-5" />,
  },
  {
    name: "Users",
    href: "/users",
    icon: <FiUsers className="w-5 h-5" />,
  },
];

const profileItem = {
  name: "Profile",
  href: "/profile",
  icon: <FiUser className="w-5 h-5" />,
};

export default function Sidebar({
  isMobileOpen,
  setMobileOpen,
}: {
  isMobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}) {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobileOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isMobileOpen, setMobileOpen]);

  const navItems = [...menuItems, profileItem];

  return (
    <>
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{
          x: isDesktop ? 0 : isMobileOpen ? 0 : "-100%",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        ref={sidebarRef}
        className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 z-50 lg:translate-x-0 lg:static lg:z-auto lg:p-6"
      >
        <div className="p-4 border-b border-gray-200 lg:p-0 lg:border-none lg:mb-8">
          <h1 className="text-xl font-bold text-gray-900 flex items-center">
            <svg
              className="w-6 h-6 mr-2 text-blue-600"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M13 3H3a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2zm-8 8H3a2 2 0 0 0-2 2v2h8v-4zm10 0h-8v4h8v-4zm-8 6H3v2a2 2 0 0 0 2 2h8v-4zm10 0h-8v4h6a2 2 0 0 0 2-2v-2zm0-10h-8v4h8V7a2 2 0 0 0-2-2z" />
            </svg>
            Zettabyte
          </h1>
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden absolute cursor-pointer top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-lg"
            aria-label="Close menu"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 lg:p-0">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const linkClasses = `
                flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200
                ${
                  isActive
                    ? "bg-blue-600 text-white font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `;

              return (
                <motion.li
                  key={item.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href={item.href}
                    className={linkClasses}
                    onClick={() => !isDesktop && setMobileOpen(false)}
                  >
                    {item.icon}
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </nav>
      </motion.aside>
    </>
  );
}
