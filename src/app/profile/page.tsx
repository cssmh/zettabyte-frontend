/* eslint-disable @next/next/no-img-element */
"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto text-black"
    >
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <div className="flex flex-col sm:flex-row items-center mb-6">
          <img
            src={session.user?.image || "/default-avatar.png"}
            alt={session.user?.name || "User"}
            className="w-20 h-20 rounded-full mr-0 sm:mr-4 mb-2 sm:mb-0"
          />
          <div>
            <h2 className="text-2xl font-semibold">{session.user?.name}</h2>
            <p className="text-gray-600">{session.user?.email}</p>
          </div>
        </div>

        <div className="border-t pt-4 border-gray-300 mb-4">
          <h3 className="text-lg font-semibold mb-2">Account Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Account Type</p>
              <p className="font-medium">Google OAuth</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/auth/signin" })}
          className="px-4 py-2 bg-red-600 cursor-pointer text-white rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </motion.div>
  );
}
