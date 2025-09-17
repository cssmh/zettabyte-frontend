/* eslint-disable @next/next/no-img-element */
"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Header = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (!session) {
    return null;
  }

  return (
    <header className="bg-white shadow-sm p-4 flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
          <img
            src={session.user?.image || "/default-avatar.png"}
            alt={session.user?.name || "User"}
            className="w-20 h-20 rounded-full mr-4"
          />
        </div>
        <div>
          <h2 className="text-sm text-black font-semibold">
            {session.user?.name}
          </h2>
          <p className="text-sm text-gray-600">{session.user?.email}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
