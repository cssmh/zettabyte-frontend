"use client";
import useFetch from "@/hooks/useFetch";
import Card from "@/components/Card";
import { Post } from "@/types";
import Loading from "@/components/Loading";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const PostsPage = () => {
  const { data: posts, loading } = useFetch<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );

  if (loading) return <Loading />;

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-2">
        <h1 className="text-2xl font-bold text-gray-900">All Posts</h1>
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {posts?.map((post) => (
          <Card
            key={post.id}
            title={post.title}
            body={post.body}
            id={post.id}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default PostsPage;
