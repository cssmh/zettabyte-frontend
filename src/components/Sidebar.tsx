"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125h9.75a1.125 1.125 0 001.125-1.125V19.5m-14.25-6.189l-.23-.23a1.5 1.5 0 00-2.122 2.122l.23.23a2.625 2.625 0 011.026-.746l-.517-.517A1.125 1.125 0 014.5 13.5M10.125 21.75V19.5m-3.75 2.25H21a.75.75 0 00.75-.75v-9c0-.621-.504-1.125-1.125-1.125h-15.75c-.621 0-1.125.504-1.125 1.125v9c0 .621.504 1.125 1.125 1.125z"
        />
      </svg>
    ),
  },
  {
    name: "Posts",
    href: "/posts",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.28-8.28z"
        />
      </svg>
    ),
  },
  {
    name: "Users",
    href: "/users",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
        />
      </svg>
    ),
  },
];

const profileItem = {
  name: "Profile",
  href: "/profile",
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.505 20.25a.75.75 0 01-.75-.75v-2.25a4.5 4.5 0 014.5-4.5h3.75a4.5 4.5 0 014.5 4.5v2.25a.75.75 0 01-.75.75h-10.5z"
      />
    </svg>
  ),
};

export default function Sidebar({
  isMobileOpen,
  setMobileOpen,
}: {
  isMobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
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

  const navItems = [...menuItems];
  if (session) navItems.push(profileItem);

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
          <h1 className="text-xl font-bold text-gray-900">Zettabyte</h1>
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-lg"
            aria-label="Close menu"
          >
            ✕
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
