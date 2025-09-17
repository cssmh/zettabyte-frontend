"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Hamburger header for mobile */}
      <div className="md:hidden sticky top-0 z-40 bg-white shadow-sm flex items-center px-4 py-2">
        <button
          className="text-2xl mr-3 p-2 rounded text-black hover:bg-gray-200"
          aria-label="Open menu"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>
        <span className="text-lg font-bold text-gray-800">
          Zettabyte Dashboard
        </span>
      </div>
      <div className="flex h-screen">
        <Sidebar isMobileOpen={isSidebarOpen} setMobileOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Desktop header only */}
          <div className="hidden md:block">
            <Header />
          </div>
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
