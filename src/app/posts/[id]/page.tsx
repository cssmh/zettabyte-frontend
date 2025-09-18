// app/posts/[id]/page.tsx (Enhanced Single Post)
"use client";
import { useParams } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { Post, User } from "@/types";
import Loading from "@/components/Loading";
import Link from "next/link";
import { motion } from "framer-motion";

const SinglePostPage = () => {
  const params = useParams();
  const { id } = params;

  const {
    data: post,
    loading,
    error,
  } = useFetch<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`);

  const { data: user } = useFetch<User>(
    post ? `https://jsonplaceholder.typicode.com/users/${post.userId}` : ""
  );

  if (loading) return <Loading />;

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl"
      >
        <strong className="font-medium">Error: </strong>
        <span>{error}</span>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/posts"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Posts
        </Link>
      </div>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100"
      >
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">
            Post #{id}
          </span>
          {user && (
            <div className="text-sm text-gray-600">
              By <span className="font-medium text-gray-800">{user.name}</span>
            </div>
          )}
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 capitalize">
          {post?.title}
        </h1>

        <div className="prose max-w-none text-gray-700 leading-relaxed">
          <p className="text-lg">{post?.body}</p>
        </div>

        {user && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              About the Author
            </h3>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-medium">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>

              <div>
                <div className="font-medium text-gray-800">{user.name}</div>
                <div className="text-gray-600 text-sm">{user.email}</div>
              </div>
            </div>
          </div>
        )}
      </motion.article>
    </div>
  );
};

export default SinglePostPage;
