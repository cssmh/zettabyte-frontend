"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const menuItems = [
  { name: "Dashboard", href: "/" },
  { name: "Posts", href: "/posts" },
  { name: "Users", href: "/users" },
];

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

  // Close sidebar on route click or outside click (mobile)
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
  if (session) navItems.push({ name: "Profile", href: "/profile" });

  // Responsive sidebar: static on desktop, modal on mobile
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col bg-gray-800 text-white w-64 h-screen sticky top-0 z-30">
        <div className="p-4 border-b border-gray-700 flex items-center">
          <h1 className="text-xl font-bold">Zettabyte Dashboard</h1>
        </div>
        <nav className="flex-1 p-2 md:p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`block px-1 py-1 md:px-4 md:py-[10px] rounded-md transition-colors ${
                    pathname === item.href ? "bg-gray-600" : "hover:bg-gray-600"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {session && (
          <div className="p-4 border-t border-gray-700">
            <p className="text-sm text-gray-400">Logged in as</p>
            <p className="font-medium truncate">{session.user?.email}</p>
          </div>
        )}
      </aside>

      {/* Mobile sidebar modal */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            key="mobile-sidebar"
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 flex"
            style={{ pointerEvents: "auto" }}
          >
            <div
              className="flex-shrink-0 w-64 bg-gray-800 text-white h-full flex flex-col"
              ref={sidebarRef}
            >
              <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                <h1 className="text-xl font-bold">Zettabyte</h1>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded hover:bg-gray-700 ml-2 text-lg"
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>
              <nav className="flex-1 p-4">
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`block p-3 rounded transition-colors ${
                          pathname === item.href
                            ? "bg-blue-600"
                            : "hover:bg-gray-700"
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              {session && (
                <div className="p-4 border-t border-gray-700">
                  <p className="text-sm text-gray-400">Logged in as</p>
                  <p className="font-medium truncate">{session.user?.email}</p>
                </div>
              )}
            </div>
            {/* Overlay */}
            <div
              className="flex-1 bg-black/40"
              onClick={() => setMobileOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
