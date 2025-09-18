"use client";
import { useParams } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { Post } from "@/types";
import Loading from "@/components/Loading";
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
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100 p-8"
      >
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 capitalize leading-tight">
            {post?.title}
          </h1>
          <span className="text-sm text-gray-400 font-medium">Post #{id}</span>
        </div>
        <p className="text-lg leading-relaxed text-gray-700">{post?.body}</p>
      </motion.article>
    </div>
  );
};

export default SinglePostPage;
