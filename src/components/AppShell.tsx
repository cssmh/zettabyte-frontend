"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar for desktop and mobile */}
      <Sidebar isMobileOpen={isSidebarOpen} setMobileOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden transition-all duration-300">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              key={pathname} // This forces re-animation on route change
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
