/* eslint-disable @next/next/no-img-element */
"use client";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";

const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between border-b border-gray-200">
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="md:hidden cursor-pointer mr-3 p-2 rounded text-gray-600 hover:bg-gray-100"
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
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex cursor-pointer items-center space-x-2"
          >
            <div className="hidden md:flex flex-col text-right">
              <span className="text-sm font-medium text-gray-800">
                {session.user?.name}
              </span>
              <span className="text-xs text-gray-600">
                {session.user?.email}
              </span>
            </div>
            <img
              src={session.user?.image || "/default-avatar.png"}
              alt={session.user?.name || "User"}
              className="w-10 h-10 rounded-full object-cover border-2 border-blue-100"
            />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border border-gray-200 overflow-hidden z-50">
              <button
                onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                className="w-full text-left cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
