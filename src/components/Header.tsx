/* eslint-disable @next/next/no-img-element */
"use client";
import { useSession } from "next-auth/react";
import { IoMdMenu } from "react-icons/io";

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const { data: session } = useSession();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-30 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden"
            aria-label="Open sidebar"
          >
            <IoMdMenu size={20} />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">
            Zettabyte Dashboard
          </h1>
        </div>
        {session && (
          <div className="flex items-center space-x-3">
            <img
              src={session.user?.image || "/default-avatar.png"}
              alt={session.user?.name || "User"}
              className="w-10 h-10 rounded-full object-cover border"
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold">
                {session.user?.name}
              </span>
              <span className="text-xs text-gray-600">
                {session.user?.email}
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
