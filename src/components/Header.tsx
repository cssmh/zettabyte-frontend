/* eslint-disable @next/next/no-img-element */
// components/Header.tsx
"use client";
import { useSession } from "next-auth/react";

const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between border-b border-gray-200">
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="md:hidden mr-3 p-2 rounded text-gray-600 hover:bg-gray-100"
          aria-label="Open menu"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
      </div>

      {session && (
        <div className="flex items-center space-x-3">
          <div className="hidden md:flex flex-col text-right">
            <span className="text-sm font-medium text-gray-800">
              {session.user?.name}
            </span>
            <span className="text-xs text-gray-600">{session.user?.email}</span>
          </div>
          <img
            src={session.user?.image || "/default-avatar.png"}
            alt={session.user?.name || "User"}
            className="w-10 h-10 rounded-full object-cover border-2 border-blue-100"
          />
        </div>
      )}
    </header>
  );
};

export default Header;
