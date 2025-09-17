"use client";

import { useState } from "react";
import useFetch from "@/hooks/useFetch";
import Card from "@/components/Card";
import { Post } from "@/types";
import Loading from "@/components/Loading";

const PostsPage = () => {
  const [endpoint, setEndpoint] = useState(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const { data: posts, loading, error, refetch } = useFetch<Post[]>(endpoint);

  const simulateError = () => {
    setEndpoint("https://jsonplaceholder.typicode.com/invalid-posts");
  };

  const resetEndpoint = () => {
    setEndpoint("https://jsonplaceholder.typicode.com/posts");
    refetch();
  };

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
        <button
          onClick={resetEndpoint}
          className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Posts</h1>
        <button
          onClick={simulateError}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Simulate Error
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.map((post, index) => (
          <Card
            key={post.id}
            title={post.title}
            body={post.body}
            id={post.id}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
