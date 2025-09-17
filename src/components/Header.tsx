/* eslint-disable @next/next/no-img-element */
"use client";
import { useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <header className="bg-white shadow-sm px-4 py-2 flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
      <div className="flex items-center space-x-3">
        <img
          src={session.user?.image || "/default-avatar.png"}
          alt={session.user?.name || "User"}
          className="w-10 h-10 rounded-full object-cover border"
        />
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-black">
            {session.user?.name}
          </span>
          <span className="text-xs text-gray-600">{session.user?.email}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
