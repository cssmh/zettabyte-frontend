"use client";
import { useParams } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { Post } from "@/types";
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

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl"
        >
          <strong className="font-medium">Error: </strong>
          <span>{error}</span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <Link
          href="/posts"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          <svg
            className="w-4 h-4 mr-2"
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
        className="bg-white rounded-lg shadow p-6 border border-gray-100"
      >
        <div className="mb-4">
          <span className="text-sm text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">
            Post #{id}
          </span>
        </div>

        <h1 className="text-2xl md:text-3xl font-semibold capitalize text-gray-800 mb-4">
          {post?.title}
        </h1>

        <div className="prose max-w-none text-gray-700">
          <p className="text-lg">{post?.body}</p>
        </div>
      </motion.article>
    </div>
  );
};

export default SinglePostPage;
